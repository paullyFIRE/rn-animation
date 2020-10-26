import React, { useRef } from 'react'
import { Text, StatusBar, View, StyleSheet } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { call, event, useCode, Value } from 'react-native-reanimated'
import Svg, { Circle, G } from 'react-native-svg'

const AnimatedG = Animated.createAnimatedComponent(G)

export default function LiquidSwipeV1() {
  const posX = useRef(new Value(0))
  const posY = useRef(new Value(0))
  const gestureState = new Value(-1)

  const onGesture = event([
    {
      nativeEvent: {
        x: posX.current,
        y: posY.current,
        state: gestureState,
      },
    },
  ])

  useCode(() => call([posX.current, posY.current], console.log), [])

  const SVG_SIZE = 350

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <PanGestureHandler
        maxPointers={1}
        onHandlerStateChange={onGesture}
        onGestureEvent={onGesture}
      >
        <Animated.View>
          <Svg width={SVG_SIZE} height={SVG_SIZE} style={{ borderWidth: 2, borderColor: 'red' }}>
            <AnimatedG
              style={{ transform: [{ translateX: posX.current, translateY: posY.current }] }}
            >
              <Circle cx={0} cy={0} r={45} fill="red" />
            </AnimatedG>
          </Svg>
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}
