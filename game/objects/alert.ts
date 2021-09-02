import { getGameWidth, getGameHeight } from "game/helpers";

interface Props {
    scene: Phaser.Scene;
    x: number;
    y: number;
    key: string;
    frame?: number;
}

enum AnimeKeys
{
    FLASH = 'flash'
}

export class AlertSign {
    public sprite: Phaser.GameObjects.Sprite
    constructor({ scene, x, y, key }: Props)
    {   
        this.sprite = scene.add.sprite(x, y, key);
        //this.createAnimations()

        this.sprite.anims.create({
            key: AnimeKeys.FLASH,
            frames: this.sprite.anims.generateFrameNumbers(key, {
                start: 1,
                end: 2
            }),
            repeat: -1,
            frameRate: 4
        })

       this.sprite.play(AnimeKeys.FLASH);
    }

    
}
