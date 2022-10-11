import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rating = (stars) => `★★★☆☆☆`.slice(3 - stars, 6 - stars);

export default function CardScoreBoard({ navigation }) {
  const [scoreBoard, setScoreBoard] = useState(null);

  useEffect(() => {
    const setScoreBoardFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('scoreBoard');
        const jsonValue = value != null ? JSON.parse(value) : null;
        console.log(jsonValue);
        setScoreBoard(jsonValue);
      } catch (e) {
        console.error(e);
        // error reading value
      }
    };

    setScoreBoardFromStorage();
  }, []);

  return (
    <View style={[styles.menu]}>
      <Text style={[styles.menuItem]}>Score Board</Text>
      {scoreBoard &&
        Object.entries(scoreBoard).map(([key, value], i) => (
          <Text key={key} style={[styles.menuItem]}>
            Level: {value.levelNumber} | Stage: {value.stageNumber} | Star:{' '}
            {rating(value.star)} | Best time: {value.bestTime}s
          </Text>
        ))}
      <Text
        onPress={() => navigation.navigate('Menu')}
        style={[styles.menuItem]}
      >
        Back
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 12,
  },
});
