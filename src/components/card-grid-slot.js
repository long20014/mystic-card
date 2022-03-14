import React from 'react';
import CardPiece from 'components/card-piece';
import { StyleSheet, View } from 'react-native';

export default function CardGridSlot({ id, piece }) {
  const createCardPiece = () => {
    if (id !== null) {
      return <CardPiece id={id} key={id} piece={piece} />;
    }
  };

  return createCardPiece();
}

// const styles = StyleSheet.create({
//   cardGridSlot: {
//     position: 'relative',
//     backgroundColor: 'white',
//     width: 60,
//     height: 60,
//     margin: 5,
//   },
// });
