import Phaser from 'phaser'
import { AnimeKeys } from './animationManage';

export const playerTrip = (scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite,
    throwKey: Phaser.Input.Keyboard.Key,
    guardKey: Phaser.Input.Keyboard.Key,
    slashKey: Phaser.Input.Keyboard.Key
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
            throwKey.enabled = false;
            guardKey.enabled = false;
            slashKey.enabled = false;
        },
        onComplete: () => {
            throwKey.enabled = true;
            guardKey.enabled = true;
            slashKey.enabled = true;
        }
    })
}

export const playerGuard = (scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite,
    keys: Phaser.Input.Keyboard.Key[]
) =>
{
    scene.tweens.add({
        targets: sprite,
        x: '+=150',
        ease: 'Quint.easeOut',
        duration: 1000,
        yoyo: true,
        onStart: () => {
            keys.forEach(item => item.enabled = false);
            
        },
        onComplete: () => {
            keys.forEach(item => item.enabled = true);
        }
    })
}

export const enemyTrip = (scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite,
    throwKey: Phaser.Input.Keyboard.Key,
    guardKey: Phaser.Input.Keyboard.Key,
    slashKey: Phaser.Input.Keyboard.Key
) =>
{
    scene.tweens.add({
        targets: sprite,
        x: '-=100',
        angle: 90,
        ease: 'Quint.easeOut',
        duration: 500,
        yoyo: true,
        hold: 1000,
        onStart: () => {
            throwKey.enabled = false;
            guardKey.enabled = false;
            slashKey.enabled = false;
        },
        onComplete: () => {
            throwKey.enabled = true;
            guardKey.enabled = true;
            slashKey.enabled = true;
        }
    })
}