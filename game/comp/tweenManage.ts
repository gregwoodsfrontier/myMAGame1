import Phaser from 'phaser'
import { AnimeKeys } from './animationManage';
import { SHIELD320PX, KUSTART } from 'game/assets';
import { getRelative } from 'game/helpers';

export const simpleTrip = (scene: Phaser.Scene,
    sprite: Phaser.GameObjects.Sprite,
    moveX: string,
    _angle: number
) =>
{
    scene.tweens.add({
        targets: sprite,
        x: moveX,
        angle: _angle,
        ease: 'Quint.easeOut',
        duration: 500,
        yoyo: true,
        hold: 500,
        onComplete:() => {
            console.log('call on next round');
            // emit event to turn off canPress State
        }
    })
}

export const playerTrip = (scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite,
    keys: Phaser.Input.Keyboard.Key[]
) =>
{
    scene.tweens.add({
        targets: sprite,
        x: '+=100',
        angle: 90,
        ease: 'Quint.easeOut',
        duration: 500,
        yoyo: true,
        hold: 500,
        onStart: () => {
            keys.forEach(item => item.enabled = false);
        },
        onComplete: () => {
            keys.forEach(item => item.enabled = true);
        }
    })
}

export const playerGuard = (scene: Phaser.Scene,
    keys: Phaser.Input.Keyboard.Key[],
    sprite: Phaser.GameObjects.Sprite,
) =>
{
    // D as guard
    const shield = scene.add.sprite(
        sprite.x + getRelative(100, scene),
        sprite.y,
        SHIELD320PX
    ).setScale(0.4).setVisible(false);
    shield.flipX = true;
    shield.play(AnimeKeys.A_SHIELDMED);

    scene.tweens.add({
        targets: [sprite, shield],
        x: '+=150',
        ease: 'Quint.easeOut',
        duration: 1000,
        yoyo: true,
        onStart: () => {
            keys.forEach(item => item.enabled = false);
            // shield animations
            shield.setVisible(true);
            shield.play(AnimeKeys.A_SHIELDMED);
        },
        onComplete: () => {
            keys.forEach(item => item.enabled = true);
            shield.destroy();
        }
    })
}

export const playerThrow = (scene: Phaser.Scene,
    keys: Phaser.Input.Keyboard.Key[],
    sprite: Phaser.GameObjects.Sprite,
) =>
{
    // A as throw
    // add kunai start sprite
    const kunai = scene.add.sprite(
        sprite.x + getRelative(80, scene),
        sprite.y + getRelative(-100, scene),
        KUSTART
    ); //hidden
    kunai.play(AnimeKeys.A_KUSTART);

    /* scene.tweens.add({
        targets: [sprite, kunai],
        x: '+=150',
        ease: 'Quint.easeOut',
        duration: 1000,
        yoyo: true,
        onStart: () => {
            keys.forEach(item => item.enabled = false);
            // shield animations
            shield.setVisible(true);
            shield.play(AnimeKeys.A_SHIELDMED);
        },
        onComplete: () => {
            keys.forEach(item => item.enabled = true);
            shield.destroy();
        }
    }) */
}

export const playerSlash = (scene: Phaser.Scene,
    keys: Phaser.Input.Keyboard.Key[],
    sprite: Phaser.GameObjects.Sprite,
) =>
{
    // W as slash
    const slash = scene.add.sprite(
        sprite.x + getRelative(100, scene),
        sprite.y,
        SHIELD320PX
    ).setScale(0.4).setVisible(false);
    slash.flipX = true;

    scene.tweens.add({
        targets: [sprite, slash],
        x: '+=150',
        ease: 'Quint.easeOut',
        duration: 1000,
        yoyo: true,
        onStart: () => {
            keys.forEach(item => item.enabled = false);
            // shield animations
            slash.setVisible(true);
            slash.play(AnimeKeys.A_SLASH);
        },
        onComplete: () => {
            keys.forEach(item => item.enabled = true);
            slash.destroy();
        }
    })
}

// Becoz enemy is AI, so no need of keys
export const enemyTrip = (scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite) =>
{
    scene.tweens.add({
        targets: sprite,
        x: '-=150',
        angle: -90,
        ease: 'Quint.easeOut',
        duration: 500,
        yoyo: true,
        hold: 500,
    })
}