import Button from '@components/shared/Button'
import Layout from '@components/shared/Layout'
import { useAuth } from '@contexts/AuthContext'
import React from 'react'
import { ScrollView, Text } from 'react-native'

interface IHomeScreen {}

const HomeScreen: React.FC<IHomeScreen> = () => {
    const { user, logout } = useAuth()

    return (
        <Layout>
            <Button onPress={() => logout()} text="Logout" />
            <Text>{JSON.stringify({ user }, null, 2)}</Text>
            <ScrollView></ScrollView>
        </Layout>
    )
}

export default HomeScreen
