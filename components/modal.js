import { StyleSheet} from 'react-native'
import React from 'react'
import { Overlay } from 'react-native-elements'

export default function modal({isVisible, setVisible, children }) {
  return (
    <Overlay
        isVisible={isVisible}
    >
      {
        children
      }
    </Overlay>
  )
}

const styles = StyleSheet.create({})