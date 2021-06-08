import React from 'react';
import CardPiece from 'components/card-piece';
import { StyleSheet, View } from 'react-native';

export default function CardGridSlot({id, piece}) {
  const createCardPiece = () => { 
    if (name !== null) {      
      return <CardPiece key={id} piece={piece}/>;
    }    
  };
  
  return (
    <View id={`slot-${id}`} style={styles.cardGridSlot}>
      {createCardPiece()}
    </View>
  );
}

const styles = StyleSheet.create({
  cardGridSlot: {
    position: 'relative',
    backgroundColor: 'white',
    width: 60,
    height: 60,
    margin: 5
  },
});
