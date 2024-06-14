// src/utils/validation.js

import { isEmpty, size } from 'lodash';
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


export const validatePassword = (formData,setErrorNewPassword, setErrorOldPassword, setErrorConfirmPassword) => {
  setErrorConfirmPassword("");
  setErrorOldPassword("");
  setErrorNewPassword("");
  let isValid = true;
 
 
  if (size(formData.newPassword) < 6) {
    setErrorNewPassword("El Password debe de tener mínimo 6 caracteres");
    isValid = false;
  }

  if (size(formData.confirmPassword) < 6) {
    setErrorConfirmPassword("El Password debe de tener mínimo 6 caracteres");
    isValid = false;
  }
  
  if (size(formData.oldPassword) < 6) {
    setErrorOldPassword("El Password debe de tener mínimo 6 caracteres");
    isValid = false;
  }

  if (isEmpty(formData.oldPassword)) {
    setErrorOldPassword("El campo no puede estar vacío");
    isValid = false;
  }
  

  if (isEmpty(formData.confirmPassword)) {
    setErrorConfirmPassword("El campo no puede estar vacío");
    isValid = false;
  }
  
  if (isEmpty(formData.newPassword)) {
    setErrorNewPassword("El campo no puede estar vacío");
    isValid = false;
  }
  
  if (formData.newPassword !== formData.confirmPassword) {
    setErrorNewPassword("Las contraseñas no coinciden");
    setErrorConfirmPassword("Las contraseñas no coinciden");

    isValid = false;
  }
  
  if (formData.newPassword === formData.oldPassword && !isEmpty(formData.newPassword)) {
    setErrorNewPassword("Ingresse Una nueva Contraseña");
    setErrorOldPassword("Ingresse Una nueva Contraseña");

    isValid = false;
  }

  return isValid;
};
