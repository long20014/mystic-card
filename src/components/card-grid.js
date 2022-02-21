import React from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { useCardGrid } from 'hooks/useCardGrid';

export default function CardGrid() {
  const {
    testWinGame,
    handleRestartGame,
    showRestartButton,
    renderGridSlot,
    getCardArr,
    getMoveCount,
    getMatchCount,
  } = useCardGrid();
  const hiddenStyle = showRestartButton ? '' : styles.hidden;
  const cardArr = getCardArr();
  const moveCount = { count: getMoveCount() }; // this is used for flatlist re-render working
  const matchCount = getMatchCount();
  return (
    <SafeAreaView style={[styles.container]}>
      <TouchableOpacity style={[styles.moveCount]}>
        <Text style={[styles.textStyle]}>{moveCount.count}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.moveCount]}>
        <Text style={[styles.textStyle]}>{matchCount}</Text>
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={styles.grid}
        numColumns={4}
        data={cardArr}
        extraData={moveCount}
        keyExtractor={(item, index) => 'slot-' + index.toString()}
        renderItem={({ item }) => renderGridSlot(item)}
      />
      <TouchableOpacity
        style={[hiddenStyle, styles.buttonStyle]}
        onPress={handleRestartGame}
      >
        <Text style={[styles.textStyle]}>Restart Game</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonStyle]} onPress={testWinGame}>
        <Text style={[styles.textStyle]}>Win Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginBottom: 32,
    marginTop: 16,
    height: 290,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 5,
  },
  hidden: {
    display: 'none',
  },
  buttonStyle: {
    marginBottom: 16,
    width: 130,
    backgroundColor: '#841584',
    alignItems: 'center',
    padding: 10,
  },
  textStyle: {
    color: 'white',
  },
  moveCount: {
    marginBottom: 16,
    marginTop: 16,
    width: 130,
    backgroundColor: '#841584',
    alignItems: 'center',
    padding: 10,
  },
  container: {
    backgroundColor: '#c3c3c3',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
});
