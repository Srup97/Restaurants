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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: widthScreen,
    height: 400,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  mapStyle: {
    width: '100%',
    height: 700, // Ajustado para una mejor visualización
  },
  viewMapBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },

  btnSaveLocationContainerSave: {
    width: '70%',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnSaveLocationContainerCancel: {
    width: '70%',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnSaveLocationStyleSave: {
    backgroundColor: '#34A853',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  btnSaveLocationStyleCancel: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
});