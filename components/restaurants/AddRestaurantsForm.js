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

const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantsForm({ toastRef, setLoading, navigation }) {
  const [formData, setFormData] = useState(defaultFormData());
  const [formDataError, setFormDataError] = useState(defaultFormDataError());
  const [imageSelected, setImageSelected] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationRestaurant, setLocationRestaurant] = useState(null);

  const addRestaurants = () => {
    console.log(formData);
    console.log('Agregando Restaurante');
    if (!ValidateData(formData, setFormDataError)) {
      return;
    }
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
            source={
              imageSelected[0]
                ? { uri: imageSelected[0] }
                : require("../../assets/no-image.png")
            }
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

        <UploadImage
          toastRef={toastRef}
          imageSelected={imageSelected}
          setImageSelected={setImageSelected}
        />
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
          locationRestaurant={locationRestaurant}
          toastRef={toastRef}
        />
      </View>

      <ImageModal image={selectedImage} onClose={closeModal} setModalVisible={setModalVisible} modalVisible={modalVisible} />
    </ScrollView>
  );
}

function MapRestaurants({ isVisibleMap, setIsVisibleMap, locationRestaurant, setLocationRestaurant, toastRef }) {
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
      setLocationRestaurant(newRegion)
      toastRef.current.show("Ubicación guardada correctamente");
      setIsVisibleMap(false);
  }

  return (
    <Modal
      isVisible={isVisibleMap}
      setVisible={setIsVisibleMap}
      size={{ width: "90%", height: "80%" }}
    >
      <View>
        {newRegion && (
          <View>
            <MapView
             style={styles.mapStyle}
             initialRegion={newRegion}
             showsUserLocation
             onRegionChange={(region) => setNewRegion(region)}
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
            onPress={()=>{
              setIsVisibleMap(false);
            }
          }
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

const defaultFormData = () => {
  return {
    name: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    country: "DO",
    callingCode: "1-809",
  };
};

const defaultFormDataError = () => {
  return {
    ErrorName: "",
    ErrorDescription: "",
    ErrorPhone: "",
    ErrorEmail: "",
    ErrorAddress: "",
  };
};