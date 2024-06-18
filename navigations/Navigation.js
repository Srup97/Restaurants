import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import AccountStack from './AccountStack';
import FavoritesStack from './FavoriresStack';
import RestaurantsStack from './RestaurantsStack';
import TopRestaurantsStack from './TopRestaurantsStack'
import SearchStack from './SearchStack';
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
          inactiveTintColor: "#442384",
          activeTintColor: "#00a680",
        })}
      >

        <Tab.Screen
          name="restaurants"
          component={RestaurantsStack}
          options={{ headerShown: false }}
          />

        <Tab.Screen
          name="favorites"
          component={FavoritesStack}
          options={{ headerShown: false }}
          />

        <Tab.Screen
          name="top-restaurants"
          component={TopRestaurantsStack}
          options={{ headerShown: false }}
          />

        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ headerShown: false }}
          />

        <Tab.Screen
          name="account"
          component={AccountStack}
                options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}