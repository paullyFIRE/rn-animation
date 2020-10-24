import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ClimateControl from './containers/ClimateControl'
import Home from './containers/Home'

const Stack = createStackNavigator()

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: '',
            headerTransparent: true
          }}
        />
        <Stack.Screen
          name="ClimateControl"
          component={ClimateControl}
          options={{
            title: '',
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
