import Phaser from 'phaser'
import {
    LEFT_CHEVRON, CLICK
  } from 'game/assets';
import { getRelative } from '../helpers';

export default class UIScene extends Phaser.Scene
{
    // Sounds
    private back?: Phaser.Sound.BaseSound;

    constructor()
    {
        super({
            active: false,
            visible: false,
            key: 'UI',
        });
    }
    
    create()
    {
        this.back = this.sound.add(CLICK, { loop: false });
        const text = this.add.text(200, 100, '00', {
            color: '#ffffff',
            fontSize:'20px'
        });

        this.createBackButton();
    }

    private createBackButton = () => {
        this.add
          .image(getRelative(54, this), getRelative(54, this), LEFT_CHEVRON)
          .setOrigin(0)
          .setInteractive({ useHandCursor: true })
          .setDisplaySize(getRelative(94, this), getRelative(94, this))
          .on('pointerdown', () => {
            this.back?.play();
            window.history.back();
        });
    };
    
}