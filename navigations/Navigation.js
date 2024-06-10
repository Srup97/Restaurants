import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Search from '../screens/Search';
import Favorites from '../screens/Favorites';
import TopRestaurants from '../screens/TopRestaurants';
import Restaurants from '../screens/Restaurants';
import { Icon } from 'react-native-elements';
import screenOptions from './screenOptions';
import Account from '../screens/account/Account';

const Tab = createBottomTabNavigator();

export default function Navigation() {

  
  return <NavigationContainer>
        <Tab.Navigator
        initialRouteName='restaurants'
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => screenOptions(route, color),
            inactiveTintColor: "#442384",
            activeTintColor: "#00a680"
        })}
        >
        <Tab.Screen
                    name="restaurants"
                    component={Restaurants}
                    options={{ title: "Restaurantes" }}
                />

        <Tab.Screen
             name="favorites"
              component={Favorites}
               options={{
                title: "Favoritos"
              }}
              />

              <Tab.Screen 
              name="top-restaurants"
              component={TopRestaurants}
               options={{
                title: "Top Restaurantes"
              }}
              />

            <Tab.Screen
             name="search"
              component={Search}
              options={{
                title: "Buscar"
              }}
               />
        
            <Tab.Screen
             name="account"
              component={Account} 
              options={{
                title: "Cuenta"
              }}
               />        
        </Tab.Navigator>
  </NavigationContainer>;
}