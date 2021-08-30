import Main from '@components/Main'
import { AuthProvider } from '@contexts/AuthContext'
import { registerRootComponent } from 'expo'
import * as React from 'react'
import 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from 'react-query'

interface IApp {}

const queryClient = new QueryClient()

const App: React.FC<IApp> = (props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Main />
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default registerRootComponent(App)
