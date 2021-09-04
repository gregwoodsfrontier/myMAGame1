import Phaser from 'phaser'
import { AnimeKeys } from './animationManage';
import { SHIELD320PX } from 'game/assets';
import { getRelative } from 'game/helpers';

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
        hold: 1000,
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

// Becoz enemy is AI, so no need of keys
export const enemyTrip = (scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite) =>
{
    scene.tweens.add({
        targets: sprite,
        x: '-=50',
        angle: 90,
        ease: 'Quint.easeOut',
        duration: 500,
        yoyo: true,
        hold: 1000,
    })
}