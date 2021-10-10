import { Birth } from 'prisma'
import React from 'react'
import { Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

interface IBirthCardProps {
    birth: Birth
}

const BirthCard: React.FC<IBirthCardProps> = (props) => {
    return (
        <View style={tw`border rounded-md p-8 w-full bg-white mb-4`}>
            <Text>{JSON.stringify(props.birth, null, '\t')}</Text>
        </View>
    )
}

export default BirthCard
