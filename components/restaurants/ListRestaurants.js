import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements';
import { formatPhone } from '../../utils/helpers';
import { size } from 'lodash';

export default function LitRestaurants({ restaurants, navigation }) {
  const renderRestaurant = ({ item }) => {
    const { id, images, name, description, rating, location, address, phone, callingCode } = item;
    const imageRestaurant = images[0];

    return (
      <TouchableOpacity onPress={() => handleRestaurantPress(item)}>
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
                size(description) > 0
                  ? `${description.substr(0, 60)}...`
                  : description
              }
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleRestaurantPress = (restaurant) => {
    // Handle navigation to restaurant details screen
    //navigation.navigate('RestaurantDetails', { restaurant });
  };

  return (
    <FlatList
      data={restaurants}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderRestaurant}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
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
