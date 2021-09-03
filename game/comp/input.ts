import { getGameHeight } from 'game/helpers';
import Phaser from 'phaser'
import UserComponent from './userComponent';

const keydownA = 'keydown-A';
const keyupA = 'keyup-A';
const keydownW = 'keydown-W';
const keyupW = 'keyup-W';
const keydownD = 'keydown-D';
const keyupD = 'keyup-D';

export class InputComponent extends UserComponent
{
    private gameobject: Phaser.GameObjects.Sprite
    private shoDownText: Phaser.GameObjects.Text

    constructor(gameobj: Phaser.GameObjects.Sprite)
    {
        super(gameobj);
        this.gameobject = gameobj;
        (gameobj as any)["__Input"] = this;

    }

    static getComponent(gameObject: Phaser.GameObjects.Sprite): InputComponent {
		return (gameObject as any)["__Input"];
	}

    start()
    {
        this.shoDownText = this.scene.add.text(
            this.gameobject.x,
            this.gameobject.y + getGameHeight(this.scene)*40/600,
            `PICK`,
            {
                fontSize: '128px'
            }
        )
        .setVisible(false)
        .setDepth(10);

        this.scene.input.keyboard.on(keydownA, () => {
            this.shoDownText.setText(`GUARD`).setVisible(true)
        }, this);
        this.scene.input.keyboard.on(keyupA, () => {
            this.shoDownText.setText(`PICK`).setVisible(false)
        }, this);

        this.scene.input.keyboard.on(keydownW, () => {
            this.shoDownText.setText(`SLASH`).setVisible(true)
        }, this);
        this.scene.input.keyboard.on(keyupW, () => {
            this.shoDownText.setText(`PICK`).setVisible(false)
        }, this);

        this.scene.input.keyboard.on(keydownD, () => {
            this.shoDownText.setText(`THROW`).setVisible(true)
        }, this);
        this.scene.input.keyboard.on(keyupD, () => {
            this.shoDownText.setText(`PICK`).setVisible(false)
        }, this);

    }

}