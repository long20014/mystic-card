import React from 'react';
import { StyleSheet, View } from 'react-native';
import CardGrid from './card-grid';
import { useCardPage } from 'hooks/useCardPage';

export default function CardPage() {
  // const { } = useCardPage();
  return (
    <View style={[styles.container]}>
      <CardGrid CardGrid></CardGrid>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c3c3c3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
