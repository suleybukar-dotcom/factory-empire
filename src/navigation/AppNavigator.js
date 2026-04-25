import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GachaScreen, MainScreen, MapScreen, MissionsScreen, ShopScreen } from '../screens';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#111827', borderTopColor: '#1f2937' },
          tabBarActiveTintColor: '#818cf8',
        }}
      >
        <Tab.Screen name="Usine" component={MainScreen} />
        <Tab.Screen name="Boutique" component={ShopScreen} />
        <Tab.Screen name="Gacha" component={GachaScreen} />
        <Tab.Screen name="Missions" component={MissionsScreen} />
        <Tab.Screen name="Carte" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
