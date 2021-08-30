import AsyncStorage from '@react-native-async-storage/async-storage'

export const setAccessToken = async (accessToken: string) => {
    await AsyncStorage.setItem('accessToken', accessToken)
}

export const getAccessToken = async () => {
    return await AsyncStorage.getItem('accessToken')
}

export const deleteAccessToken = async () => {
    await AsyncStorage.removeItem('accessToken')
}

export const setRefreshToken = async (refreshToken: string) => {
    await AsyncStorage.setItem('refreshToken', refreshToken)
}

export const getRefreshToken = async () => {
    return await AsyncStorage.getItem('refreshToken')
}

export const deleteRefreshToken = async () => {
    await AsyncStorage.removeItem('refreshToken')
}

export const deleteAllTokens = async () => {
    await deleteAccessToken()
    await deleteRefreshToken()
}
