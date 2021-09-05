import { ShoDown, TRIP, SLASH, GUARD, THROW } from "game/types/type";
import { eventcenter } from "game/scenes/eventcenter";
import { EventKeys } from "game/scenes/eventKeys";
import { simpleTrip, simpleMoveGuard, simpleThrow, simpleSlash } from "./tweenManage";

const increasePlayerScore = () =>
{
  eventcenter.emit(EventKeys.P_SCOREUP, 1)
}

const increaseEnemyScore = () =>
{
  eventcenter.emit(EventKeys.E_SCOREUP, 1)
}

export const renderResults = (scene: Phaser.Scene, 
  playerIn: ShoDown|undefined, enemyIn: ShoDown|undefined, 
  pSprite: Phaser.GameObjects.Sprite|undefined,
  eSprite: Phaser.GameObjects.Sprite) =>
{
  if(!playerIn)
  {
    return console.error('player shoDown undefined for rendering');
  }

  if(!enemyIn)
  {
    return console.error('enemy shoDown undefined for rendering');
  }

  if(!pSprite){ return }

  if(playerIn === enemyIn)
  {
    // both player trips
    simpleTrip(scene, pSprite, '+=150',  90);
    simpleTrip(scene, eSprite, '-=150', -90);
  }

  switch(playerIn)
  {
    case GUARD: {
      // player guards
      simpleMoveGuard(scene, pSprite, true, '+=150');
      switch(enemyIn)
      {
        case SLASH: {
          // enemy goes forward and slash
          simpleSlash(scene, eSprite, true, '-=150');
          break;
        }

        case THROW: {
          // enemy throw darts
          simpleThrow(scene, eSprite, pSprite, true);
          break;
        }

        case TRIP: {
          // enemy trips
          simpleTrip(scene, eSprite, '-=150', -90);
          break;
        }
      }
      break;
    }

    case SLASH: {
      simpleSlash(scene, pSprite, false, '+=150');
      switch(enemyIn)
      {
        // player slashes and move forward
        case GUARD: {
          // enemy goes forward and guard
          simpleMoveGuard(scene, eSprite, true, '-=150');
          break;
        }

        case THROW: {
          // enemy throw darts
          simpleThrow(scene, eSprite, pSprite, true);
          break;
        }

        case TRIP: {
          // enemy trips
          simpleTrip(scene, eSprite, '-=150', -90);
          break;
        }
      }
      break;
    }

    case THROW: {
      simpleThrow(scene, pSprite, eSprite, false);
      switch(enemyIn)
      {
        // player guards and move forward
        case SLASH: {
          // enemy goes forward and slash
          simpleSlash(scene, eSprite, true, '-=150');
          break;
        }

        case GUARD: {
          // enemy goes forward and guard
          simpleMoveGuard(scene, eSprite, true, '-=150');
          break;
        }

        case TRIP: {
          // enemy trips
          simpleTrip(scene, eSprite, '-=150', -90);
          break;
        }
      }
      break;
    }

    default: {
      // player trips
      simpleTrip(scene, pSprite, '+=150', 90)
      switch(enemyIn)
      {
        // player guards and move forward
        case SLASH: {
          // enemy goes forward and slash
          simpleSlash(scene, eSprite, true, '-=150');
          break;
        }

        case GUARD: {
          // enemy goes forward and guard
          simpleMoveGuard(scene, eSprite, true, '-=150');
          break;
        }

        case THROW: {
          // enemy throw darts
          simpleThrow(scene, eSprite, pSprite, true);
          break;
        }
      }

      break;
    }

  }

}

export const judgeCat = (scene: Phaser.Scene, 
    playerIn: ShoDown|undefined, enemyIn: ShoDown|undefined, 
    pSprite: Phaser.GameObjects.Sprite|undefined,
    eSprite: Phaser.GameObjects.Sprite
) => {
  // keeps updating to see if there are any input
  if(!pSprite)
  {
    return console.error('player sprite undefined');
  }

  console.log(`player show ${playerIn}`);
  console.log(`enemy show ${enemyIn}`);

  if(playerIn === enemyIn)
  {
    if(playerIn === TRIP && enemyIn === TRIP)
    {
      console.log('both player and enemy trips. no points');
    }

    console.log('It is a draw');
    // If 3 consecutive draw, then automatic game-over
    return
  }

  switch(playerIn)
  {
    case THROW: {
      if(enemyIn === GUARD || enemyIn === TRIP)
      {
        console.log('player wins');
        increasePlayerScore();
      } 
      else if(enemyIn === SLASH)
      {
        // player throw
        simpleThrow(scene, pSprite, eSprite, false);
        //enemy slash
        console.log('enemy wins');
        increaseEnemyScore();
      }
      break;
    }

    case GUARD: {
      if(enemyIn === SLASH || enemyIn === TRIP)
      {
        console.log('player wins');
        increasePlayerScore();
      }
      else if(enemyIn === THROW)
      {
        console.log('enemy wins');
        increaseEnemyScore();
      }
      break;
    }

    case SLASH: {
      if(enemyIn === THROW || enemyIn === TRIP)
      {
        /* if(enemyIn === THROW)
        {
          // enemy throw moves when slash
          simpleThrow(scene, eSprite, pSprite, true);
          scene.time.delayedCall(500, () => {
            simpleTrip(scene, eSprite, '+=0', 90);
          });
        }
        else
        {
          // enemy trip
          simpleTrip(scene, eSprite, '+=150', 90);
        } */
        console.log('player wins');
        increasePlayerScore();
      }
      else if(enemyIn === GUARD)
      {
        console.log('enemy wins');
        increaseEnemyScore();
      }
      break;
    }

  }
};

function runPlayerTRIPCase(inputSho: ShoDown|undefined,
  scene: Phaser.Scene,
  sprite: Phaser.GameObjects.Sprite,
  moveX: string,
  angle: number
)
{
  if(!inputSho)
  {
    return console.error('no enemy sho input')
  }

  

  switch(inputSho)
  {
    case GUARD: {

      break;
    }

    case SLASH: {

      break;
    }

    case THROW: {

      break;
    }

  }
}

