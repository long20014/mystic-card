import React from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { useCardGrid } from 'hooks/useCardGrid';
import Timer from 'components/timer';

export default function CardGrid() {
  const {
    testWinGame,
    handleRestartGame,
    handleNextStage,
    showRestartButton,
    showNextStageButton,
    renderGridSlot,
    getCardArr,
    getMoveCount,
    getGameLevel,
    getMatchCount,
    handleStartGame,
    getIsInit,
  } = useCardGrid();
  const hiddenStyle = showRestartButton ? '' : styles.hidden;
  const hiddenStyle2 = showRestartButton || getIsInit() ? styles.hidden : '';
  const hiddenStyle3 = showRestartButton || !getIsInit() ? styles.hidden : '';
  const hiddenStyle4 = showNextStageButton ? '' : styles.hidden;
  const cardArr = getCardArr();
  const moveCount = { count: getMoveCount() }; // this is used for flatlist re-render working
  const matchCount = getMatchCount();
  const gameLevel = getGameLevel();
  const gamelevelLabel = `Level: ${gameLevel.levelNumber} | Stage: ${gameLevel.currentStage.stageNumber}`;
  return (
    <SafeAreaView style={[styles.container]}>
      <Timer />
      <TouchableOpacity style={[styles.moveCount]}>
        <Text style={[styles.textStyle]}>{gamelevelLabel}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.moveCount]}>
        <Text style={[styles.textStyle]}>{moveCount.count}</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={[styles.moveCount]}>
        <Text style={[styles.textStyle]}>{matchCount}</Text>
      </TouchableOpacity> */}
      <FlatList
        contentContainerStyle={styles.grid}
        numColumns={4}
        data={cardArr}
        extraData={moveCount}
        keyExtractor={(item, index) => 'slot-' + index.toString()}
        renderItem={({ item }) => renderGridSlot(item)}
      />
      <TouchableOpacity
        style={[hiddenStyle4, styles.buttonStyle]}
        onPress={handleNextStage}
      >
        <Text style={[styles.textStyle]}>Next Stage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[hiddenStyle, styles.buttonStyle]}
        onPress={handleRestartGame}
      >
        <Text style={[styles.textStyle]}>Restart Game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[hiddenStyle3, styles.buttonStyle]}
        onPress={testWinGame}
      >
        <Text style={[styles.textStyle]}>Win Game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[hiddenStyle2, styles.buttonStyle]}
        onPress={handleStartGame}
      >
        <Text style={[styles.textStyle]}>Start Gane</Text>
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
    width: 150,
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
