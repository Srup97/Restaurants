import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Restaurants from '../screens/restaurants/Restaurants';
import AddRestaurant from '../screens/restaurants/AddRestaurant';
import Restaurant from '../screens/restaurants/Restaurant';

const Stack = createStackNavigator();

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants"
        component={Restaurants}
        options={{ title: "Restaurantes" }}
      />
      <Stack.Screen
        name="add-restaurants"
        component={AddRestaurant}
        options={{ title: "Crear Restaurantes" }}
      />

      <Stack.Screen
        name="restaurant"
        component={Restaurant}
        // options={{ title: "Restaurante" }}
      />
    </Stack.Navigator>
  );
}
