import { StyleSheet, Dimensions } from 'react-native';

const widthScreen = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  viewPhoto: {
    alignItems: 'center',
    marginBottom: 20,
    height: 200,
  },
  image: {
    width: widthScreen,
    height: 200,
    resizeMode: 'cover',
  },
  viewContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  btnAddRestaurant: {
    height: 50,
    backgroundColor: "#442484",
    borderRadius: 25,
  },
  btnContainer: {
    marginVertical: 20,
    alignSelf: 'center',
    width: '80%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color de fondo semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: widthScreen,
    height: 400, // Ajusta la altura del modal según sea necesario
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  mapStyle: {
    width: '100%',
    height: 550,
  },
  
});
