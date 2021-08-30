import Button from '@components/shared/Button'
import Layout from '@components/shared/Layout'
import { useAuth } from '@contexts/AuthContext'
import { globalStyles } from '@styles/global'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

const LoginScreen: React.FC = () => {
    const { login } = useAuth()

    const [email, setEmail] = useState('alexmcc.dev@gmail.com')
    const [password, setPassword] = useState('test')

    return (
        <Layout>
            <TextInput
                style={globalStyles.input}
                defaultValue={email}
                placeholder="email"
                onChangeText={(email: string) => setEmail(email)}
            />
            <TextInput
                style={globalStyles.input}
                defaultValue={password}
                placeholder="password"
                onChangeText={(password: string) => setPassword(password)}
                textContentType="password"
            />
            <Button onPress={() => login({ email, password })} text="login" />
        </Layout>
    )
}

export default LoginScreen
