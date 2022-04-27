import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

export default function Test() {
  return (
    <View style={[styles.menu]}>
      <Text>Test 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 530,
  },
});
