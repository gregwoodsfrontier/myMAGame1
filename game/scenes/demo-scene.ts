import {
  SHIELD320PX,SHIELD160PX, SLASH640PX
} from 'game/assets';
import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Demo',
};

export const createAllAnimations = (sprite: Phaser.GameObjects.Sprite,
  _aniKey: string,
  _textKey: string,
  _start: number,
  _end: number ) => {
  sprite.anims.create({
    key: _aniKey,
    frames: sprite.anims.generateFrameNumbers(_textKey, {
      start: _start,
      end: _end
    }),
    frameRate: 12,
    repeat: -1,
    repeatDelay: 500
  })
}

/**
 * Scene where gameplay takes place
 */
export class DemoScene extends Phaser.Scene {

  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    const smallShield = this.add.sprite(
      getGameWidth(this)/4,
      getGameHeight(this)/4,
      SHIELD160PX
    );

    const medShield = this.add.sprite(
      getGameWidth(this)*2/4,
      getGameHeight(this)/4,
      SHIELD320PX
    );

    const bigSlash = this.add.sprite(
      getGameWidth(this)*3/4,
      getGameHeight(this)/4,
      SLASH640PX
    );

    createAllAnimations(
      smallShield,
      'create',
      SHIELD160PX,
      0,
      13
    );

    createAllAnimations(
      medShield,
      'create',
      SHIELD320PX,
      0,
      13
    );

    createAllAnimations(
      bigSlash,
      'create',
      SLASH640PX,
      0,
      5
    );

    smallShield.play('create')
    medShield.play('create')
    bigSlash.play('create') 
  }

  public update(): void {
    
  }
}
