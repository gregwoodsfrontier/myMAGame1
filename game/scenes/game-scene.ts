import {
  BG, LICK, GRASSMAP, PIXELTILE, SHIELD320PX
} from 'game/assets';
import { AavegotchiGameObject } from 'types';
import { getGameWidth, getGameHeight, getRelative, createDebugGraphics } from '../helpers';
import { Player } from 'game/objects';
import { Lick } from 'game/objects';
import { InputComponent } from 'game/comp/input';
import { AlertSign } from 'game/comp/alertSign';
import { AIController } from 'game/comp/AIController';
import { ShoDown } from 'game/types/type';
import { EventKeys } from './eventKeys';
import { eventcenter } from './eventcenter';
import { AnimationManage, AnimeKeys } from 'game/comp/animationManage';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};


const judgeCat = (playerIn: ShoDown|undefined, enemyIn: ShoDown|undefined) => {
  // keeps updating to see if there are any input

  console.log(`player show ${playerIn}`);
  console.log(`enemy show ${enemyIn}`);

  if(playerIn === enemyIn)
  {
    console.log('It is a draw');
    return
  }

  switch(playerIn)
  {
    case 'THROW': {
      if(enemyIn === 'GUARD')
      {
        console.log('player wins')
      } 
      else if(enemyIn === 'SLASH')
      {
        console.log('enemy wins')
      }
      break;
    }

    case 'GUARD': {
      if(enemyIn === 'SLASH')
      {
        console.log('player wins')
      }
      else if(enemyIn === 'THROW')
      {
        console.log('enemy wins')
      }
      break;
    }

    case 'SLASH': {
      if(enemyIn === 'GUARD')
      {
        console.log('player wins')
      }
      else if(enemyIn === 'SLASH')
      {
        console.log('enemy wins')
      }
      break;
    }
  }

}

/**
 * Scene where gameplay takes place
 */
export class GameScene extends Phaser.Scene {
  private player?: Player;
  private selectedGotchi?: AavegotchiGameObject;
  private alertsign: AlertSign
  private lick: Lick
  private flagRT = 10000;
  private canJudge = false;
  private playerSho: ShoDown | undefined = undefined
  private enemySho: ShoDown | undefined = undefined

  constructor() {
    super(sceneConfig);
  }

  init = (data: { selectedGotchi: AavegotchiGameObject }): void => {
    this.selectedGotchi = data.selectedGotchi;
  };

  public create(): void {

    this.scene.run('UI');

    // load the animations inside
    new AnimationManage(this);

    // Add layout
    this.add.image(getGameWidth(this) / 2, getGameHeight(this) / 2, BG).setDisplaySize(getGameWidth(this), getGameHeight(this));

    const map = this.make.tilemap({ key: GRASSMAP });
    const tileset = map.addTilesetImage('pixeltile-packed-extruded', PIXELTILE);

    const mapx = getGameWidth(this)/10;
    const mapy = getGameHeight(this)/2;

    map.createLayer("below", tileset, 0, 0)
      //.setSize(getGameWidth(this), getGameHeight(this))
      .setScale(1.75);
    const same = map.createLayer("same", tileset, 0, 0)
      //.setSize(getGameWidth(this), getGameHeight(this))
      .setScale(1.75);
    
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
            x: getGameWidth(this) * x/800 + 100,
            y: getGameHeight(this) * y/600 + 90,
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
            y: getGameHeight(this) * y/600,
            key: LICK
          });
          break;
        }
      }
    })
    
    same.setCollisionByProperty({ collides: true });

    //createDebugGraphics(this, same);

    // add colliders
    if(this.player)
    {
      this.physics.add.collider(this.player, same);
      new InputComponent(this.player);
    }
    this.physics.add.collider(this.lick.sprite, same);

    // setting up the alert indicator
    this.alertsign = new AlertSign(this);

    // make an AI controller with no reference
    new AIController(this.lick.sprite);

    //this.flagRT = this.calcTimeToFlag();

    // event-listeners
    eventcenter.on(EventKeys.PLAYER_SHODOWN, this.setPlayerSho, this);
    eventcenter.on(EventKeys.ENEMY_SHODOWN, this.setEnemySho, this);
    eventcenter.on('judge-off', () => {
      this.enableJudgeCat(false);
    }, this);

    // added timer events
    this.createTimerEvents();

    // add shodown components sprite
    this.addShoDownSprites();

    // wake-up scene
    this.events.emit("scene-awake");
  }

  public update(): void {
    // Every frame, we update the player
    this.player?.update();
    //this.timeToRaiseTheFlag(this.flagRT);

    // to determine the who is the boss
    if(this.canJudge === true)
    {
      this.callJudgeCat();
    }
    
  }

  addShoDownSprites()
  {
    if(!this.player)
    {
      return
    }
    
    // add shield sprite
    const shield = this.add.sprite(
      this.player?.x + getRelative(100, this),
      this.player?.y,
      SHIELD320PX
    ).setScale(0.4);
    shield.flipX = true;
    shield.play(AnimeKeys.A_SHIELDMED);

    // add slash sprite
    
  }

  enableJudgeCat(state: boolean)
  {
    this.canJudge = state;
    console.log(`can Judge: ${this.canJudge}`);
  }

  callJudgeCat()
  {
    if(this.playerSho && this.enemySho)
    {
      judgeCat(this.playerSho, this.enemySho);
      this.playerSho = undefined;
      this.enemySho = undefined;
    }
  }

  createTimerEvents()
  {
    this.time.addEvent({
      delay: 5000,
      callback: () => {
        console.log(`ALERT!`);

        this.enableJudgeCat(true);

        // Emits both events to ensure that the 
        eventcenter.emit(EventKeys.P_SHODOWN_ON);
        eventcenter.emit(EventKeys.E_SHODOWN_ON);

        if(!this.alertsign)
        {
          return console.error('sign is not defined');
        }
        this.alertsign.flash(1500);
      },
      callbackScope: this,
    });

  }

  setPlayerSho(p: ShoDown)
  {
    this.playerSho = p;
  }

  setEnemySho(e: ShoDown)
  {
    this.enemySho = e;
  }

  /* calcTimeToFlag()
  {
    const rand = Phaser.Math.Between(5000, 10000);
    return this.time.now + rand;
  }

  timeToRaiseTheFlag(raiseTime: number)
  {
    // only checks if it's time to raise flag and raise it
    if(this.time.now > raiseTime)
    {
      console.log(`alert sign is flashed at ${this.time.now}`)
      this.alertsign.flash(300);
      //Emit an event that flips the canPress state of player and enemy

      this.flagRT = this.calcTimeToFlag();
    }
  } */
}
