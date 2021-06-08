import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCardPiece } from 'hooks/useCardPiece';

export default function CardPiece({id, piece}) {
  const {
    flipCardUp,
  } = useCardPiece(piece);
  

  const createCardFrontStyles = () => {
    return [styles.cardPiece, styles.cardFront];
  };

  const createCardBackStyles = () => {
    return [styles.cardPiece, styles.cardBack];
  };

  const isCardDown = () => {
    return piece['state'] === 'down';
  };

  const isCardUp = () => {
    return piece['state'] === 'up';
  };

  const renderCardDownSide = () => {
    return (
      <View 
        style={[
          styles.componentWrapper, 
          styles.cardWrapper, 
          styles.hFull, 
          styles.unmatched
        ]}
        name={name} 
        id={`piece-${id}`} 
        onClick={(e) => flipCardUp(e)}
      >
        <View id={`piece-${id}-front`} style={createCardFrontStyles()}>
          <Text h1>{name}</Text>
        </View>
        <View id={`piece-${id}-back`} style={createCardBackStyles()}></View>
      </View>      
    );
  };

  const renderCardUpSide = () => {
    return (
      <View 
        style={[
          styles.componentWrapper, 
          styles.cardWrapper, 
          styles.hFull, 
          styles.unmatched,
          styles.flipUp,
        ]}
        name={name} 
        id={`piece-${id}`} 
        onClick={(e) => flipCardUp(e)}
      >
        <View id={`piece-${id}-front`} style={createCardFrontStyles()}>
          <Text h1>{name}</Text>
        </View>
        <View id={`piece-${id}-back`} style={createCardBackStyles()}></View>
      </View>      
    );
  };

  return (
    <>
      {isCardDown() && renderCardDownSide()} 
      {isCardUp() && renderCardUpSide()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPiece: {
    width: 60,
    height: 60,
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease', 
  },
  h1: {
    margin: '0',
  },
  cardFront: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
    transform: 'rotateY(180deg)',
  },
  cardBack: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
    zIndex: '1',
    backgroundColor: 'cyan',
  },
  flipUp: {
    transform: 'rotateY(180deg)'		
  }
});