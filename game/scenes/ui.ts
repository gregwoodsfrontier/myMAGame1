import Phaser from 'phaser'
import {
    LEFT_CHEVRON, CLICK
  } from 'game/assets';
import { getGameWidth, getGameHeight, getRelative } from '../helpers';
import { eventcenter } from './eventcenter';

const TURQUOISE = '#33FFDD'
const CORALRED = '#FF4D4D'

export default class UIScene extends Phaser.Scene
{
    // Sounds
    private back?: Phaser.Sound.BaseSound;
    private pScore = 0;  // player score
    private eScore = 0;  // enemy score
    private pScoreText: Phaser.GameObjects.Text;
    private eScoreText: Phaser.GameObjects.Text;
    private cursorKeys?: Phaser.Types.Input.Keyboard.CursorKeys;
    private container: Phaser.GameObjects.Container;

    constructor()
    {
        super({
            active: false,
            visible: false,
            key: 'UI',
        });
    }

    preload()
    {
        this.load.image('uiboard', 'assets/images/ui-board.png');
    }
    
    create()
    {
        // input
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.back = this.sound.add(CLICK, { loop: false });

        this.container = this.add.container(getGameWidth(this)/2, getGameHeight(this)/2*100/600)
        const uiboard = this.add.image(0, 0, 'uiboard');
        this.pScoreText = this.add.text(
            -80,
            0,
            `${this.pScore}`,
            {
                fontSize: '128px',
                color: TURQUOISE
            }
        ).setOrigin(0.5, 0.5);
        this.eScoreText = this.add.text(
            80,
            0,
            `${this.eScore}`,
            {
                fontSize: '128px',
                color: CORALRED
            }
        ).setOrigin(0.5, 0.5);         
        this.container.add([uiboard, this.pScoreText, this.eScoreText]);

        this.createBackButton();

        eventcenter.on('player-score', this.playerUp, this);
        eventcenter.on('enemy-score', this.enemyUp, this);
    }

    private playerUp()
    {
        this.pScore += 1;
    }

    private enemyUp()
    {
        this.eScore += 1;
    }

    update()
    {
        /* if(this.cursorKeys)
        {
            if(Phaser.Input.Keyboard.JustDown(this.cursorKeys?.right))
            {   
                this.pScoreText.x += 5
            }
            if(Phaser.Input.Keyboard.JustDown(this.cursorKeys?.left))
            {   
                this.eScoreText.x -= 5
            }
        }
        this.pScoreText.setText(`${this.pScore}`);
        this.eScoreText.setText(`${this.eScore}`); */

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

    private upScore(score: number)
    {
        return score + 1
    }
    
}