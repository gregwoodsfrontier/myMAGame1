import { eventcenter } from 'game/scenes/eventcenter';
import { EventKeys } from 'game/scenes/eventKeys';
import { ShoDown } from 'game/types/type';
import Phaser from 'phaser'
import UserComponent from './userComponent';

export class AIController extends UserComponent
{
    private gameObject: Phaser.GameObjects.Sprite
    private canPress = false;

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
<<<<<<< HEAD
        // an event that listen for the time to press the shoDown
        /* this.gameObject.on('press-now', () => {
            const choice = ['GUARD', 'SLASH', 'THROW'] as ShoDown[]
            const i = Phaser.Math.Between(1,3);
            console.log(`AI has pressed and chosen ${choice[i]}`)
        }) */
=======
        eventcenter.on(EventKeys.P_SHODOWN_ON, () => {
            this.canPress = true;
        });

        eventcenter.on(EventKeys.E_SHODOWN_OFF, () => {
            this.canPress = false;
        });

        this.createTimerEvent();
    }

    createTimerEvent()
    {
        this.scene.time.addEvent({
            delay: 5500,
            callback: () => {
                eventcenter.emit(EventKeys.ENEMY_SHODOWN, this.giveAIShoDown())
            },
            callbackScope: this.scene
        })
>>>>>>> shoLogicVA
    }

    giveAIShoDown(): ShoDown
    {
        const choice = ['GUARD', 'SLASH', 'THROW'] as ShoDown[]
        const i = Phaser.Math.Between(1,3);
        return choice[i]
    }
}