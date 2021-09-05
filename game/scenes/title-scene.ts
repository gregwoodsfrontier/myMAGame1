import {
  SHIELD320PX,SHIELD160PX, TITLE, BLUE_BUTTON00, BLUE_BUTTON01
} from 'game/assets';
import { getGameWidth, getGameHeight } from '../helpers';
import { AavegotchiGameObject } from 'types';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Title",
};

const yellow = 0xffda45;
const white = 0xffffff;

/**
 * Scene where gameplay takes place
 */
export class TitleScene extends Phaser.Scene {

  selectedGotchi?: AavegotchiGameObject;

  constructor() {
    super(sceneConfig);
  }

  init = (data: { selectedGotchi: AavegotchiGameObject }): void => {
    this.selectedGotchi = data.selectedGotchi;
  };

  public create(): void {

    this.add.image(
      getGameWidth(this)/2,
      getGameHeight(this)*2/5,
      TITLE
    );

    const button = this.add.image(
      getGameWidth(this)/2,
      getGameHeight(this)*3/4,
      BLUE_BUTTON00
    ).setInteractive();

    this.add.text(
      getGameWidth(this)/2,
      getGameHeight(this)*3/4,
      'PLAY',
      {
        fontSize: '36px',
        color: '#ffffff'
      }
    ).setOrigin(0.5, 0.5);

    button.once('pointerdown', () => {
      button.setTexture(BLUE_BUTTON01);
    }, this)

    button.on('pointerup', () => {
      button.setFrame(BLUE_BUTTON00);
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
      {
          //this.scene.start(SceneKeys.GameOverScene);
          this.scene.start("Game", { selectedGotchi: this.selectedGotchi });
      });
      
    });

    button.on('pointerover', () => {
      button.setTint(yellow);
    }, this);

    button.on('pointerout', () => {
      button.setTint(white);
    }, this);

  }

  public update(): void {
    
  }
}
