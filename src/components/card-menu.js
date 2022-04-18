import React, { useEffect } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCardContext, setScoreBoard } from 'context/card/index';

const menu = [
  {
    label: 'Start Game',
    component: 'CardGrid',
  },
  {
    label: 'Score Board',
    component: 'CardGrid',
  },
  {
    label: 'Setting',
    component: 'Setting',
  },
];

const setScoreBoardFromStorage = async (dispatch) => {
  try {
    const value = await AsyncStorage.getItem('scoreBoard');
    const jsonValue = value != null ? JSON.parse(value) : null;
    setScoreBoard(dispatch(setScoreBoard(jsonValue)));
  } catch (e) {
    // error reading value
  }
};

export default function CardMenu({ navigation }) {
  const { dispatch } = useCardContext();

  useEffect(() => {
    setScoreBoardFromStorage(dispatch);
  }, []);

  return (
    <View style={[styles.menu]}>
      {menu.map((item, index) => (
        <Text
          key={item.label + index}
          onPress={() => navigation.navigate(item.component)}
          style={[styles.menuItem]}
        >
          {item.label}
        </Text>
      ))}
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
