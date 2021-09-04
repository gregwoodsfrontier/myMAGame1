import {
  SHIELD320PX,SHIELD160PX
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

    smallShield.play('create')
    medShield.play('create')
  }

  public update(): void {
    
  }
}
