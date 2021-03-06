import { LICK } from "game/assets";
import { getGameWidth, getGameHeight } from "game/helpers";
import { AnimeKeys, AnimationManage } from 'game/comp/animationManage'

interface Props {
    scene: Phaser.Scene;
    x: number;
    y: number;
    key: string;
    frame?: number;
}

export class Lick {
    public sprite: Phaser.GameObjects.Sprite
    //private animeManage: AnimationManage

    constructor({ scene, x, y, key }: Props)
    {   
        //this.animeManage = new AnimationManage(scene);
        this.sprite = scene.add.sprite(x, y, key);
        this.sprite.setOrigin(0.5, 0.5);
        this.createAnimations();
        
        // Add scaling to lickquidators
        this.sprite.scale = 2;
        
        // Add physics to liquidators
        scene.physics.add.existing(this.sprite);
        //scene.add.existing(this.sprite);

        const body = this.sprite.body as Phaser.Physics.Arcade.Body;
        /* body.setSize(
            getGameWidth(scene)*40/1600,
            getGameHeight(scene)*64/1200
        ) */
        body.setSize(40, 64);

        this.sprite.play(AnimeKeys.FRONTLICK);
    }

    private createAnimations()
    {
        /* this.sprite.anims.create({
            key: AnimeKeys.IDLE,
            frames: this.sprite.anims.generateFrameNames(LICK, {
                prefix: "Aavegotchi-Lickquidators-Gaame-Jaam-",
                suffix: "-Front.svg",
                start: 1
            })
        });

        this.sprite.anims.create({
            key: AnimeKeys.IDLEPLAY,
            frames: this.sprite.anims.generateFrameNames(LICK, {
                prefix: "Aavegotchi-Lickquidators-Gaame-Jaam-",
                suffix: "-Front.svg",
                start: 1,
                end: 4
            }),
            repeat: -1,
            frameRate: 10,
        }); */

        this.sprite.anims.create({
            key: AnimeKeys.FRONTLICK,
            frames: this.sprite.anims.generateFrameNames(LICK, {
                prefix: "Aavegotchi-Lickquidators-Gaame-Jaam-",
                suffix: "-Front-Tongue.svg",
                start: 5,
                end: 6
            }),
            repeat: -1,
            frameRate: 2,
        });
    }
}
