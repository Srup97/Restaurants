import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';
import { Picker } from '@react-native-picker/picker';

export default function FormAdd({
  formData,
  setFormData,
  formDataError,
  setIsVisibleMap,
  locationRestaurant
}) {
  const [callingCodes, setCallingCodes] = useState(['1829', '1809', '1849']);

  const onChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text,
    });
  };

  const onSelectCountry = (country) => {
    let codes = country.callingCode;
    if (country.cca2 === 'DO') {
      codes = ['1829', '1809', '1849'];
    }

    setFormData({
      ...formData,
      country: country.cca2,
      callingCode: codes[0],
    });

    setCallingCodes(codes);
  };

  // Actualiza la dirección cuando se selecciona la ubicación en el mapa

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del Restaurante"
        containerStyle={styles.input}
        defaultValue={formData.name}
        onChange={(e) => onChange(e, "name")}
        errorMessage={formDataError.ErrorName}
      />
      <Input
        placeholder="Dirección del Restaurante"
        containerStyle={styles.input}
        defaultValue={formData.address}
        onChange={(e) => onChange(e, "address")}
        errorMessage={formDataError.ErrorAddress}
        rightIcon={{
          type: "material-community",
          name: "map-marker-radius",
          color: locationRestaurant ? "#442484" : "#666",
          size: 25,
          onPress: () => setIsVisibleMap(true),
        }}
      />
      <Input
        placeholder="Email del Restaurante"
        keyboardType="email-address"
        containerStyle={styles.input}
        defaultValue={formData.email}
        onChange={(e) => onChange(e, "email")}
        errorMessage={formDataError.ErrorEmail}
      />
      <View style={styles.phoneView}>
        <CountryPicker
          withFilter
          withFlag
          containerButtonStyle={styles.countryPicker}
          countryCode={formData.country}
          onSelect={onSelectCountry}
        />
        <Input
          placeholder="WhatsApp"
          keyboardType="phone-pad"
          errorMessage={formDataError.ErrorPhone}
          defaultValue={formData.phone}
          onChange={(e) => onChange(e, "phone")}
          containerStyle={[styles.input, styles.inputPhone]}
          inputContainerStyle={styles.inputContainerStyle}
          leftIcon={
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.callingCode}
                style={styles.picker}
                onValueChange={(value) =>
                  setFormData({ ...formData, callingCode: value })
                }
              >
                {callingCodes.map((code) => (
                  <Picker.Item key={code} label={`+${code}`} value={code} style={styles.pickerItem} />
                ))}
              </Picker>
            </View>
          }
        />
      </View>
      <Input
        placeholder="Descripción del Restaurante..."
        multiline
        containerStyle={[styles.input, styles.textArea]}
        onChange={(e) => onChange(e, "description")}
        defaultValue={formData.description}
        errorMessage={formDataError.ErrorDescription}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  input: {
    marginBottom: 15,
  },
  phoneView: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  inputPhone: {
    flex: 1,
    marginBottom: 0,
  },
  textArea: {
    height: 150,
    marginBottom: 20,
  },
  countryPicker: {
    width: '15%',
    justifyContent: 'center',
  },
  pickerWrapper: {
    width: 90, // Ajuste del tamaño del Picker
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    marginRight: 5, // Reducción del margen derecho para acercar el Picker al código de llamada
  },
  picker: {
    height: 40,
    width: '150%',
  },
  pickerItem: {
    fontSize: 15, // Ajuste del tamaño de fuente del Picker.Item si es necesario
    paddingHorizontal: 20,  // Ajuste del espacio interno horizontal para reducir el espacio alrededor del texto
  },

  inputContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingLeft: 5, // Ajuste del espacio interno para que el Picker no esté demasiado cerca del borde
  },
});