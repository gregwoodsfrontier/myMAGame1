import {
  BG, LICK, GRASSMAP, PIXELTILE,
} from 'game/assets';
import { AavegotchiGameObject } from 'types';
import { getGameWidth, getGameHeight, getRelative, createDebugGraphics } from '../helpers';
import { Player } from 'game/objects';
import { Lick } from 'game/objects';
import { InputComponent } from 'game/comp/input';
import { AlertSign } from 'game/comp/alertSign';
import { AIController } from 'game/comp/AIController';
import { ShoDown, TRIP } from 'game/types/type';
import { EventKeys } from './eventKeys';
import { eventcenter } from './eventcenter';
import { AnimationManage, AnimeKeys } from 'game/comp/animationManage';
import { judgeCat, renderResults } from 'game/comp/judgeCat';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};


/**
 * Scene where gameplay takes place
 */
export class GameScene extends Phaser.Scene {
  private player?: Player;
  private selectedGotchi?: AavegotchiGameObject;
  private alertsign: AlertSign
  private lick: Lick
  private flagRT = 5000;
  //private canJudge = false;
  private playerSho: ShoDown | undefined = TRIP;
  private enemySho: ShoDown | undefined = TRIP;
  private canTakeInput = false;
  //private cursors;

  constructor() {
    super(sceneConfig);
  }

  init = (data: { selectedGotchi: AavegotchiGameObject }): void => {
    this.selectedGotchi = data.selectedGotchi;
  };

  public create(): void {

    this.scene.run('UI');

    //this.cursors = this.input.keyboard.createCursorKeys();

    // load the animations inside
    new AnimationManage(this);

    // setting up the alert indicator
    this.alertsign = new AlertSign(this);

    // Add layout
    this.add.image(getGameWidth(this) / 2, getGameHeight(this) / 2, BG).setDisplaySize(getGameWidth(this), getGameHeight(this));

    // make the environment map
    const map = this.make.tilemap({ key: GRASSMAP });
    const tileset = map.addTilesetImage('pixeltile-packed-extruded', PIXELTILE);

    map.createLayer("below", tileset, 0, 0)
      .setDisplaySize(getGameWidth(this)*1.1, getGameHeight(this)*1.1)
      //.setScale(1.75);
    const same = map.createLayer("same", tileset, 0, 0)
      .setDisplaySize(getGameWidth(this)*1.1, getGameHeight(this)*1.1)
      //.setScale(1.75);
    
    const objectLayer = map.getObjectLayer('objects');
    objectLayer.objects.forEach(obj => {
      const {x, y, name} = obj
      switch(name)
      {
        case 'player':
        {
          if(!x || !y)
          {
            return
          }
          this.player = new Player({
            scene: this,
            x: getGameWidth(this) * x/800 + getRelative(100, this),
            y: getGameHeight(this) * y/600 + getRelative(50, this),
            key: this.selectedGotchi?.spritesheetKey || ''
          }).setOrigin(0.5, 0.5);
          break;
        }

        case 'lick':
        {
          if(!x || !y)
          {
            return
          }
          this.lick = new Lick({
            scene: this,
            x: getGameWidth(this) * x/800,
            y: getGameHeight(this) * y/600 + getRelative(100, this),
            key: LICK
          });
          break;
        }
      }
    })
    
    same.setCollisionByProperty({ collides: true });

    

    // make an AI controller with no reference
    new AIController(this.lick.sprite);

    //createDebugGraphics(this, same);

    // add colliders
    if(this.player)
    {
      this.physics.add.collider(this.player, same);
      new InputComponent(this.player);
    }

    this.physics.add.collider(this.lick.sprite, same);

    // event-listeners
    eventcenter.on(EventKeys.PLAYER_SHODOWN, this.setPlayerSho, this);
    eventcenter.on(EventKeys.ENEMY_SHODOWN, this.setEnemySho, this);
    // listeners for calling judge cat
    eventcenter.on(EventKeys.CALL_JUDGE_CAT, () => {
      judgeCat(this, this.playerSho, this.enemySho, this.player, this.lick.sprite);
      renderResults(this, this.playerSho, this.enemySho, this.player, this.lick.sprite);
    }, this);
    // listen to reject input
    eventcenter.on(EventKeys.REJECTINPUT, () => {
      this.canTakeInput = false;
      this.returnDefaultSho();
    })
    // listens to update flag time
    eventcenter.on(EventKeys.UPDATEFLAGTIME, () => {
      this.flagRT = this.updateFlagTime();
    }, this);

    // added timer events
    this.createTimerEvents();

    // wake-up scene
    this.events.emit("scene-awake");
  }

  public update(): void {
    // Every frame, we update the player
    //this.player?.update();

  }

  returnDefaultSho()
  {
    this.playerSho = TRIP;
    this.enemySho = TRIP;
  }

  updateFlagTime()
  {
    return Phaser.Math.Between(5,10)*1000;
  }

  createTimerEvents()
  {
    this.time.addEvent({
      delay: this.flagRT,
      loop: true,
      repeat: -1,
      callback: () => {
        // give log alert
        console.log(`ALERT!`);
        // log current time
        console.log(`flag RT = ${this.flagRT}`);
        console.log(`current time: ${this.time.now}`); 

        // Emits both events to ensure that judge cat accepts input.
        this.canTakeInput = true;

        // enable judgeCat to judge
        //this.enableJudgeCat(true);

        if(!this.alertsign)
        {
          return console.error('sign is not defined');
        }
        // flash the sign please
        // flash also flips the takeInput bit to disbale after some time
        this.alertsign.flash(500);

        eventcenter.emit(EventKeys.UPDATEFLAGTIME);
      },
      callbackScope: this,
    });

  }

  setPlayerSho(p: ShoDown)
  {
    if(this.canTakeInput === false)
    {
      return  console.log('player input not accepted')
    }
    else
    {
      this.playerSho = p;
      console.log('player chosen')
    }
  }

  setEnemySho(e: ShoDown)
  {
    if(this.canTakeInput === false)
    {
      return console.log('enemy input not accepted')
    }
    else
    {
      this.enemySho = e;
      console.log('enemy chosen')
    }
  }

}
