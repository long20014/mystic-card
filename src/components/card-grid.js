import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useCardGrid } from 'hooks/useCardGrid';

const gridStyle = { 
  border: '1px solid wheat',  
};

export default function CardGrid() {
  const {
    renderGridSlots,
    getCardArr   
  } = useCardGrid();

  const gridSlots = renderGridSlots(getCardArr());
  
  return (
    <>
      <FlatList
        contentContainerStyle={styles.grid}
        numColumns={4}
        data={gridSlots}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item}
      />
    </>
  );
}

const styles = StyleSheet.create({
  gridStyle,
  grid: {
    marginBottom: 32,
    marginTop: 16,
    height: 290,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 5,
    border: '1px solid wheat',  
  }
});
