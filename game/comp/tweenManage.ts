import Phaser from 'phaser'
import { AnimeKeys } from './animationManage';
import { SHIELD320PX, KUSTART, KUIMPACT, KUTHROW, SLASH320PX } from 'game/assets';
import { getRelative } from 'game/helpers';
import { start } from 'repl';
import scenes from 'game/scenes';

export const simpleTrip = (scene: Phaser.Scene,
    sprite: Phaser.GameObjects.Sprite,
    moveX: string = '+=150',
    _angle: number = 90
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

function delayDestroy(_scene: Phaser.Scene, _sprite: Phaser.GameObjects.Sprite)
{
    _scene.time.delayedCall(700, () => {
        _sprite.destroy();
    })
}

export const simpleThrow = (scene: Phaser.Scene,
    sprite: Phaser.GameObjects.Sprite,
    target: Phaser.GameObjects.Sprite,
    _flipX = false,
) => 
{
    // placement
    const startKunai = scene.add.sprite(
        sprite.x,
        sprite.y - getRelative(80, scene),
        KUSTART
    );
    
    const throwKunai = scene.add.sprite(
        sprite.x,
        sprite.y,
        KUTHROW
    ).setVisible(false);

    const impact = scene.add.sprite(
        target.x,
        target.y - getRelative(80, scene),
        KUIMPACT
    ).setVisible(false);

    impact.angle = -90;
    impact.play(AnimeKeys.A_KUIMPACT);
    impact.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        delayDestroy(scene, impact);
    });

    startKunai.flipX = _flipX;
    throwKunai.flipX = _flipX;

    if(_flipX === false)
    {
        // player
        startKunai.x += getRelative(80, scene);
        throwKunai.x += getRelative(160, scene);
    }
    else
    {
        // enemy
        startKunai.x -= getRelative(80, scene);
        throwKunai.x -= getRelative(160, scene);
    }

    // animation
    startKunai.play(AnimeKeys.A_KUSTART);
    startKunai.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        delayDestroy(scene, startKunai);
        throwKunai.setVisible(true);
        throwKunai.play(AnimeKeys.A_KUTHROW);
    });
    throwKunai.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        delayDestroy(scene, throwKunai);
    })

}

export const simpleMoveGuard = (scene: Phaser.Scene,
    sprite: Phaser.GameObjects.Sprite,
    _flipX = false,
    _moveX = '+=0'
) =>
{
    const shield = scene.add.sprite(
        sprite.x,
        sprite.y,
        SHIELD320PX
    ).setScale(0.4);

    if(_flipX === false)
    {
        shield.x -= getRelative(100, scene);
    }
    else
    {
        shield.x += getRelative(100, scene);
    }
    
    shield.flipX = _flipX;

    // check if needed tween or not
    if(_moveX !== '+=0')
    {
        scene.tweens.add({
            targets: [sprite, shield],
            x: _moveX,
            ease: 'Quint.easeOut',
            duration: 500,
            hold: 500,
            yoyo: true,
            onStart:() => {
                shield.play(AnimeKeys.A_SHIELDMED);
            },
            onYoyo:() => {
                delayDestroy(scene, shield)
            }
        })
    }
    else
    {
        shield.play(AnimeKeys.A_SHIELDMED);
        shield.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            delayDestroy(scene, shield);
        });
    }
}

export const simpleSlash = (scene: Phaser.Scene,
    sprite: Phaser.GameObjects.Sprite,
    _flipX = false,
    _moveX = '+=0'
) => 
{
    const slash = scene.add.sprite(
        sprite.x,
        sprite.y,
        SLASH320PX
    ).setScale(0.4);
    slash.flipX = _flipX;

    // check if needed tween or not
    if(_moveX !== '+=0')
    {
        scene.tweens.add({
            targets: [sprite, slash],
            x: _moveX,
            ease: 'Quint.easeOut',
            duration: 500,
            hold: 500,
            yoyo: true,
            onStart:() => {
                slash.play(AnimeKeys.A_SLASH);
            },
            onYoyo:() => {
                delayDestroy(scene, slash);
            }
        })
    }
    else
    {
        slash.play(AnimeKeys.A_SHIELDMED);
        slash.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            delayDestroy(scene, slash);
        });
    }
}


/*
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
    })
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
*/