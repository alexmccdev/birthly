import { API_URL } from '@env'
import { deleteAllTokens, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '@utils/AsyncStorage'
import axios from 'axios'

export const authClient = axios.create({
    baseURL: `${API_URL}/auth`,
})

export const apiClient = axios.create({
    baseURL: `${API_URL}`,
})

// Append access token to every api call
apiClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            Authorization: 'Bearer ' + (await getAccessToken()),
        },
    }
})

// If access token has expired, silently request new access token with refresh token
apiClient.interceptors.response.use(
    async (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true
            const currentRefreshToken = await getRefreshToken()

            if (currentRefreshToken) {
                const {
                    data: { accessToken, refreshToken },
                } = await authClient.post('/token', { refreshToken: currentRefreshToken })

                await setAccessToken(accessToken)
                await setRefreshToken(refreshToken)

                return apiClient(originalRequest)
            }
        }

        await deleteAllTokens()
        return Promise.reject(error)
    }
)
