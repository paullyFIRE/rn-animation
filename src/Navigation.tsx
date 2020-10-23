import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'

import ClimateControl from './containers/ClimateControl'

const Stack = createStackNavigator()

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ClimateControl"
          component={ClimateControl}
          options={{
            title: '',
            headerTransparent: true
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
