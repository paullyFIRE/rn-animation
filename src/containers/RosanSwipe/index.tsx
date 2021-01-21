import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { call, Clock, Easing, event, useCode, Value } from 'react-native-reanimated'
import BackgroundTiles from './components/BackgroundTiles'

export default function RosanSwipe() {
  const translateY = useRef(new Value(0))

  useEffect(() => {
    Animated.timing(
      new Clock(),
      {
        frameTime: new Value(0),
        finished: new Value(0),
        time: new Value(0),
        position: translateY.current,
      },
      {
        duration: 2500,
        toValue: -250,
        easing: Easing.inOut(Easing.ease),
      }
    )
  }, [])

  return <BackgroundTiles {...{ translateY }} />
}
