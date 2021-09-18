import Button from '@components/shared/Button'
import Layout from '@components/shared/Layout'
import Loading from '@components/shared/Loading'
import { useAuth } from '@contexts/AuthContext'
import { apiClient } from '@utils/ApiClient'
import { Birth } from 'prisma'
import React from 'react'
import { ScrollView, Text } from 'react-native'
import { useQuery } from 'react-query'

interface IHomeScreen {}

const HomeScreen: React.FC<IHomeScreen> = () => {
    const { user, logout } = useAuth()
    const { data, isLoading } = useQuery('/births', async () => {
        const { data } = await apiClient.get(`/births`)
        return data as Birth[]
    })

    if (isLoading || !data) {
        return <Loading />
    }

    return (
        <Layout>
            <Text>Logged in as {user.name || user.email}</Text>
            <Button text="Logout" onPress={() => logout()}></Button>
            <ScrollView>
                {data.map((birth) => {
                    return <Text>{birth.date}</Text>
                })}
            </ScrollView>
        </Layout>
    )
}

export default HomeScreen
