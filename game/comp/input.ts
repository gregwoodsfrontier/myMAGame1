import { getGameHeight, getRelative } from 'game/helpers';
import { EventKeys } from 'game/scenes/eventKeys';
import { ShoDown } from 'game/types/type';
import Phaser from 'phaser'
import UserComponent from './userComponent';
import { eventcenter } from 'game/scenes/eventcenter';
import { playerGuard, playerTrip } from './tweenManage';

export class InputComponent extends UserComponent
{
    private gameobject: Phaser.GameObjects.Sprite
    private shoDownText: Phaser.GameObjects.Text
    private canPress = false;
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
            this.gameobject.x,
            this.gameobject.y - getRelative(200, this.scene),
            `PICK`,
            {
                fontSize: '128px'
            }
        )
        .setVisible(false)
        .setDepth(10);

        eventcenter.on(EventKeys.P_SHODOWN_ON, () => {
            this.canPress = true;
            console.log(`player canPress: ${this.canPress}`);
        }, this);

        eventcenter.on(EventKeys.P_SHODOWN_OFF, () => {
            this.canPress = false;
            console.log(`player canPress: ${this.canPress}`);
        }, this);

    }

    update()
    {
        this.checkPlayerShoDown()       
    }

    checkPressState()
    {
        const keys = [this.throwKey, this.guardKey, this.slashKey];
        switch(this.canPress)
        {
            case true: {
                // player just dash foward
                playerGuard(this.scene,
                    keys,
                    this.gameobject
                )

                // emit the event of pass player shodown 
                eventcenter.emit(EventKeys.PLAYER_SHODOWN, 'THROW');
                break;
            }

            case false: {
                // trip disabled the throw, slash, guard key
                playerTrip(
                    this.scene, 
                    this.gameobject,
                    keys
                );
                break;
            }


        }
    }

    checkPlayerShoDown()
    {
        if(Phaser.Input.Keyboard.JustDown(this.throwKey))
        {
            this.shoDownText.setText('THROW').setVisible(true);
            this.scene.time.delayedCall(1500, () => {
                this.shoDownText.setVisible(false);
            })

            this.checkPressState();
        }

        if(Phaser.Input.Keyboard.JustDown(this.guardKey))
        {
            this.shoDownText.setText('GUARD').setVisible(true);
            this.scene.time.delayedCall(1500, () => {
                this.shoDownText.setVisible(false);
            })

            this.checkPressState();
        }

        if(Phaser.Input.Keyboard.JustDown(this.slashKey))
        {
            this.shoDownText.setText('SLASH').setVisible(true);
            this.scene.time.delayedCall(1500, () => {
                this.shoDownText.setVisible(false);
            })

            this.checkPressState();
        }
        
        
    }

}