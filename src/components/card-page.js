import React from 'react';
import { StyleSheet, View } from 'react-native';
import CardGrid from './card-grid';
import { CardStateProvider } from 'context/card/index';

export default function CardPage() {
  return (
    <CardStateProvider>
      <View style={styles.container}>
        <CardGrid CardGrid></CardGrid>
      </View>
    </CardStateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
