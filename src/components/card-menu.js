import React from 'react';

import { StyleSheet, SafeAreaView, Text, View } from 'react-native';

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
    component: 'CardGrid',
  },
];

export default function CardMenu({ navigation }) {
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
