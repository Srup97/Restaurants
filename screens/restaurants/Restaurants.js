import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { checkUserLogged } from '../../utils/actions';
import Loading from '../../components/Loading';
import { useFocusEffect } from '@react-navigation/native';
import { getRestaurants } from '../../utils/actions';
import ListRestaurants from '../../components/restaurants/ListRestaurants';

export default function Restaurants({navigation}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startRestaurants, setStartRestaurants] = useState(null)
  const [restaurants, setRestaurants] = useState([])

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
    useCallback (async () => {
      setLoading(true);
      const response = await getRestaurants(limitRestaurants);
      if(response.statusResponse) {
        setStartRestaurants(response.startRestaurants);
        setRestaurants(response.restaurants);
      }
      setLoading(false);
    }, [])
  )


  if (loading) {
    return <Loading isVisible={loading} text="Cargando..." />;
  }

  return (
    <View style={styles.viewBody}>
        <ListRestaurants
          restaurants={restaurants}
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
  }
});
