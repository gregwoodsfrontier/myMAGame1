import { getGameHeight } from 'game/helpers';
import { EventKeys } from 'game/scenes/eventKeys';
import { ShoDown } from 'game/types/type';
import Phaser from 'phaser'
import { threadId } from 'worker_threads';
import UserComponent from './userComponent';


export class InputComponent extends UserComponent
{
    private gameobject: Phaser.GameObjects.Sprite
    private shoDownText: Phaser.GameObjects.Text
    private canPress = true;
    private throwKey: Phaser.Input.Keyboard.Key
    private slashKey: Phaser.Input.Keyboard.Key
    private guardKey: Phaser.Input.Keyboard.Key

    constructor(gameobj: Phaser.GameObjects.Sprite)
    {
        super(gameobj);
        this.gameobject = gameobj;
        (gameobj as any)["__Input"] = this;
        this.throwKey = this.scene.input.keyboard.addKey('D');
        this.slashKey = this.scene.input.keyboard.addKey('W')
        this.guardKey = this.scene.input.keyboard.addKey('A')

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
            this.gameobject.x,
            this.gameobject.y + getGameHeight(this.scene)*40/600,
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
        let sho: ShoDown
        if(this.canPress && Phaser.Input.Keyboard.JustDown(this.throwKey))
        {
            sho = 'THROW';
            // emit an event
            this.scene.events.emit(EventKeys.PLAYER_SHODOWN, sho);
        }
        else if(this.canPress && Phaser.Input.Keyboard.JustDown(this.slashKey))
        {
            sho = 'SLASH';
            // emit an event
            this.scene.events.emit(EventKeys.PLAYER_SHODOWN, sho);
        }
        else if(this.canPress && Phaser.Input.Keyboard.JustDown(this.guardKey))
        {
            sho = 'GUARD';
            // emit an event
            this.scene.events.emit(EventKeys.PLAYER_SHODOWN, sho);
        }
    }

    // check if the 'canPress' is true. If not then the player/enemy trips
    checkIfRightTime()
    {
        if(this.canPress === false)
        {
            console.log('the player trips');
            // make trip animation
        }
    }

}