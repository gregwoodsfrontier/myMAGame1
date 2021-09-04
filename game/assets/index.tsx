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
export const PIXELTILE = 'pixeltile'

// Save all in game assets in the public folder
export const assets: Array<Asset | SpritesheetAsset> = [
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
