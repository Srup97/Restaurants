import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Input, Icon, Button } from 'react-native-elements';
import { validateDataLogin } from './ValidateDataLogin';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading';
import { loginWithEmailPassword, resetPassword } from '../../utils/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        loadUserEmail();
    }, []);

    const loadUserEmail = async () => {
        try {
            const email = await AsyncStorage.getItem('userEmail');
            if (email) {
                setFormData((prevData) => ({ ...prevData, email }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onChange = (e, type) => {
        setFormData({
            ...formData,
            [type]: e.nativeEvent.text,
        });
    };

    const loginUser = async () => {
        if (!validateDataLogin(formData, setErrorEmail, setErrorPassword)) {
            return;
        }

        setLoading(true);
        const result = await loginWithEmailPassword(formData.email, formData.password);
        setLoading(false);
        if (!result.statusResponse) {
            setErrorEmail(result.error);
            setErrorPassword(result.error);
            return;
        }

        try {
            await AsyncStorage.setItem('userEmail', formData.email);
        } catch (error) {
            console.log("AsyncStorage error: ", error);
        }

        navigation.navigate('account');
    };

    const handleResetPassword = async () => {
        if (!formData.email) {
            Alert.alert("Error", "Por favor ingrese su correo electrónico para restablecer la contraseña.");
            return;
        }
        
        setLoading(true);
        const result = await resetPassword(formData.email);
        setLoading(false);
        
        if (result.statusResponse) {
            Alert.alert("Restablecimiento de Contraseña", "Se ha enviado un correo para restablecer la contraseña.");
        } else {
            Alert.alert("Error", result.error);
        }
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder='Ingrese su email'
                containerStyle={styles.input}
                onChange={(e) => onChange(e, 'email')}
                keyboardType='email-address'
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                placeholder='Ingrese su contraseña'
                secureTextEntry={!passwordVisible}
                onChange={(e) => onChange(e, 'password')}
                keyboardType='default'
                errorMessage={errorPassword}
                defaultValue={formData.password}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                }
                containerStyle={styles.input}
            />
            <Button
                title="Iniciar Sesión"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={loginUser}
            />
            <Text
                style={styles.forgotPassword}
                onPress={handleResetPassword}
            >
                He olvidado mi contraseña
            </Text>
            <Loading isVisible={loading} text="Iniciando Sesión" />
        </View>
    );
}

const defaultFormValues = () => {
    return {
        email: "",
        password: "",
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    input: {
        width: '100%',
        marginBottom: 10,
    },
    btnContainer: {
        marginTop: 5,
        width: '95%',
        alignSelf: 'center',
    },
    btn: {
        backgroundColor: '#442484',
    },
    forgotPassword: {
        marginTop: 15,
        color: '#442484',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});
