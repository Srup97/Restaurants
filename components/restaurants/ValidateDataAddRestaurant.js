// ValidateDataAddRestaurant.js
import { validateEmail } from '../../utils/helpers';

export const ValidateData = (formData, setFormDataError) => {
    let isValid = true;
    let errors = {
      ErrorName: "",
      ErrorDescription: "",
      ErrorPhone: "",
      ErrorEmail: "",
      ErrorAddress: "",
    };
  
    if (formData.name.trim() === "") {
      errors.ErrorName = "El nombre del restaurante es obligatorio.";
      isValid = false;
    }
  
    if (formData.address.trim() === "") {
      errors.ErrorAddress = "La dirección del restaurante es obligatoria.";
      isValid = false;
    }
  
    if (formData.email.trim() === "") {
      errors.ErrorEmail = "El email del restaurante es obligatorio.";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.ErrorEmail = "El email no es válido.";
      isValid = false;
    }
  
    if (formData.phone.trim() === "") {
      errors.ErrorPhone = "El teléfono del restaurante es obligatorio.";
      isValid = false;
    } else if (!/^\d+$/.test(formData.phone)) {
      errors.ErrorPhone = "El teléfono solo debe contener números.";
      isValid = false;
    }
  
    if (formData.description.trim() === "") {
      errors.ErrorDescription = "La descripción del restaurante es obligatoria.";
      isValid = false;
    }
  
    setFormDataError(errors);
  
    return isValid;
  };
  