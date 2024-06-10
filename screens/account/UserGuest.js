import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Loading from '../../components/Loading'

export default function useGuest() {
  return (
    <View>
      <Text>useGuest...</Text>
      <Loading isVisible={true} text={"cargando..."}/>
    </View>
  )
}

const styles = StyleSheet.create({})