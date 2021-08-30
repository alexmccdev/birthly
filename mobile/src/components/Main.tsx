import Loading from '@components/shared/Loading'
import { useAuth } from '@contexts/AuthContext'
import HomeStack from '@routes/HomeStack'
import UnauthenticatedStack from '@routes/UnauthenticatedStack'
import React from 'react'
import 'react-native-gesture-handler'

const Main: React.FC = () => {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <Loading />
    }

    return user ? <HomeStack /> : <UnauthenticatedStack />
}

export default Main
