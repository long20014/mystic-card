import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CardGrid from 'components/card-grid';
import CardMenu from 'components/card-menu';

const MainStack = createNativeStackNavigator();

const menuRoutes = [
  {
    label: 'Menu',
    component: CardMenu,
  },
  {
    label: 'CardGrid',
    component: CardGrid,
  },
  {
    label: 'ScoreBoard',
    component: CardGrid,
  },
  {
    label: 'Setting',
    component: CardGrid,
  },
];

export default function MainRouter() {
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
}

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      {menuRoutes.map((item) => (
        <MainStack.Screen
          key={item.label}
          name={item.label}
          component={item.component}
          options={{ headerShown: false }}
        />
      ))}
    </MainStack.Navigator>
  );
}
