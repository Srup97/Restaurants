import React, { useState, useEffect } from 'react';
import { Dimensions, ScrollView, View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import UploadImage from './UploadImage';
import FormAdd from './FormAdd';
import { styles } from './AddRestaurantFormStyles';
import { ValidateData } from './ValidateDataAddRestaurant';
import Modal from '../modal';
import { getCurrentLocation } from '../../utils/helpers';
import MapView, { Marker } from 'react-native-maps';
import { map } from 'lodash';
import { addDocumentWithoutId, getCurrentUser, uploadImage } from '../../utils/actions';
import uuid from 'random-uuid-v4';

import { checkUserLogged } from '../../utils/actions';


const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

const AddRestaurantsForm = ({ toastRef, setLoading, navigation }) => {
  const [formData, setFormData] = useState(defaultFormData());
  const [formDataError, setFormDataError] = useState(defaultFormDataError());
  const [imageSelected, setImageSelected] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationRestaurant, setLocationRestaurant] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = checkUserLogged((isLogged) => {
      setUser(isLogged);
      if (!isLogged) {
        setLoading(false);
        // Navegar a 'restaurants' si el usuario no está logueado
        navigation.navigate('restaurants');
      }
    });
    return () => unsubscribe();
  }, []);

  const addRestaurants = async () => {
    if (!ValidateData(formData, setFormDataError, locationRestaurant, imageSelected, toastRef)) {
      return;
    }

    setLoading(true);

    const responseUploadImages = await uploadImages();

    const restaurants = {
      name: formData.name,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
      description: formData.description,
      callingCode: formData.callingCode,
      location: locationRestaurant,
      images: responseUploadImages,
      rating: 0,
      ratingTotal: 0,
      quatityVoting: 0,
      createdAt: new Date(),
      creatyBy: getCurrentUser().uid,
    };

    const responseAddDocument = await addDocumentWithoutId('restaurants', restaurants);
    setLoading(false);

    if (!responseAddDocument.statusResponse) {
      toastRef.current.show('Error al agregar el restaurante', 3000);
      return;
    }
    navigation.navigate('restaurants');
  };

  const uploadImages = async () => {
    const imageUrl = [];
    await Promise.all(
      map(imageSelected, async (image) => {
        const response = await uploadImage(image, 'restaurants', uuid());
        if (response.statusResponse) {
          imageUrl.push(response.url);
        }
      })
    );
    return imageUrl;
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <TouchableOpacity onPress={() => openModal(imageSelected[0])}>
        <View style={styles.viewPhoto}>
          <Image
            style={styles.image}
            source={imageSelected[0] ? { uri: imageSelected[0] } : require('../../assets/no-image.png')}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.viewContainer}>
        <FormAdd
          formData={formData}
          setFormData={setFormData}
          formDataError={formDataError}
          setIsVisibleMap={setIsVisibleMap}
          locationRestaurant={locationRestaurant}
        />

        <UploadImage toastRef={toastRef} imageSelected={imageSelected} setImageSelected={setImageSelected} />

        <Button
          title="Crear Restaurante"
          onPress={addRestaurants}
          buttonStyle={styles.btnAddRestaurant}
          containerStyle={styles.btnContainer}
        />

        <MapRestaurants
          isVisibleMap={isVisibleMap}
          setIsVisibleMap={setIsVisibleMap}
          setLocationRestaurant={setLocationRestaurant}
          toastRef={toastRef}
        />
      </View>

      <ImageModal image={selectedImage} onClose={closeModal} setModalVisible={setModalVisible} modalVisible={modalVisible} />
    </ScrollView>
  );
};

function MapRestaurants({ isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef }) {
  const [newRegion, setNewRegion] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getCurrentLocation();
      if (response.status) {
        setNewRegion(response.location);
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationRestaurant(newRegion);
    toastRef.current.show("Ubicación guardada correctamente");
    setIsVisibleMap(false);
  }

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setNewRegion({ ...newRegion, latitude, longitude });
  }

  return (
    <Modal
      isVisible={isVisibleMap}
      setVisible={setIsVisibleMap}
      size={{ width: "90%", height: heightScreen }}
    >
      <View>
        {newRegion && (
          <View>
            <MapView
              style={styles.mapStyle}
              initialRegion={newRegion}
              showsUserLocation
              onPress={handleMapPress}
            >
              <Marker
                coordinate={{
                  latitude: newRegion.latitude,
                  longitude: newRegion.longitude,
                }}
                draggable
              />
            </MapView>
          </View>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar"
            containerStyle={styles.btnSaveLocationContainerSave}
            buttonStyle={styles.btnSaveLocationStyleSave}
            onPress={confirmLocation}
          />
          <Button
            title="Cancelar"
            containerStyle={styles.btnSaveLocationContainerCancel}
            buttonStyle={styles.btnSaveLocationStyleCancel}
            onPress={() => setIsVisibleMap(false)}
          />
        </View>
      </View>
    </Modal>
  );
}

const ImageModal = ({ image, onClose, setModalVisible, modalVisible }) => {
  if (!image) return null;

  return (
    <Modal isVisible={modalVisible} setVisible={setModalVisible} transparent={true}>
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={onClose}
      >
        <View style={styles.modalBackground}>
          {image && (
            <Image source={{ uri: image }} style={styles.modalImage} />
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon type="material" name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
const defaultFormData = () => ({
  name: '',
  description: '',
  phone: '',
  email: '',
  address: '',
  country: 'DO',
  callingCode: '1-809',
});

const defaultFormDataError = () => ({
  ErrorName: '',
  ErrorDescription: '',
  ErrorPhone: '',
  ErrorEmail: '',
  ErrorAddress: '',
});

export default AddRestaurantsForm;