export interface Asset {
  key: string;
  src: string;
  json?: string;
  type: 'IMAGE' | 'SVG' | 'SPRITESHEET' | 'AUDIO' | 'ATLAS' | 'TILEMAPJSON';
  data?: {
    frameWidth?: number;
    frameHeight?: number;
  };
}

export interface SpritesheetAsset extends Asset {
  type: 'SPRITESHEET';
  data: {
    frameWidth: number;
    frameHeight: number;
  };
}

export const BG = 'bg';
export const FULLSCREEN = 'fullscreen';
export const LEFT_CHEVRON = 'left_chevron';
export const CLICK = 'click';
export const LICK = 'lick';
export const GRASSMAP = 'grassmap';
export const PIXELTILE = 'pixeltile';
export const ALERT = 'alert';
export const SHIELD160PX = 'shield160px';
export const SHIELD320PX = 'shield320px';
export const CLASH320PX = 'clash320px';
export const SLASH640PX = 'shield640px';

// Save all in game assets in the public folder
export const assets: Array<Asset | SpritesheetAsset> = [
  {
    key: SLASH640PX,
    src: 'assets/sprites/640px-slash.png',
    type: 'SPRITESHEET',
    data: {
      frameWidth: 640,
      frameHeight: 640
    }
  },{
    key: SHIELD320PX,
    src: 'assets/sprites/320px-shield.png',
    type: 'SPRITESHEET',
    data: {
      frameWidth: 320,
      frameHeight: 320
    }
  },
  {
    key: SHIELD160PX,
    src: 'assets/sprites/160px-shield.png',
    type: 'SPRITESHEET',
    data: {
      frameWidth: 160,
      frameHeight: 160
    }
  },
  {
    key: ALERT,
    src: 'assets/sprites/alert.png',
    type: 'SPRITESHEET',
    data: {
      frameWidth: 320,
      frameHeight: 640
    }
  },
  {
    key: PIXELTILE,
    src: 'assets/maps/pixeltile-packed-extruded.png',
    type: 'IMAGE'
  },
  {
    key: BG,
    src: 'assets/images/bg.png',
    type: 'IMAGE',
  },
  {
    key: LEFT_CHEVRON,
    src: 'assets/icons/chevron_left.svg',
    type: 'SVG',
  },
  {
    key: CLICK,
    src: 'assets/sounds/click.mp3',
    type: 'AUDIO',
  },
  {
    key: LICK,
    src: 'assets/sprites/lick.png',
    json: 'assets/sprites/lick.json',
    type: 'ATLAS'
  },
  {
    key: GRASSMAP,
    src: 'assets/maps/grass.json',
    type: 'TILEMAPJSON'
  }
];
