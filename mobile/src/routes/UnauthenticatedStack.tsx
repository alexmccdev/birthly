import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '@screens/LoginScreen'
import React from 'react'

const Stack = createNativeStackNavigator()

const UnauthenticatedStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default UnauthenticatedStack
