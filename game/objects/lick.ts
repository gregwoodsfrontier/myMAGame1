import { LICK } from "game/assets";

interface Props {
    scene: Phaser.Scene;
    x: number;
    y: number;
    key: string;
    frame?: number;
}

export class Lick {
    public sprite: Phaser.GameObjects.Sprite
    constructor({ scene, x, y, key }: Props)
    {   
        this.sprite = scene.add.sprite(x, y, key);
        this.sprite.setOrigin(0, 0);
        this.createAnimations();
        this.sprite.play('lick-idle');
    }

    private createAnimations()
    {
        this.sprite.anims.create({
            key: 'lick-idle',
            frames: [{
                key: LICK,
                frame: 'Aavegotchi-Lickquidators-Gaame-Jaam-7-Right.svg'
            }]
        })
    }
}
