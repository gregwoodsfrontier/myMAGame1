import Phaser from 'phaser'
import {
    LEFT_CHEVRON, CLICK, UIBOARD
  } from 'game/assets';
import { getGameWidth, getGameHeight, getRelative } from '../helpers';
import { eventcenter } from './eventcenter';
import { EventKeys } from './eventKeys';
import { addIcon } from 'game/comp/iconContainer';

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
        //this.load.image('uiboard', 'assets/images/ui-board.png');
    }
    
    create()
    {
        addIcon
        (   
            this, 
            getGameWidth(this)*0 + getRelative(85, this), 
            getGameHeight(this) - getRelative(240, this)
        );

        //listening for events
        eventcenter.on(EventKeys.P_SCOREUP, this.increasePlayerScore, this);
        eventcenter.on(EventKeys.E_SCOREUP, this.increaseEnemyScore, this);

        // input
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.back = this.sound.add(CLICK, { loop: false });

        this.container = this.add.container(getGameWidth(this)/2, getGameHeight(this)/2*100/600)
        const uiboard = this.add.image(0, 0, UIBOARD);
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
        this.pScoreText.setText(`${this.pScore}`);
        this.eScoreText.setText(`${this.eScore}`);
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

    private increasePlayerScore(score: number)
    {
        this.pScore += score;
    }
    
    private increaseEnemyScore(score: number)
    {
        this.eScore += score;
    }

}