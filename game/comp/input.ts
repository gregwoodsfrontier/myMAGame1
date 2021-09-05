import { getGameHeight, getRelative } from 'game/helpers';
import { EventKeys } from 'game/scenes/eventKeys';
import { GUARD, ShoDown, THROW, SLASH, TRIP } from 'game/types/type';
import Phaser from 'phaser'
import UserComponent from './userComponent';
import { eventcenter } from 'game/scenes/eventcenter';
import { playerGuard, playerThrow, playerTrip } from './tweenManage';

export class InputComponent extends UserComponent
{
    private gameobject: Phaser.GameObjects.Sprite
    private shoDownText: Phaser.GameObjects.Text
    //private canPress = false;
    private throwKey: Phaser.Input.Keyboard.Key //D
    private slashKey: Phaser.Input.Keyboard.Key //W
    private guardKey: Phaser.Input.Keyboard.Key //A

    constructor(gameobj: Phaser.GameObjects.Sprite)
    {
        super(gameobj);
        this.gameobject = gameobj;
        (gameobj as any)["__Input"] = this;
        this.throwKey = this.scene.input.keyboard.addKey('D');
        this.slashKey = this.scene.input.keyboard.addKey('W');
        this.guardKey = this.scene.input.keyboard.addKey('A');

    }

    static getComponent(gameObject: Phaser.GameObjects.Sprite): InputComponent {
		return (gameObject as any)["__Input"];
	}

    awake()
    {
        console.log('Input component is awake');
    }

    start()
    {
        this.shoDownText = this.scene.add.text(
            this.gameobject.x - getRelative(300, this.scene),
            this.gameobject.y - getRelative(300, this.scene),
            `PICK`,
            {
                fontSize: '128px'
            }
        )
        .setVisible(false)
        .setDepth(10);

    }

    update()
    {
        this.checkPlayerShoDown()       
    }


    checkPlayerShoDown()
    {
        if(Phaser.Input.Keyboard.JustDown(this.throwKey))
        {
            eventcenter.emit(EventKeys.PLAYER_SHODOWN, THROW);
            console.log('player presses throw');
        }

        if(Phaser.Input.Keyboard.JustDown(this.guardKey))
        {
            eventcenter.emit(EventKeys.PLAYER_SHODOWN, GUARD);
            console.log('player presses guard');
        }

        if(Phaser.Input.Keyboard.JustDown(this.slashKey))
        {
            eventcenter.emit(EventKeys.PLAYER_SHODOWN, SLASH);
            console.log('player presses slash');
        }
        
    }

}