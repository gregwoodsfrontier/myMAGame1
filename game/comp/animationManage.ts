import { 
    CLASH320PX, 
    KUIMPACT, 
    KUSTART, 
    KUTHROW, 
    SHIELD320PX, 
    SLASH320PX, 
    LICK,
    ALERT 
} from "game/assets";
import Phaser from "phaser";

export enum AnimeKeys
{
    A_KUSTART = 'a-kustart',
    A_KUTHROW = 'a-kuthrow',
    A_KUIMPACT = 'a-kuimpact',
    A_CLASH = 'a-clash',
    A_SLASH = 'a-slash',
    A_SHIELDMED = 'a-shield-med',
    IDLE = 'lick-idle',
    IDLEPLAY = 'lick-idle-play',
    FRONTLICK = 'lick-front-lick',
    FLASH = 'flash'
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
            repeat: -1
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
            frameRate: 6,
            repeat: -1
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

        // lick idle
        this.scene.anims.create({
            key: AnimeKeys.IDLE,
            frames: this.scene.anims.generateFrameNames(LICK, {
                prefix: "Aavegotchi-Lickquidators-Gaame-Jaam-",
                suffix: "-Front.svg",
                start: 1
            })
        });

        this.scene.anims.create({
            key: AnimeKeys.IDLEPLAY,
            frames: this.scene.anims.generateFrameNames(LICK, {
                prefix: "Aavegotchi-Lickquidators-Gaame-Jaam-",
                suffix: "-Front.svg",
                start: 1,
                end: 4
            }),
            repeat: -1,
            frameRate: 10,
        });

        this.scene.anims.create({
            key: AnimeKeys.FRONTLICK,
            frames: this.scene.anims.generateFrameNames(LICK, {
                prefix: "Aavegotchi-Lickquidators-Gaame-Jaam-",
                suffix: "-Front-Tongue.svg",
                start: 5,
                end: 6
            }),
            repeat: -1,
            frameRate: 2,
        });

        this.scene.anims.create({
            key: 'flash',
            frames: this.scene.anims.generateFrameNumbers(ALERT, {
                start: 0,
                end: 1
            }),
            repeat: -1,
            frameRate: 10
        })

    }


}