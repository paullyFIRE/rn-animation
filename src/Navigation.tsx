import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ClimateControl from './containers/ClimateControl'
import FoldingListRows from './containers/FoldingListRows'
import Home from './containers/Home'

const Stack = createStackNavigator()

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: '',
            headerTransparent: true,
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 0.75, 1],
                  outputRange: [0, 0, 1],
                }),
              },
            }),
          }}
        />
        <Stack.Screen name="FoldingListRows" component={FoldingListRows} options={{
          headerTransparent: true,
          title: '',
          headerBackTitleVisible: false,
          headerTintColor: '#615798',
          headerLeftContainerStyle: {
            paddingLeft: 8 * 2
          },
        }}/>
        <Stack.Screen
          name="ClimateControl"
          component={ClimateControl}
          options={{
            title: 'Climate Control',
            headerTitleStyle: {
              color: '#ed215b',
            },
            headerTransparent: true,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 250,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 250,
                },
              },
            },
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress,
              },
            }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
