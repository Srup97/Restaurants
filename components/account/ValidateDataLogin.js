// src/utils/validation.js

import { size } from 'lodash';
import { validateEmail } from '../../utils/helpers';

export const validateDataLogin = (formData, setErrorEmail, setErrorPassword) => {
  setErrorPassword("");
  setErrorEmail("");
  let isValid = true;

  if (!validateEmail(formData.email)) {
    setErrorEmail("El email no es válido");
    isValid = false;
  }

  if (size(formData.password) === 0) {
    setErrorPassword("El campo Password no puede estar vacío");
    isValid = false;
  }

  return isValid;
};
