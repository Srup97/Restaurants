import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { map } from 'lodash';
import { Icon, ListItem } from 'react-native-elements';
import Modal from '../modal';
export default function AccountOptions({
    user, toastRef
}) {

    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)


const generateOptions = () => {
    return [
        {
            title : "Cambiar Nombres y Apellidos",
            iconNameLeft: "account-circle",
            iconColorLeft: "#a7bfd3",
            iconNameRight: "chevron-right",
            iconColorRight: "#a7bfd3",
            onPress: () => selectedComponent("displayName")
        },
        {
            title : "Cambiar Email",
            iconNameLeft: "at",
            iconColorLeft: "#a7bfd3",
            iconNameRight: "chevron-right",
            iconColorRight: "#a7bfd3",
            onPress: () => selectedComponent("email")
        },
        {
            title : "Cambiar Contraseña",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#a7bfd3",
            iconNameRight: "chevron-right",
            iconColorRight: "#a7bfd3",
            onPress: () => selectedComponent("password")
        },
    ]
}
const selectedComponent = (key) => {
    switch (key) {
        case "displayName":
            setRenderComponent(
               <Text>Cambiar nombre</Text>
            )
            break;

        case "email":
            setRenderComponent(
                <Text>Cambiar Email</Text>

            )
            break;
            
        case "password":
            setRenderComponent(
                <Text>Cambiar Password</Text>

            )
            break;
    }
    setShowModal(true)
}

const menuOptions = generateOptions();

return (
    <View>
        {
            map(menuOptions, (menu, index) => (
                <ListItem
                key={index}
                style={styles.menuItem}
                onPress={menu.onPress}
                >
                    <Icon
                    type='material-comunity'
                    name={menu.iconNameLeft}
                    color={menu.iconColorLeft}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{menu.title}</ListItem.Title>
                    </ListItem.Content>
                    <Icon
                    type='material-comunity'
                    name={menu.iconNameRight}
                    color={menu.iconColorRight}
                    />
                </ListItem>
            ))
        }
        <Modal isVisible={showModal} setVisible={setShowModal}>
            <Text>Hola</Text>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#a7bfd3"
    }

})