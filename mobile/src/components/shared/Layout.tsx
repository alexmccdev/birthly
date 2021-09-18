import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'tailwind-react-native-classnames'

const Layout: React.FC = (props) => {
    return <ScrollView style={tw`flex-1 p-8`}>{props.children}</ScrollView>
}

export default Layout
