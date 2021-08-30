import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '@screens/HomeScreen'
import React from 'react'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default HomeStack
