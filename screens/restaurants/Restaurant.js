import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getDocumentById } from '../../utils/actions';
import Loading from '../../components/Loading';
import CarouselImage from '../../components/CarouselImage';
import { Rating } from 'react-native-elements';

const widthScreen = Dimensions.get("window").width;

export default function Restaurant({ navigation, route }) {
  const [restaurant, setRestaurant] = useState(null);
  const { id, name } = route.params;
  navigation.setOptions({ title: name });

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await getDocumentById("restaurants", id);
      if (response.statusResponse) {
        setRestaurant(response.document);
      } else {
        setRestaurant({});
        Alert.alert("Ocurrió un problema cargando el restaurante. Intente más tarde");
      }
    };

    fetchRestaurant();
  }, [id]);

  if (!restaurant) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  return (
    <ScrollView style={styles.viewBody}>
      <CarouselImage
        images={restaurant.images}
        height={250}
        width={widthScreen}
      />
      <TitleRestaurant
        name={name}
        description={restaurant.description}
        rating={restaurant.rating}
      />
    </ScrollView>
  );
}

function TitleRestaurant({ name, description, rating }) {
  return (
    <View style={styles.viewRestaurantTitle}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.ratingContainer}>
        <Rating
          style={styles.rating}
          imageSize={20}
          startingValue={parseFloat(rating)}
          readonly
        />
      </View>
      <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewRestaurantTitle: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    paddingVertical: 10,
  },
  descriptionRestaurant: {
    fontSize: 16,
    color: '#666',
    textAlign: 'justify',
    marginTop: 10,
  },
});
