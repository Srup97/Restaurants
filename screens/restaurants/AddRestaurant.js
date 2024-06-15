import { StyleSheet, Text, View } from 'react-native'
import React, {useRef, useState} from 'react'
import Toast from 'react-native-easy-toast'
import AddRestaurantsForm from '../../components/restaurants/AddRestaurantsForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loading from '../../components/Loading'

export default function AddRestaurant({
    navigation
}) {
    const [loading, setLoading] = useState(false)
    const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>

        <AddRestaurantsForm
            toastRef={toastRef}
            setLoading={setLoading}
            navigation = {navigation}
        />
        
        <Loading isVisible={loading} text="Creando Restaurante"/>
        <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})