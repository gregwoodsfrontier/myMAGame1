import { ShoDown, TRIP } from "game/types/type";
import { eventcenter } from "game/scenes/eventcenter";
import { EventKeys } from "game/scenes/eventKeys";

const increasePlayerScore = () =>
{
  eventcenter.emit(EventKeys.P_SCOREUP, 1)
}

const increaseEnemyScore = () =>
{
  eventcenter.emit(EventKeys.E_SCOREUP, 1)
}

const renderResults = (playerIn: ShoDown|undefined, enemyIn: ShoDown|undefined) =>
{
  if(!playerIn)
  {
    return console.error('player shoDown undefined for rendering');
  }

  if(!enemyIn)
  {
    return console.error('enemy shoDown undefined for rendering');
  }

  if(playerIn === enemyIn)
  {
    // both player trips

  }

}

export const judgeCat = (playerIn: ShoDown|undefined, enemyIn: ShoDown|undefined) => {
    // keeps updating to see if there are any input
  
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
      case 'THROW': {
        if(enemyIn === 'GUARD' || enemyIn === TRIP)
        {
          console.log('player wins');
          increasePlayerScore();
        } 
        else if(enemyIn === 'SLASH')
        {
          console.log('enemy wins');
          increaseEnemyScore();
        }
        else
        {
          console.log('enemy sho is undefined');
        }
        break;
      }
  
      case 'GUARD': {
        if(enemyIn === 'SLASH')
        {
          console.log('player wins');
          increasePlayerScore();
        }
        else if(enemyIn === 'THROW')
        {
          console.log('enemy wins');
          increaseEnemyScore();
        }
        break;
      }
  
      case 'SLASH': {
        if(enemyIn === 'GUARD')
        {
          console.log('player wins');
          increasePlayerScore();
        }
        else if(enemyIn === 'SLASH')
        {
          console.log('enemy wins');
          increaseEnemyScore();
        }
        break;
      }
    }
  
  }

