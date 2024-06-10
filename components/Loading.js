import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Overlay } from 'react-native-elements'

export default function Loading({
    isVisible, text
}) {
  return (
    <Overlay
        isVisible={{ isVisible}}
        windowsBackgroundColor="rgba(0,0,0,0.5)"
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlay}
    >
        <ActivityIndicator>
        {
        text && <Text>{text}</Text>
        }
        </ActivityIndicator>
        
       </Overlay>
  )
}

const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 100,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#442484",
        borderWidth: 2,
        borderRadius: 10
    }
})