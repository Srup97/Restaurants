import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TestAsyncStorage() {
    useEffect(() => {
        const testAsyncStorage = async () => {
            try {
                await AsyncStorage.setItem('testKey', 'testValue');
                const value = await AsyncStorage.getItem('testKey');
                console.log('Test Value:', value); // Debería imprimir 'testValue'
            } catch (error) {
                console.error(error);
            }
        };
        testAsyncStorage();
    }, []);

    return (
        <View>
            <Text>Check console for AsyncStorage test</Text>
        </View>
    );
}
