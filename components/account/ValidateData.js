// src/utils/validation.js

import { size } from 'lodash';
import { validateEmail } from '../../utils/helpers';

export const validateData = (formData, setErrorEmail, setErrorPassword, setErrorConfirm) => {
  setErrorConfirm("");
  setErrorPassword("");
  setErrorEmail("");
  let isValid = true;

  if (!validateEmail(formData.email)) {
    setErrorEmail("El email no es válido");
    isValid = false;
  }

  if (size(formData.password) < 6) {
    setErrorPassword("El Password debe de tener mínimo 6 caracteres");
    isValid = false;
  }

  if (size(formData.password) === 0) {
    setErrorPassword("El campo Password no puede estar vacío");
    isValid = false;
  }

  if (size(formData.confirmPassword) === 0) {
    setErrorConfirm("El campo no puede estar vacío");
    isValid = false;
  }

  if (formData.password !== formData.confirmPassword) {
    setErrorConfirm("Las contraseñas no coinciden");
    isValid = false;
  }

  return isValid;
};
