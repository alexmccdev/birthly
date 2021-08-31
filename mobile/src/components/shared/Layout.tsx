import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'

const Layout: React.FC = (props) => {
    return <SafeAreaView style={tw`flex flex-col flex-1 px-8`}>{props.children}</SafeAreaView>
}

export default Layout
