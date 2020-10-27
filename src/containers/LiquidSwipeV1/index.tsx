import React, { useRef } from 'react'
import { Text, StatusBar, View, StyleSheet } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { call, concat, event, useCode, Value } from 'react-native-reanimated'
import Svg, { Circle, G, Path } from 'react-native-svg'

import { path as d3Path } from 'd3-path'
console.log('d3Path: ', d3Path)

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedG = Animated.createAnimatedComponent(G)

export default function LiquidSwipeV1() {
  const posX = useRef(new Value(200))
  const posY = useRef(new Value(200))

  Animated.addWhitelistedNativeProps([
    'd': true
  ])

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

  const SVG_SIZE = 400

  const testAreaPath1 = d3Path()
  testAreaPath1.moveTo(0, SVG_SIZE)
  testAreaPath1.lineTo(SVG_SIZE, SVG_SIZE)

  const testAreaPath2 = d3Path()
  testAreaPath2.lineTo(0, SVG_SIZE)

  console.log('testAreaPath: ', testAreaPath1.toString())

  const pathString = concat('M0,400L400,400', 'L', posX.current, posY.current, 'L0,400')

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
              <Circle cx={0} cy={0} r={65} fill="red" />
            </AnimatedG>

            <AnimatedPath d={pathString} stroke="red" strokeWidth={4} fill="blue" />
          </Svg>
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}
