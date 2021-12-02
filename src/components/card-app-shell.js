import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CardStateProvider } from 'context/card/index';
import CardPage from './card-page';

export default function CardAppShell() {
  return (
    <CardStateProvider>
      <View style={styles.container}>
        <CardPage />
      </View>
    </CardStateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
