import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useCardSetting } from 'hooks/useCardSetting';
import constants from 'utils/constants';

const { NORMAL, HARD, NIGHTMARE } = constants;
const levels = [NORMAL, HARD, NIGHTMARE];

export default function CardSetting({ navigation }) {
  const { state, changeGameLevel } = useCardSetting();
  return (
    <View style={[styles.menu]}>
      <SelectDropdown
        data={levels}
        onSelect={(selectedItem, index) => {
          changeGameLevel(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        defaultValue={state.gameLevel.level}
      />
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
