import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface IHeader {
    pageTitle: string
}

const Header: React.FC<IHeader> = (props) => {
    return (
        <View style={styles.header}>
            <View style={styles.headerTitle}>
                <Text style={styles.headerText}>{props.pageTitle}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    },
    icon: {
        position: 'absolute',
        left: 16,
    },
    headerTitle: {
        flexDirection: 'row',
    },
    headerImage: {
        width: 26,
        height: 26,
        marginHorizontal: 10,
    },
})

export default Header
