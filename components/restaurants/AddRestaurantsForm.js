import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';
import { ValidateData } from './ValidateDataAddRestaurant';

export default function AddRestaurantsForm({ toastRef, setLoading, navigation }) {

    const [formData, setFormData] = useState(defaultFormData());
    const [formDataError, setFormDataError] = useState(defaultFormDataError())

    const addRestaurants = () => {
        console.log(formData);
        console.log('Agregando Restaurante');
        // Aquí puedes agregar el código para guardar los datos del restaurante
        if (!ValidateData(formData, setFormDataError)) {
            return
        }
      };

  return (
    <View style={styles.viewContainer}>
      <FormAdd formData={formData} setFormData={setFormData} formDataError={formDataError} setFormDataError={setFormDataError} />
      <Button
        title="Crear Restaurante"
        onPress={addRestaurants}
        buttonStyle={styles.btnAddRestaurant}
        containerStyle={styles.container}
      />
    </View>
  );
}

function FormAdd({ formData, setFormData, formDataError, setFormDataError}) {

    const onChange = (e, type) => {

        setFormData({
            ...formData,
            [type]: e.nativeEvent.text
        })

    }



  return (
    <View style={styles.viewForm}>
      <Input
        type="text"
        placeholder="Nombre del Restaurante"
        containerStyle={styles.input}
        defaultValue={formData.name}
        onChange={(e) => onChange(e, "name")}
        errorMessage={formDataError.ErrorName}
      />
      <Input
        type="text"
        placeholder="Dirección del Restaurante"
        containerStyle={styles.input}
        defaultValue={formData.address}
        onChange={(e) => onChange(e, "address")}
        errorMessage={formDataError.ErrorAddress}
      />
      <Input
        type="text"
        keyboardType="email-address"
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
              callingCode: country.callingCode[0]
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

const styles = StyleSheet.create({
  viewContainer: {
    height: '100%',
  },
  viewForm: {
    marginHorizontal: 10,
  },

  textArea: {
    height: 100,
    width: '100%'
},
 
  phoneView: {
    flexDirection: 'row',
    width: '80%',
 
  },

  inputPhone: {
    width: '90%',
   paddingLeft: 10,
   marginTop: -5 
  },
  
  btnAddRestaurant: {
    height: 50,
    margin: 20,
    backgroundColor: "#442484"
  },

  container: {
    width: '100%',
    margin: 0,
    padding: 0
  },

  input: {
    marginBottom: 20
  },
  


  countryPicker: {
    width: '20%',
    marginLeft: 10 // Ajusta el margen izquierdo del CountryPicker
  }
});
