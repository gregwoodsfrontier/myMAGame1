import * as Phaser from 'phaser';

export const getGameWidth = (scene: Phaser.Scene): number => scene.game.scale.width;

export const getGameHeight = (scene: Phaser.Scene): number => scene.game.scale.height;

/**
 * Get a fixed width/height size relative to the games dimensions
 * @param {number} size - Size of element
 * @param {scene} scene - Current scene
 * @returns {number} Number representing the fixed size relative to the games dimensions
 */
export const getRelative = (size: number, scene: Phaser.Scene): number => getGameHeight(scene) * size / 1080;

export const createDebugGraphics = (scene: Phaser.Scene, layer: Phaser.Tilemaps.TilemapLayer) => {
    const debugGraphics = scene.add.graphics().setAlpha(0.75);
        layer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
}
