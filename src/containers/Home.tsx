import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, Linking } from 'react-native'
import HomeButton from '../components/HomeButton'

export default function Home({ navigation }) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: '#000',
          paddingVertical: 8 * 16,
        }}
      >
        <HomeButton
          inspirationUrl="https://dribbble.com/shots/5534531-Smart-Home-App-Thermostat"
          navigateTo="ClimateControl"
        >
          Climate Control
        </HomeButton>

        <HomeButton
          inspirationUrl="https://dribbble.com/shots/6346015-Restaurant-app"
          navigateTo="FoldingListRows.MenuCategories"
        >
          Folding List Rows
        </HomeButton>

        <HomeButton
          inspirationUrl="https://dribbble.com/shots/6390703-Liquid-Swipe-Interaction"
          navigateTo="LiquidSwipe.V1"
        >
          Liquid Swipe V1
        </HomeButton>
      </View>
    </>
  )
}
