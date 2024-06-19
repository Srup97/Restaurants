// ValidateDataAddRestaurant.js
import { isEmpty, size } from 'lodash';
import { validateEmail } from '../../utils/helpers';

export const ValidateData = (formData, setFormDataError, locationRestaurant,imageSelected, toastRef) => {
    let isValid = true;
    let errors = {
      ErrorName: "",
      ErrorDescription: "",
      ErrorPhone: "",
      ErrorEmail: "",
      ErrorAddress: "",
    };
  
    if (isEmpty(formData.name)) {
      errors.ErrorName = "El nombre del restaurante es obligatorio.";
      isValid = false;
    }
  
    if (isEmpty(formData.address)) {
      errors.ErrorAddress = "La dirección del restaurante es obligatoria.";
      isValid = false;
    }
  
    if ( isEmpty(formData.email)) {
      errors.ErrorEmail = "El email del restaurante es obligatorio.";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.ErrorEmail = "El email no es válido.";
      isValid = false;
    }
  
    if (isEmpty(formData.phone)) {
      errors.ErrorPhone = "El teléfono del restaurante es obligatorio.";
      isValid = false;
    } else if (!/^\d+$/.test(formData.phone)) {
      errors.ErrorPhone = "El teléfono solo debe contener números.";
      isValid = false;
    }
  
    if (isEmpty(formData.description)) {
      errors.ErrorDescription = "La descripción del restaurante es obligatoria.";
      isValid = false;
    }
  
    if(!locationRestaurant){
    toastRef.current.show("Debes seleccionar una ubicación");    }

    if(size(imageSelected) === 0){
      toastRef.current.show("Debes seleccionar una imagen");
      isValid = false;   
    }
  

    setFormDataError(errors);
  
    return isValid;
  };
  