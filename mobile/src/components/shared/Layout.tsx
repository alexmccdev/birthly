import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../styles/global'

const Layout: React.FC = (props) => {
    return <View style={globalStyles.container}>{props.children}</View>
}

export default Layout
