import { ALERT } from 'game/assets';
import { getGameHeight, getGameWidth } from 'game/helpers';
import Phaser from 'phaser'
import UserComponent from './userComponent';

export class AlertSign
{
    private scene: Phaser.Scene
    private spacebar: Phaser.Input.Keyboard.Key
    public sign: Phaser.GameObjects.Sprite

    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;
        this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.scene.events.on(Phaser.Scenes.Events.DESTROY, this.destroy, this);

    }

    destroy()
    {
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.start, this);
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    start()
    {
        // alert sign
        this.sign = this.scene.add.sprite(
            getGameWidth(this.scene)/2,
            getGameHeight(this.scene)/2,
            ALERT
        )
        .setScale(0.75);

        this.sign.anims.create({
            key: 'flash',
            frames: this.sign.anims.generateFrameNumbers(ALERT, {
                start: 0,
                end: 1
            }),
            repeat: -1,
            frameRate: 10
        })
        this.sign.play('flash');
        this.sign.setDepth(10).setVisible(false);

        this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            this.sign.setVisible(true);
            this.scene.time.delayedCall(500, () => {
                this.sign.setVisible(false);
            })
        }
    }

}