import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import CardGrid from './card-grid';
import { useCardPage } from 'hooks/useCardPage';

export default function CardPage() {
  // const { } = useCardPage();
  return (
    <SafeAreaView>
      <CardGrid CardGrid></CardGrid>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c3c3c3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
