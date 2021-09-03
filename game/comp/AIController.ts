import { EventKeys } from 'game/scenes/eventKeys';
import { ShoDown } from 'game/types/type';
import Phaser from 'phaser'
import UserComponent from './userComponent';

export class AIController extends UserComponent
{
    private gameObject: Phaser.GameObjects.Sprite
    private canPress = true;

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
        /* this.scene.time.addEvent({
            startAt: 1000,
            delay: 5000,
            callback: () => {
                console.log('enemy has given shoDown')
                if(this.canPress)
                {
                    const es = this.giveAIShoDown();
                    this.scene.events.emit(EventKeys.ENEMY_SHODOWN, es);
                }
            },
            callbackScope: this.scene,
            repeat: 2
        }) */
    }

    giveAIShoDown(): ShoDown
    {
        const choice = ['GUARD', 'SLASH', 'THROW'] as ShoDown[]
        const i = Phaser.Math.Between(1,3);
        return choice[i]
    }
}