import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal'; // Importar CountryPicker

export default function FormAdd({
  formData,
  setFormData,
  formDataError,
  setIsVisibleMap,
  locationRestaurant
}) {

  const onChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text,
    });
  };

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
          color: locationRestaurant ?  "#442484" : "#666",
          size: 25,
          onPress: () => setIsVisibleMap(true),
        }}
      />
      <Input
        placeholder="Email del Restaurante"
        containerStyle={styles.input}
        defaultValue={formData.email}
        onChange={(e) => onChange(e, "email")}
        errorMessage={formDataError.ErrorEmail}
      />
      <View style={styles.phoneView}>
        <CountryPicker
          withFilter
          withFlag
          withFlagButton
          withCallingCode
          withCallingCodeButton
          withModal
          containerStyle={styles.countryPicker}
          countryCode={formData.country}
          onChange={(e) => onChange(e, "country")}
          onSelect={(country) => {
            setFormData({
              ...formData,
              country: country.cca2,
              callingCode: country.callingCode[0],
            });
          }}
        />

        <Input
          placeholder="WhatsApp del Restaurante..."
          keyboardType="phone-pad"
          errorMessage={formDataError.ErrorPhone}
          defaultValue={formData.phone}
          onChange={(e) => onChange(e, "phone")}
          containerStyle={[styles.input, styles.inputPhone]}
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
    marginHorizontal: 10,
  },
  input: {
    marginBottom: 10,
  },
  phoneView: {
    flexDirection: 'row',
    marginTop: '10',
    marginBottom: 'auto'
  },

  inputPhone: {
    width: '80%',
    marginBottom: 10,
    paddingLeft: 15,

      
  },
  textArea: {
    height: 'auto',
    width: '100%',
    marginBottom: -5,
  },

  countryPicker: {
    width: '100%',
  
  },
});
