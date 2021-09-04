import { ShoDown } from "game/types/type";

export const judgeCat = (playerIn: ShoDown|undefined, enemyIn: ShoDown|undefined) => {
    // keeps updating to see if there are any input
  
    console.log(`player show ${playerIn}`);
    console.log(`enemy show ${enemyIn}`);
  
    if(playerIn === enemyIn)
    {
      console.log('It is a draw');
      return
    }
  
    switch(playerIn)
    {
      case 'THROW': {
        if(enemyIn === 'GUARD')
        {
          console.log('player wins')
        } 
        else if(enemyIn === 'SLASH')
        {
          console.log('enemy wins')
        }
        break;
      }
  
      case 'GUARD': {
        if(enemyIn === 'SLASH')
        {
          console.log('player wins')
        }
        else if(enemyIn === 'THROW')
        {
          console.log('enemy wins')
        }
        break;
      }
  
      case 'SLASH': {
        if(enemyIn === 'GUARD')
        {
          console.log('player wins')
        }
        else if(enemyIn === 'SLASH')
        {
          console.log('enemy wins')
        }
        break;
      }
    }
  
  }