import { useState, useEffect } from 'react';
import React from 'react';
import CardGridService from 'services/card-grid.service';
import constants from 'utils/constants';
import CardGridSlot from 'components/card-grid-slot';
import { useCardContext, setGridSlots, initGame } from 'context/card/index';

const cardGridService = CardGridService();

export const useCardGrid = () => {
  // const [grid, setGrid] = useState({});  
  const { state, dispatch } = useCardContext();

  useEffect(() => {
    if (!state.isInit) { 
      initGame(dispatch, true);
      console.log('card-grid');
    }    
  }, [state.isInit]);

  useEffect(() => {
    if (state.isInit) { 
      console.log('rerender card grid');
    }       
  });

  const renderGridSlots = (cardArr) => {
    const slots = [];
    if (cardArr && cardArr.length > 0) {      
      const gridSize = constants.GRID_SIZE_LV2.height * constants.GRID_SIZE_LV2.width;  
      for (let i = 0; i < gridSize; i++) {
        const piece = cardArr[i];          
        slots.push(<CardGridSlot id={i} key={i} piece={piece}/>);
      }      
    }
    return slots;  
  };

  const getCardArr = () => {
    return state.cardArr;
  };

  return {
    getCardArr,
    renderGridSlots
  };
};