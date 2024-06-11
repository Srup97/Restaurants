import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent style={styles.viewBody}> 
      <View style={styles.container}>
        <Image
          source={require("../../assets/logoResstaurant.png")}
          resizeMode="contain"
          style={styles.image}
          containerStyle={styles.imageContainer}
        />
        <Text style={styles.title}>Consulta tu perfil en Restaurants</Text>
        <Text style={styles.description}>
          ¿Cómo describirías tu mejor restaurante? Busca y visualiza los mejores restaurantes de una forma sencilla, vota cuál te ha gustado más y comenta cómo ha sido tu experiencia.
        </Text>
        <Button 
          buttonStyle={styles.button}
          title="Ver tu perfil"
          onPress={() => navigation.navigate('login')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginHorizontal: 30,
    backgroundColor: '#f0f0f0', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    height: 320,
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#442484',
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#00a040',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#442484',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
});
