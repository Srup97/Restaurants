import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import { formatPhone } from '../../utils/helpers';

export default function ListRestaurants({ restaurant, navigation }) {
  const { id, images, name, description, address, phone, callingCode } = restaurant;
  const imageRestaurant = images[0];

  const handleRestaurantPress = () => {
    // Handle navigation to restaurant details screen
    // navigation.navigate('RestaurantDetails', { restaurant });
  };

  return (
    <TouchableOpacity onPress={handleRestaurantPress}>
      <View style={styles.viewRestaurant}>
        <View style={styles.viewRestaurantImage}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="#fff"/>}
            source={{ uri: imageRestaurant }}
            style={styles.imageRestaurant}
          />
        </View>
        <View style={styles.restaurantDetails}>
          <Text style={styles.restaurantTitle}>{name}</Text>
          <Text style={styles.restaurantInformation}>{address}</Text>
          <Text style={styles.restaurantInformation}>{formatPhone(callingCode, phone)}</Text>
          <Text style={styles.restaurantDescription}>
            {
              description.length > 60 ? `${description.substr(0, 60)}...` : description
            }
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewRestaurant: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
  },
  viewRestaurantImage: {
    marginRight: 15,
  },
  imageRestaurant: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  restaurantInformation: {
    paddingTop: 2,
    color: "grey",
  },
  restaurantDescription: {
    paddingTop: 2,
    color: "grey",
    width: "90%"
  },
});
