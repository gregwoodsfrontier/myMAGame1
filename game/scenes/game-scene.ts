import {
  BG, LICK, GRASSMAP, PIXELTILE, SHIELD320PX, SLASH320PX, KUSTART
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
import { judgeCat } from 'game/comp/judgeCat';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};


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
  private cursors;
  private slash;
  private kunai;

  constructor() {
    super(sceneConfig);
  }

  init = (data: { selectedGotchi: AavegotchiGameObject }): void => {
    this.selectedGotchi = data.selectedGotchi;
  };

  public create(): void {

    this.scene.run('UI');

    this.cursors = this.input.keyboard.createCursorKeys();

    // load the animations inside
    new AnimationManage(this);

    // Add layout
    this.add.image(getGameWidth(this) / 2, getGameHeight(this) / 2, BG).setDisplaySize(getGameWidth(this), getGameHeight(this));

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
            y: getGameHeight(this) * y/600 - getRelative(50, this),
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
    this.moveSprite(this.kunai);
    //this.timeToRaiseTheFlag(this.flagRT);

    // to determine the who is the boss
    if(this.canJudge === true)
    {
      this.callJudgeCat();
    }
  }

  moveSprite(sprite: Phaser.GameObjects.Sprite)
  {
    if(this.cursors.left.isDown)
    {
      sprite.x -= getRelative(10, this);
      const dx = (sprite.x - this.player!.x)*1080/getGameHeight(this);
      const dy = (sprite.y - this.player!.y)*1080/getGameHeight(this);
      console.log(`sprite: ${sprite.texture}, x: ${dx}, y: ${dy}`);
    }
    if(this.cursors.right.isDown)
    {
      sprite.x += getRelative(10, this);
      const dx = (sprite.x - this.player!.x)*1080/getGameHeight(this);
      const dy = (sprite.y - this.player!.y)*1080/getGameHeight(this);
      console.log(`sprite: ${sprite.texture}, x: ${dx}, y: ${dy}`);
    }

    if(this.cursors.up.isDown)
    {
      sprite.y -= getRelative(10, this);
      const dx = (sprite.x - this.player!.x)*1080/getGameHeight(this);
      const dy = (sprite.y - this.player!.y)*1080/getGameHeight(this);
      console.log(`sprite: ${sprite.texture}, x: ${dx}, y: ${dy}`);
    }
    if(this.cursors.down.isDown)
    {
      sprite.y += getRelative(10, this);
      const dx = (sprite.x - this.player!.x)*1080/getGameHeight(this);
      const dy = (sprite.y - this.player!.y)*1080/getGameHeight(this);
      console.log(`sprite: ${sprite.texture}, x: ${dx}, y: ${dy}`);
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
    ).setScale(0.4).setVisible(false); // hidden
    shield.flipX = true;
    shield.play(AnimeKeys.A_SHIELDMED);

    // add slash sprite
    this.slash = this.add.sprite(
      this.player?.x + getRelative(80, this),
      this.player?.y + getRelative(-20, this),
      SLASH320PX
    ).setVisible(false);
    this.slash.flipX = true;
    this.slash.play(AnimeKeys.A_SLASH);

    // add kunai start sprite
    this.kunai = this.add.sprite(
      this.player?.x + getRelative(80, this),
      this.player?.y + getRelative(-100, this),
      KUSTART
    ); //hidden
    this.kunai.play(AnimeKeys.A_KUSTART);
    
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
    const alertDelay = Phaser.Math.Between(5,10)*1000;
    console.log({alertDelay});
    this.time.addEvent({
      delay: alertDelay,
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
        this.alertsign.flash(500);
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

}
