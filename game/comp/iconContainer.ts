import { KATANA_ICON, KUNAI_ICON, SHIELD_ICON } from 'game/assets';
import Phaser from 'phaser';

export const addIcon = (scene: Phaser.Scene, cx = 0, cy = 0) => {

    const container = scene.add.container(cx, cy);
    const gIcon = scene.add.image(0, -200, SHIELD_ICON);
    const sIcon = scene.add.image(0, 0, KATANA_ICON);
    const tIcon = scene.add.image(0, 200, KUNAI_ICON);
    const textConfig = {
        backgroundColor: '#2b0f54',
        color: '#ffda45',
        fontSize: '21px'
    };

    const gIconText = scene.add.text(80, 80, 'A', textConfig);
    const sIconText = scene.add.text(80, 80, 'W', textConfig);
    const tIconText = scene.add.text(80, 80, 'D', textConfig);

    container.add([gIcon, sIcon, tIcon, gIconText, sIconText, tIconText]);

    return container
}