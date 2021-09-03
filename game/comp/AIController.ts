import { ShoDown } from 'game/types/type';
import Phaser from 'phaser'
import UserComponent from './userComponent';

export class AIController extends UserComponent
{
    private gameObject: Phaser.GameObjects.Sprite

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
        // an event that listen for the time to press the shoDown
        this.gameObject.on('press-now', () => {
            const choice = ['GUARD', 'SLASH', 'THROW'] as ShoDown[]
            const i = Phaser.Math.Between(1,3);
            console.log(`AI has pressed and chosen ${choice[i]}`)
        })
    }
}