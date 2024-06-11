import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Restaurants from '../screens/Restaurants';
import Favorites from '../screens/Favorites';
import TopRestaurants from '../screens/TopRestaurants';
import Search from '../screens/Search';
import AccountStack from './AccountStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const screenOptions = (route, color) => {
    let iconName;
    switch (route.name) {
      case 'restaurants':
        iconName = 'compass-outline';
        break;
      case 'favorites':
        iconName = 'heart-outline';
        break;
      case 'top-restaurants':
        iconName = 'star-outline';
        break;
      case 'search':
        iconName = 'magnify';
        break;
      case 'account':
        iconName = 'account-outline';
        break;
      default:
        break;
    }
    return <Icon type="material-community" name={iconName} size={22} color={color} />;
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="restaurants"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          inactiveTintColor: '#442384',
          activeTintColor: '#00a680',
        })}
      >
        <Tab.Screen
          name="restaurants"
          component={Restaurants}
          options={{ title: 'Restaurantes' }}
        />
        <Tab.Screen
          name="favorites"
          component={Favorites}
          options={{ title: 'Favoritos' }}
        />
        <Tab.Screen
          name="top-restaurants"
          component={TopRestaurants}
          options={{ title: 'Top Restaurantes' }}
        />
        <Tab.Screen
          name="search"
          component={Search}
          options={{ title: 'Buscar' }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: 'Cuenta' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
