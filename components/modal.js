import { StyleSheet } from 'react-native';
import React from 'react';
import { Overlay } from 'react-native-elements';

export default function Modal({ isVisible, setVisible, size, children }) {
  const overlayStyles = [
    styles.overlay,
    size && { width: size.width, height: size.height },
  ];

  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={overlayStyles}
      onBackdropPress={() => setVisible(false)}
    >
      {children}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
   
    paddingHorizontal: 10,
    paddingVertical: 20, // Ajusta este valor según sea necesario
    borderRadius: 15,
  },
});
