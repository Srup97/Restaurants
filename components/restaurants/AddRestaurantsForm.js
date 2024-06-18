import React, { useState, useEffect } from 'react';
import { Dimensions, ScrollView, View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import UploadImage from './UploadImage';
import FormAdd from './FormAdd';
import { styles } from './AddRestaurantFormStyles';
import { ValidateData } from './ValidateDataAddRestaurant';

import Modal from '../modal';
import { getCurrentLocation } from '../../utils/helpers';
import MapView from 'react-native-maps';

const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantsForm({ toastRef, setLoading, navigation }) {
  const [formData, setFormData] = useState(defaultFormData());
  const [formDataError, setFormDataError] = useState(defaultFormDataError());
  const [imageSelected, setImageSelected] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
   const [isVisibleMap, setIsVisibleMap] = useState(false)
   const [locationRestaurant, setLocationRestaurant] = useState(null)

  const addRestaurants = () => {
    console.log(formData);
    console.log('Agregando Restaurante');
    // Aquí puedes agregar el código para guardar los datos del restaurante
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
        <FormAdd formData={formData} setFormData={setFormData} formDataError={formDataError} setIsVisibleMap={setIsVisibleMap} />
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

function MapRestaurants({ isVisibleMap, setIsVisibleMap, locationRestaurant, setLocationRestaurant, toastRef  }) {

    useEffect(() => {
      (async () => {
          const response = await getCurrentLocation()
          if(response.status) {
              setLocationRestaurant(response.location)
              console.log(response.location);
          }
      })();
  }, []);


  return (
        <Modal isVisible={isVisibleMap} setVisible={setIsVisibleMap} size={{ width: '90%', height: '75%' }}>
            <View>
                {
                  locationRestaurant && (
                    <MapView
                      style={styles.mapStyle}
                      initialRegion={locationRestaurant}
                      showsUserLocation
                    >

                    </MapView>
                  )
                }
            </View>
        </Modal>
  );
}


const ImageModal = ({ image, onClose,setModalVisible, modalVisible  }) => {
  // Verificar si hay una imagen seleccionada antes de mostrar el modal
  if (!image) return null;

  return (
    <Modal  isVisible ={modalVisible} setVisible={setModalVisible} transparent={true}>
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={onClose} // Esto cierra el modal cuando se toca fuera de él
      >
        <View style={styles.modalBackground}>
          {image ? (
            <Image source={{ uri: image }} style={styles.modalImage} />
          ) : null}
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
    country: "DO", // Código del país por defecto (República Dominicana)
    callingCode: "1-809", // Código de área por defecto
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
