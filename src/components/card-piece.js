import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import { useCardPiece } from 'hooks/useCardPiece';

export default function CardPiece({ id, piece }) {
  const { flipCardUp, frontAnimatedStyle, backAnimatedStyle } =
    useCardPiece(piece);

  const createCardFrontStyles = () => {
    return [styles.cardPiece, styles.cardFront, frontAnimatedStyle];
  };

  const createCardBackStyles = () => {
    return [styles.cardPiece, styles.cardBack, backAnimatedStyle];
  };

  const Card = () => {
    return (
      <>
        <TouchableOpacity onPress={flipCardUp}>
          <View
            style={[
              styles.componentWrapper,
              styles.cardWrapper,
              styles.hFull,
              styles.unmatched,
            ]}
            name={piece.name}
            id={`piece-${id}`}
          >
            <Animated.View
              id={`piece-${id}-back`}
              style={createCardBackStyles()}
            ></Animated.View>
            <Animated.View
              id={`piece-${id}-front`}
              style={createCardFrontStyles()}
            >
              <Text h1>{piece.name}</Text>
            </Animated.View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return <Card />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  cardPiece: {
    width: 60,
    height: 60,
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    margin: '0',
  },
  cardFront: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
  cardBack: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
    zIndex: 1,
    backgroundColor: 'cyan',
  },
});
