// Restaurants.js
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, RefreshControl, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { size } from 'lodash';
import { checkUserLogged } from '../../utils/actions';
import Loading from '../../components/Loading';
import { getRestaurants } from '../../utils/actions';
import ListRestaurants from '../../components/restaurants/ListRestaurants';

export default function Restaurants({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const limitRestaurants = 7;

  useEffect(() => {
    setLoading(true);
    const unsubscribe = checkUserLogged((isLogged) => {
      setUser(isLogged);
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();

    }, [])
  );

  const fetchData = async () => {
    setLoading(true);
    const response = await getRestaurants(limitRestaurants);

    if (response.statusResponse) {
      setStartRestaurants(response.startRestaurants);
      setRestaurants(response.restaurants);
    }
    setLoading(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  if (loading) {
    return <Loading isVisible={loading} text="Cargando..." />;
  }

  return (
    <View style={styles.viewBody}>
      {
        size(restaurants) > 0 ? (
          <FlatList
            data={restaurants}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListRestaurants
                restaurants={restaurants}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        ) : (
          <View style={styles.noRestaurantsView}>
            <Text style={styles.noRestaurantsText}>No hay restaurantes</Text>
          </View>
        )
      }

      {user && (
        <Icon
          type='material-community'
          name='plus'
          color="#442484"
          reverse
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate('add-restaurants')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  btnContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  noRestaurantsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRestaurantsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  }
});