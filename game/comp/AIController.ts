import { getRelative } from 'game/helpers';
import { eventcenter } from 'game/scenes/eventcenter';
import { EventKeys } from 'game/scenes/eventKeys';
import { ShoDown, TRIP, GUARD, SLASH, THROW } from 'game/types/type';
import Phaser from 'phaser'
import UserComponent from './userComponent';

const CORALRED = '#FF4D4D';

export class AIController extends UserComponent
{
    private gameObject: Phaser.GameObjects.Sprite

    private shoDownText: Phaser.GameObjects.Text;
    private AIShoDown: ShoDown|undefined;
    private AIResponse: number

    constructor(gameObject: Phaser.GameObjects.Sprite)
    {
        super(gameObject);
        this.gameObject = gameObject;
        (gameObject as any)["__AIController"] = this;
    }

    static getComponent(gameObject: Phaser.GameObjects.Sprite): AIController {
		return (gameObject as any)["__AIController"];
	}

    awake()
    {
        console.log('AIController is awake');
    }

    start()
    {
        // gives reponse at randam time bewtween 4 to 11 sec
        this.AIResponse = this.updateResponseTime();
        //this.AIResponse = 6500;
        console.log(`AIresponse time = ${this.AIResponse}`);

        this.shoDownText = this.scene.add.text(
            this.gameObject.x + getRelative(300, this.scene),
            this.gameObject.y - getRelative(300, this.scene),
            `PICK`,
            {
                fontSize: '128px',
                color: CORALRED,
            }
        )
        .setVisible(false)
        .setDepth(10);

        this.createTimerEvent();
    }

    update()
    {

    }

    updateResponseTime()
    {
        return Phaser.Math.Between(4,10)*1000;
    }

    createTimerEvent()
    {
        // AI logic
        this.scene.time.addEvent({
            delay: this.AIResponse,
            loop: true,
            repeat: 10,
            callback: () => {
                this.AIShoDown = this.giveAIShoDown();
                // check if it is within the canPress state
                eventcenter.emit(EventKeys.ENEMY_SHODOWN, this.AIShoDown);
                this.AIResponse = this.updateResponseTime();
                //this.AIResponse = 6000;
                console.log(`AIresponse time = ${this.AIResponse}`);
            },
            callbackScope: this.scene
        })
    }

    giveAIShoDown(): ShoDown
    {
        const choice = [GUARD, SLASH, THROW, TRIP] as ShoDown[]
        const i = Phaser.Math.Between(0,2);
        //const i = 3;
        return choice[i]
    }
}