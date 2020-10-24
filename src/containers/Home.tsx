import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          paddingVertical: 8 * 2,
          paddingHorizontal: 8 * 4,
          borderColor: 'lightblue',
          borderWidth: 2,
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate('ClimateControl')}
      >
        <Text style={{ fontSize: 22 }}>Climate Control</Text>
      </TouchableOpacity>
    </View>
  )
}
