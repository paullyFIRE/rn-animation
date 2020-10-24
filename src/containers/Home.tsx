import React from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'

export default function Home({ navigation }) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View
        style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#000', paddingVertical: 8 * 16 }}
      >
        <TouchableOpacity
          activeOpacity={0.35}
          style={{
            paddingVertical: 8 * 2,
            paddingHorizontal: 8 * 4,
            borderColor: '#ed215b',
            borderWidth: 2,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('ClimateControl')}
        >
          <Text style={{ fontSize: 22, color: '#ed215b' }}>Climate Control</Text>
        </TouchableOpacity>
        <TouchableOpacity
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
          onPress={() => navigation.navigate('FoldingListRows')}
        >
          <Text style={{ fontSize: 22, color: '#ed215b' }}>Folding List Rows</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
