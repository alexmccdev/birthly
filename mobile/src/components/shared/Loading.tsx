import React from 'react'
import { ActivityIndicator, Modal } from 'react-native'
import { globalStyles } from '../../styles/global'

const Loading: React.FC = () => {
    return (
        <Modal style={globalStyles.container}>
            <ActivityIndicator size="large" color="#00ff00" />
        </Modal>
    )
}

export default Loading
