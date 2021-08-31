import React from 'react'
import { GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

interface IButton {
    onPress: (e: GestureResponderEvent) => void
    text: string
}

const Button: React.FC<IButton> = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={tw`rounded-md p-8 w-full bg-green-500`}>
                <Text style={tw`text-white font-bold text-center uppercase`}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button
