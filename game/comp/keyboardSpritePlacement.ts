import Phaser from 'phaser'
import { getGameHeight, getRelative } from 'game/helpers';

export const moveSpriteRelative = (scene: Phaser.Scene, 
    spriteA: Phaser.GameObjects.Sprite,
    spriteB: Phaser.GameObjects.Sprite,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys) =>
{
  if(cursors.left.isDown)
  {
    spriteA.x -= getRelative(10, scene);
    const dx = (spriteA.x - spriteB.x)*1080/getGameHeight(scene);
    const dy = (spriteA.y - spriteB.y)*1080/getGameHeight(scene);
    console.log(`sprite: ${spriteA.texture}, x: ${dx}, y: ${dy}`);
  }
  if(cursors.right.isDown)
  {
    spriteA.x += getRelative(10, scene);
    const dx = (spriteA.x - spriteB.x)*1080/getGameHeight(scene);
    const dy = (spriteA.y - spriteB.y)*1080/getGameHeight(scene);
    console.log(`sprite: ${spriteA.texture}, x: ${dx}, y: ${dy}`);
  }

  if(cursors.up.isDown)
  {
    spriteA.y -= getRelative(10, scene);
    const dx = (spriteA.x - spriteB.x)*1080/getGameHeight(scene);
    const dy = (spriteA.y - spriteB.y)*1080/getGameHeight(scene);
    console.log(`sprite: ${spriteA.texture}, x: ${dx}, y: ${dy}`);
  }
  if(cursors.down.isDown)
  {
    spriteA.y += getRelative(10, scene);
    const dx = (spriteA.x - spriteB.x)*1080/getGameHeight(scene);
    const dy = (spriteA.y - spriteB.y)*1080/getGameHeight(scene);
    console.log(`sprite: ${spriteA.texture}, x: ${dx}, y: ${dy}`);
  }

}