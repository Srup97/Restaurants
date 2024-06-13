import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { map } from 'lodash';
import { Icon, ListItem } from 'react-native-elements';
import Modal from '../modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';

export default function AccountOptions({
    user, toastRef, setReloadUser
}) {
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const generateOptions = () => {
        return [
            {
                title: "Cambiar Nombre de Usuario",
                iconNameLeft: "account-circle",
                iconColorLeft: "#4285F4",
                iconNameRight: "chevron-right",
                iconColorRight: "#4285F4",
                onPress: () => selectedComponent("displayName")
            },
            {
                title: "Cambiar Correo Electrónico",
                iconNameLeft: "email",
                iconColorLeft: "#34A853",
                iconNameRight: "chevron-right",
                iconColorRight: "#34A853",
                onPress: () => selectedComponent("email")
            },
            {
                title: "Cambiar Contraseña",
                iconNameLeft: "lock-reset",
                iconColorLeft: "#FBBC05",
                iconNameRight: "chevron-right",
                iconColorRight: "#FBBC05",
                onPress: () => selectedComponent("password")
            },
            {
                title: "Configuración de Privacidad",
                iconNameLeft: "shield-account",
                iconColorLeft: "#8A2BE2",
                iconNameRight: "chevron-right",
                iconColorRight: "#8A2BE2",
                onPress: () => selectedComponent("privacy")
            },
            {
                title: "Eliminar Cuenta",
                iconNameLeft: "account-remove",
                iconColorLeft: "#FF4500",
                iconNameRight: "chevron-right",
                iconColorRight: "#FF4500",
                onPress: () => selectedComponent("deleteAccount")
            },
            
            
        ];
    };

    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName={user.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                );
                break;

            case "email":
                setRenderComponent(
                    <ChangeEmailForm
                        email={user.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    
                    />
                );
                break;

            case "password":
                setRenderComponent(
                    <Text>Cambiar Password</Text>
                );
                break;
        }
        setShowModal(true);
    };

    const menuOptions = generateOptions();

    return (
      <ScrollView>
        <View style={styles.container}>
          {map(menuOptions, (menu, index) => (
            <ListItem
              key={index}
              style={styles.menuItem}
              containerStyle={styles.listItemContainer}
              onPress={menu.onPress}
            >
              <Icon
                type="material-community"
                name={menu.iconNameLeft}
                color={menu. iconColorLeft}
                containerStyle={styles.iconLeft}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.listItemTitle}>
                  {menu.title}
                </ListItem.Title>
              </ListItem.Content>
              <Icon
                type="material-community"
                name={menu.iconNameRight}
                color={menu.iconColorRight}
                containerStyle={styles.iconRight}
              />
            </ListItem>
          ))}
          <Modal isVisible={showModal} setVisible={setShowModal}>
            {renderComponent}
          </Modal>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
    },
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    listItemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    iconLeft: {
        marginRight: 10,
    },
    iconRight: {
        marginLeft: 10,
    }
});
