import React, { useCallback,  useState } from 'react'
import { View, Text, StatusBar, StyleSheet, Dimensions, Animated as RNAnimated } from 'react-native'
import Dial from './components/Dial'
import ToggleRow from './components/ToggleRow'
import {  FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import Slider from './components/Slider'
import { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SetSchedule from './components/SetSchedule'
import { useCardAnimation } from '@react-navigation/stack'

const { height } = Dimensions.get('window')

export default function ClimateControl({ navigation }) {
  const [temperature, setTemperature] = useState(14)

  const { current } = useCardAnimation()

  const slideInBottomValue = current.progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [100, 100, 0],
  })
  const nativeOpacityFadeIn = current.progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  })

  const mountUnmountAnimationStyles = {
    transform: [
      {
        translateY: slideInBottomValue,
      },
    ],
    opacity: nativeOpacityFadeIn,
  }

  React.useLayoutEffect(() => {
    const navigationOptions: StackNavigationOptions = {
      title: 'Climate Control',
      headerTitleStyle: {
        color: '#ed215b',
      },
      headerLeft: (props) => {
        return (
          <TouchableOpacity onPress={props.onPress} style={{ paddingLeft: 8 * 2 }}>
            <MaterialCommunityIcons name="keyboard-backspace" size={34} color="#fff" />
          </TouchableOpacity>
        )
      },
    }

    navigation.setOptions(navigationOptions)
  }, [])

  const onIncrement = useCallback(() => setTemperature((p) => p + 1), [])
  const onDecrement = useCallback(() => setTemperature((p) => p - 1), [])

  return (
    <>
      <StatusBar barStyle="light-content" />

      <View style={styles.root}>
        <RNAnimated.View
          style={[
            mountUnmountAnimationStyles,
            {
              position: 'absolute',
              top: height / 2 - 108,
              left: 8 * 4,
            },
          ]}
        >
          <Text style={styles.temperatureLabel}>TEMPERATURE, °C</Text>
          <Text style={styles.temperature}>{temperature}</Text>
        </RNAnimated.View>

        <RNAnimated.View style={mountUnmountAnimationStyles}>
          <SetSchedule />
        </RNAnimated.View>

        <RNAnimated.View style={mountUnmountAnimationStyles}>
          <ToggleRow />
        </RNAnimated.View>

        <Dial {...{ onIncrement, onDecrement }} />

        <RNAnimated.View style={mountUnmountAnimationStyles}>
          <Slider />
        </RNAnimated.View>

        <RNAnimated.View
          style={[
            mountUnmountAnimationStyles,
            {
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 8 * 6,
              marginBottom: 8 * 4,
            },
          ]}
        >
          <FontAwesome name="power-off" size={24} color="#ed215b" />
          <Text style={{ color: '#3f3f3f', paddingLeft: 8 * 2 }}>Hold to turn AC off</Text>
        </RNAnimated.View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 8 * 4,
  },
  temperatureLabel: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: 'bold',
  },
  temperature: {
    color: '#fff',
    fontSize: 120,
    fontWeight: 'bold',
    lineHeight: 130,
  },
  setScheduleLabel: {
    fontSize: 14,
    paddingLeft: 8,
    color: '#ed215b',
  },
})
