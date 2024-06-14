import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { checkUserLogged } from '../../utils/actions';
import Loading from '../../components/Loading';

export default function Restaurants({navigation}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = checkUserLogged((isLogged) => {
      setUser(isLogged);
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  if (loading) {
    return <Loading isVisible={loading} text="Cargando..." />;
  }

  return (
    <View style={styles.viewBody}>
      <Text>Restaurants....</Text>
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
