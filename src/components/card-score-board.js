import React from 'react';

import { StyleSheet, SafeAreaView, Text, View } from 'react-native';

export default function CardScoreBoard({ navigation }) {
  return (
    <View style={[styles.menu]}>
      <Text>Score board</Text>
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
