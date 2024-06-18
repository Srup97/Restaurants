import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Modal, Image, Alert } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { loadImageFromGallery } from '../../utils/helpers';

export default function UploadImage({ imageSelected, setImageSelected }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const imageSelect = async () => {
    console.log('Seleccionando imagen');
    const response = await loadImageFromGallery([4, 3]);
    if (!response.status) {
      toastRef.current.show('No se pudo cargar la imagen', 3000);
      return;
    }
    setImageSelected([...imageSelected, response.image]);
  };

  const removeImage = (image) => {
      Alert.alert(
        "¿Estás seguro de que quieres eliminar esta imagen?",
        "Esta acción no se puede deshacer",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Remove", onPress: () => setImageSelected(imageSelected.filter(img => img !== image))
        },
        ],
        { cancelable: true }
      );

  };

  const handleImagePress = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <View>
      <ScrollView horizontal style={styles.viewImages}>
        <View style={styles.containerIcon}>
          <TouchableOpacity onPress={imageSelect}>
            <Icon
              type="material-community"
              name="camera"
              size={35}
              color="#7a7a7a"
            />
          </TouchableOpacity>
        </View>
        {imageSelected.map((imageRestaurant, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageContainer}
            onPress={() => handleImagePress(imageRestaurant)}
          >
            <Avatar
              style={styles.miniatureStyle}
              source={{ uri: imageRestaurant }}
              size="large"
              containerStyle={styles.avatar}
            />
            <TouchableOpacity
              style={styles.removeIcon}
              onPress={() => removeImage(imageRestaurant)}
            >
              <Icon
                type="material-community"
                name="close"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ImageModal image={selectedImage} onClose={handleCloseModal} />
    </View>
  );
}

const ImageModal = ({ image, onClose }) => {
  return (
    <Modal visible={!!image} transparent={true}>
      <TouchableOpacity style={styles.modalBackground} onPress={onClose}>
        <Image source={{ uri: image }} style={styles.modalImage} />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon type="material" name="close" size={24} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewImages: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  containerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 70,
    backgroundColor: '#e3e3e3',
    marginRight: 10,
    borderRadius: 10,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  removeIcon: {
    position: 'absolute',
    top: 1,
    right: -2,
    backgroundColor: '#ff0000',
    borderRadius: 20,
    padding: 1,
  },
  miniatureStyle: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  avatar: {
    borderRadius: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
