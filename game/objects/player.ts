interface Props {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  frame?: number;
}

export class Player extends Phaser.GameObjects.Sprite {
  private cursorKeys?: Phaser.Types.Input.Keyboard.CursorKeys;
  public speed = 200;

  constructor({ scene, x, y, key }: Props) {
    super(scene, x, y, key);

    // sprite
    this.setOrigin(0, 0);

    // Add animations
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers(key || '', { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(key || '', { frames: [ 2 ]}),
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(key || '', { frames: [ 4 ]}),
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers(key || '', { frames: [ 6 ]}),
    });

    // physics
    this.scene.physics.world.enable(this);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.displayWidth*0.8, this.displayHeight*0.9);

    // input
    this.cursorKeys = scene.input.keyboard.createCursorKeys();

    this.scene.add.existing(this);
    //this.anims.play('idle', false);
    this.anims.play('right', false);
  }

  update(): void {
    // Every frame, we create a new velocity for the sprite based on what keys the player is holding down.
    const velocity = new Phaser.Math.Vector2(0, 0);
    // Horizontal movement
    /* switch (true) {
      case this.cursorKeys?.left.isDown:
        velocity.x -= 1;
        this.anims.play('left', true);
        break;
      case this.cursorKeys?.right.isDown:
        velocity.x += 1;
        this.anims.play('right', true);
        break;
      default:
        this.anims.play('idle', true);
    } */

    // Vertical movement
    /* switch (true) {
      case this.cursorKeys?.down.isDown:
        velocity.y += 1;
        this.anims.play('idle', false);
        break;
      case this.cursorKeys?.up.isDown:
        velocity.y -= 1;
        this.anims.play('up', true);
        break;
      default:
        this.anims.play('idle', true);
    } */

    // We normalize the velocity so that the player is always moving at the same speed, regardless of direction.
    const normalizedVelocity = velocity.normalize();
    (this.body as Phaser.Physics.Arcade.Body).setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
  }
}
