import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, RefreshControl, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { checkUserLogged, getRestaurants, getMoreRestaurants } from '../../utils/actions';
import Loading from '../../components/Loading';
import ListRestaurants from '../../components/restaurants/ListRestaurants';

export default function Restaurants({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [moreRestaurants, setMoreRestaurants] = useState(true); // Estado para controlar si hay más restaurantes para cargar
  const limitRestaurants = 8;

  useEffect(() => {
    const unsubscribe = checkUserLogged((isLogged) => {
      setUser(isLogged);
      if (!isLogged) {
        setLoading(false);
      }
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
      setMoreRestaurants(response.restaurants.length === limitRestaurants); 
    }
    setLoading(false);
  };

  const handleLoadMore = async () => {
    if (loadingMore || !startRestaurants || !moreRestaurants) return;
    setLoadingMore(true);
    const response = await getMoreRestaurants(limitRestaurants, startRestaurants);
    if (response.statusResponse) {
      if (response.restaurants.length > 0) {
        setStartRestaurants(response.startRestaurants);
        setRestaurants(prevRestaurants => [...prevRestaurants, ...response.restaurants]);
        setMoreRestaurants(response.restaurants.length === limitRestaurants); 
      } else {
        setMoreRestaurants(false); 
      }
    }
    setLoadingMore(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  if (loading && !refreshing) {
    return <Loading isVisible={loading} text="Cargando..." />;
  }

  return (
    <View style={styles.viewBody}>
      <FlatList
        data={restaurants}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => (
          <ListRestaurants restaurant={item} navigation={navigation} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#442484']}
          />
        }
        ListEmptyComponent={
          <View style={styles.noRestaurantsView}>
            <Text style={styles.noRestaurantsText}>No hay restaurantes</Text>
          </View>
        }
        contentContainerStyle={styles.flatListContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loadingMore && <Loading isVisible={true} text="Cargando más restaurantes..." />
        }
      />
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
    backgroundColor: '#FFF',
  },
  btnContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: '#000',
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
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
