import { CLASH320PX, KUIMPACT, KUSTART, KUTHROW, SHIELD320PX, SLASH320PX } from "game/assets";
import Phaser from "phaser";

enum AnimeKeys
{
    A_KUSTART = 'a-kustart',
    A_KUTHROW = 'a-kuthrow',
    A_KUIMPACT = 'a-kuimpact',
    A_CLASH = 'a-clash',
    A_SLASH = 'a-slash',
    A_SHIELDMED = 'a-shield-med'
}

export class AnimationManage {
    
    scene: Phaser.Scene

    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;
        this.init();
    }

    init()
    {
        // kunai start
        this.scene.anims.create({
            key: AnimeKeys.A_KUSTART,
            frames: this.scene.anims.generateFrameNumbers(
                KUSTART,
                {
                    start: 0,
                    end: 4
                }
            ),
            frameRate: 10,
            repeat: 0
        });

        // kunai throw
        this.scene.anims.create({
            key: AnimeKeys.A_KUTHROW,
            frames: this.scene.anims.generateFrameNumbers(
                KUTHROW,
                {
                    start: 0,
                    end: 3
                }
            ),
            frameRate: 12,
            repeat: 0
        });

        // kunai impact
        this.scene.anims.create({
            key: AnimeKeys.A_KUIMPACT,
            frames: this.scene.anims.generateFrameNumbers(
                KUIMPACT,
                {
                    start: 0,
                    end: 5
                }
            ),
            frameRate: 12,
            repeat: 0
        });

        //katana clash
        this.scene.anims.create({
            key: AnimeKeys.A_CLASH,
            frames: this.scene.anims.generateFrameNumbers(
                CLASH320PX,
                {
                    start: 0,
                    end: 4
                }
            ),
            frameRate: 10,
            repeat: 0
        });

        //katana slash
        this.scene.anims.create({
            key: AnimeKeys.A_SLASH,
            frames: this.scene.anims.generateFrameNumbers(
                SLASH320PX,
                {
                    start: 0,
                    end: 5
                }
            ),
            frameRate: 12,
            repeat: 0
        });

        //shield creation
        this.scene.anims.create({
            key: AnimeKeys.A_SHIELDMED,
            frames: this.scene.anims.generateFrameNumbers(
                SHIELD320PX,
                {
                    start: 0,
                    end: 12
                }
            ),
            frameRate: 12,
            repeat: 0
        });

    }


}