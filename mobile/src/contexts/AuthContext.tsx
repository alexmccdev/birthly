import { apiClient, authClient } from '@utils/ApiClient'
import { deleteAllTokens, getRefreshToken, setAccessToken, setRefreshToken } from '@utils/AsyncStorage'
import React, { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const AuthContext = React.createContext({
    user: null,
    isLoading: false,
    login: (credentials: { email: string; password: string }) => {},
    logout: () => {},
})

const getUser = async () => {
    try {
        const { data } = await apiClient.get('/users')

        return data
    } catch {
        return null
    }
}

const logoutUser = async () => {
    await authClient.post('/logout', { refreshToken: await getRefreshToken() })
}

const loginUser = async (credentials: { email: string; password: string }) => {
    const {
        data: { accessToken, refreshToken },
    } = await authClient.post('/login', credentials)

    return { accessToken, refreshToken }
}

const AuthProvider = (props: any) => {
    const queryClient = useQueryClient()

    // Get user
    const { isLoading, data: user } = useQuery('users', getUser)

    // Login
    const { mutate: login } = useMutation(loginUser, {
        onSuccess: async (tokens) => {
            await setAccessToken(tokens.accessToken)
            await setRefreshToken(tokens.refreshToken)
            await queryClient.invalidateQueries('users')
        },
    })

    // Logout
    const { mutate: logout } = useMutation(logoutUser, {
        onSuccess: async () => {
            await deleteAllTokens()
            await queryClient.invalidateQueries('users')
        },
    })

    return <AuthContext.Provider value={{ user, isLoading, login, logout }} {...props} />
}

const useAuth = () => {
    return useContext(AuthContext)
}

export { AuthProvider, useAuth }
