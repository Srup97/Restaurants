import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { closeSesion, getCurrentUser } from '../../utils/actions'
import Toast from 'react-native-easy-toast'
import Loading from '../../components/Loading'
import InfoUser from '../../components/account/InfoUser'
import AccountOptions from '../../components/account/AccountOptions'

export default function userLogged() {
  const toastRef = useRef()
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [loadingText, setloadingText] = useState(" ")
  const [user, setUser] = useState(null)
  const [reloadUser, setReloadUser] = useState(false)

  useEffect(() => {
    setUser(getCurrentUser())
    setReloadUser(false)
  }, [reloadUser])

  return (
    <View style={styles.container}>
      {user && (
        <View>
          <InfoUser
            user={user}
            setLoading={setLoading}
            setloadingText={setloadingText}
          />
        </View>
      )}
      <AccountOptions
        user={user}
        toastRef={toastRef}
        setReloadUser={setReloadUser}
      />
      <View style={styles.footer}>
        <Button
          title="Cerrar Sesión"
          buttonStyle={styles.btnCloseSesion}
          titleStyle={styles.btnCloseSesionTitle}
          onPress={() => {
            closeSesion();
            navigation.navigate("restaurants")
          }}
        />
      </View>
      <Toast ref={toastRef} position='center' opacity={0.9} />
      <Loading isVisible={loading} text={loadingText} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  footer: {
    paddingBottom: 30,
  },
  btnCloseSesion: {
    borderRadius: 10,
    marginTop: 50,
    backgroundColor: '#0066b5',
    borderTopWidth: 1,
    borderTopColor: '#442484',
    borderBottomWidth: 1, 
    borderBottomColor: '#442484',
    paddingVertical: 10,
  },
  btnCloseSesionTitle: {
    color: '#ffffff',
  },
});
