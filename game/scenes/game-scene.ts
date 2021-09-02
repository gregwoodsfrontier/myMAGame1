import {
  LEFT_CHEVRON, BG, CLICK, LICK, GRASSMAP, PIXELTILE, ALERT
} from 'game/assets';
import { AavegotchiGameObject } from 'types';
import { getGameWidth, getGameHeight, getRelative, createDebugGraphics } from '../helpers';
import { Player } from 'game/objects';
import { Lick } from 'game/objects';
import { AlertSign } from 'game/objects/alert';

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

  private lick: Lick

  constructor() {
    super(sceneConfig);
  }

  init = (data: { selectedGotchi: AavegotchiGameObject }): void => {
    this.selectedGotchi = data.selectedGotchi;
  };

  public create(): void {
    this.scene.run('UI');

    console.log('selected gotchi wearables');
    console.log(this.selectedGotchi?.equippedWearables)

    // alert sign
    const alertsign = new AlertSign({
      scene: this, 
      x: getGameWidth(this)/2, 
      y: getGameHeight(this)/2, 
      key: ALERT
    });
    alertsign.sprite.setDepth(10);

    // Add layout
    this.add.image(getGameWidth(this) / 2, getGameHeight(this) / 2, BG).setDisplaySize(getGameWidth(this), getGameHeight(this));

    const map = this.make.tilemap({ key: GRASSMAP });
    const tileset = map.addTilesetImage('pixeltile-packed-extruded', PIXELTILE);

    const mapx = getGameWidth(this)/10;
    const mapy = getGameHeight(this)/2;

    map.createLayer("below", tileset, 0, 0)
      .setSize(getGameWidth(this), getGameHeight(this))
      .setScale(1.75);
    const same = map.createLayer("same", tileset, 0, 0)
      .setSize(getGameWidth(this), getGameHeight(this))
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
            x: getGameWidth(this) * x/800,
            y: getGameHeight(this) * y/600,
            key: this.selectedGotchi?.spritesheetKey || ''
          });
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

    if(this.player)
    {
      this.physics.add.collider(this.player, same);
    }
    
    this.physics.add.collider(this.lick.sprite, same);
  }

  public update(): void {
    // Every frame, we update the player
    this.player?.update();
  }
}
