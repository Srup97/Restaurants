import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { closeSesion } from '../../utils/actions'

export default function userLogged() {
  const navigation = useNavigation()
  return (
    <View>
      <Text>userLogged...</Text>
      <Button
        title="Cerrar Session"
        onPress={() => {
          closeSesion();
          navigation.navigate("restaurants")}
           }
        />
    </View>
  )
}

const styles = StyleSheet.create({})