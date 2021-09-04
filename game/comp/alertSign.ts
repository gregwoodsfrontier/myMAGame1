import { ALERT } from 'game/assets';
import { getGameHeight, getGameWidth } from 'game/helpers';
import { eventcenter } from 'game/scenes/eventcenter';
import { EventKeys } from 'game/scenes/eventKeys';
import Phaser from 'phaser'
import { AnimeKeys, AnimationManage } from './animationManage';
import UserComponent from './userComponent';

export class AlertSign
{
    private scene: Phaser.Scene
    public sign: Phaser.GameObjects.Sprite
    //private animeManage: AnimationManage

    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;
        this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
        //this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.scene.events.on(Phaser.Scenes.Events.DESTROY, this.destroy, this);
        //this.animeManage = new AnimationManage(this.scene)
    }

    destroy()
    {
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.start, this);
        //this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    start()
    {
        // alert sign
        this.sign = this.scene.add.sprite(
            getGameWidth(this.scene)/2,
            getGameHeight(this.scene)/4,
            ALERT
        );
        this.sign.setScale(0.5).setDepth(10);
        this.sign.setVisible(false);
        
        
        /* this.sign.anims.create({
            key: 'flash',
            frames: this.sign.anims.generateFrameNumbers(ALERT, {
                start: 0,
                end: 1
            }),
            repeat: -1,
            frameRate: 10
        }) */
        //this.sign.play('flash');

    }

    /* update()
    {

    } */

    flash(flashTime: number)
    {
        this.sign.setVisible(true);

        this.sign.play(AnimeKeys.FLASH);

        this.scene.time.delayedCall(flashTime, () => {
            this.sign.setVisible(false);
            this.sign.stop();
        });
        this.scene.time.delayedCall(flashTime + 600, () => {
            eventcenter.emit(EventKeys.P_SHODOWN_OFF);
            eventcenter.emit(EventKeys.E_SHODOWN_OFF);
            eventcenter.emit('judge-off');
        })
    }

}