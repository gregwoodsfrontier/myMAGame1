import {
    LEFT_CHEVRON, BG, CLICK
  } from 'game/assets';
  import { AavegotchiGameObject } from 'types';
  import { getGameWidth, getGameHeight, getRelative } from '../helpers';
  import { Player } from 'game/objects';
  import { Moralis } from 'moralis';
  
  const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game2',
  };
  
  /**
   * Scene where gameplay takes place
   */
  export class Game2Scene extends Phaser.Scene {
    private player?: Player;
    private selectedGotchi?: AavegotchiGameObject;
  
    // Sounds
    private back?: Phaser.Sound.BaseSound;
  
    constructor() {
      super(sceneConfig);
    }
  
    init = (data: { selectedGotchi: AavegotchiGameObject }): void => {
      this.selectedGotchi = data.selectedGotchi;
    };

    preload()
    {
        this.load.svg('player2', 'assets/svg/gotchis/Aavegotchi-Gaame-Jaam-1.svg');
    }
  
    public async create() {
        
      let competitors = {};

      // Add layout
      this.add.image(getGameWidth(this) / 2, getGameHeight(this) / 2, BG).setDisplaySize(getGameWidth(this), getGameHeight(this));
      this.back = this.sound.add(CLICK, { loop: false });
      this.createBackButton();
  
      // Add a player sprite that can be moved around.
      this.player = new Player({
        scene: this,
        x: getGameWidth(this) / 2,
        y: getGameHeight(this) / 2,
        key: this.selectedGotchi?.spritesheetKey || ''
      })

      let user = Moralis.User.current();
        let query = new Moralis.Query('PlayerPosition');
        let subscription = await query.subscribe();
        subscription.on('create', (plocation) => {
          if(plocation.get("player") != user.get("ethAddress")){

            // if first time seeing
            if(competitors[plocation.get("player")] == undefined){
              // create a sprite
              competitors[plocation.get("player")] = this.add.sprite( plocation.get("x"), plocation.get("y"), 'player2').setScale(0.3);
            }
            else{
              competitors[plocation.get("player")].x = plocation.get("x");
              competitors[plocation.get("player")].y = plocation.get("y");
            }

            console.log("someone moved!")
            console.log(plocation.get("player"))
            console.log("new X ", plocation.get("x"))
            console.log("new Y ", plocation.get("y"))
          }
        });

    }
  
    private createBackButton = () => {
      this.add
        .image(getRelative(54, this), getRelative(54, this), LEFT_CHEVRON)
        .setOrigin(0)
        .setInteractive({ useHandCursor: true })
        .setDisplaySize(getRelative(94, this), getRelative(94, this))
        .on('pointerdown', () => {
          this.back?.play();
          window.history.back();
        });
    };
  
    public async update() {
      // Every frame, we update the player
      this.player?.update();

      if(this.player?.lastX != this.player?.x  || this.player?.lastY != this.player?.y){
        let user = Moralis.User.current();
        
        const PlayerPosition = Moralis.Object.extend("PlayerPosition");
        const playerPosition = new PlayerPosition();

        playerPosition.set("player",user.get("ethAddress"));
        playerPosition.set("x",this.player?.x);
        playerPosition.set("y",this.player?.y)

        this.player?.setLastXY(this.player?.x, this.player?.y);

        await playerPosition.save();
      }

    }
  }