import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, Linking } from 'react-native'

export default function HomeButton({ navigateTo = 'Home', inspirationUrl = '', children }) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onLongPress={() => inspirationUrl && Linking.openURL(inspirationUrl)}
      activeOpacity={0.35}
      style={{
        marginTop: 8 * 4,
        paddingVertical: 8 * 2,
        paddingHorizontal: 8 * 4,
        borderColor: '#ed215b',
        borderWidth: 2,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => navigation.navigate(navigateTo)}
    >
      <Text style={{ fontSize: 22, color: '#ed215b' }}>{children}</Text>
    </TouchableOpacity>
  )
}
