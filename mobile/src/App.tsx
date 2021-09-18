import Main from '@components/Main'
import { AuthProvider } from '@contexts/AuthContext'
import { registerRootComponent } from 'expo'
import * as React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from 'react-query'
import tw from 'tailwind-react-native-classnames'

interface IApp {}

const queryClient = new QueryClient()

const App: React.FC<IApp> = (props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <KeyboardAvoidingView
                style={tw`flex-1`}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
            >
                <AuthProvider>
                    <Main />
                </AuthProvider>
            </KeyboardAvoidingView>
        </QueryClientProvider>
    )
}

export default registerRootComponent(App)
