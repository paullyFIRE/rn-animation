import { useCardAnimation } from '@react-navigation/stack'
import React, { useRef } from 'react'
import { View, Animated as RNAnimated, StyleSheet, Dimensions } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { call, cond, eq, event, set, sub, useCode, Value } from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')

const colors = {
  navy1: '#1d1f47',
  navy2: '#303474',
  navy3: '#454b96',
  flatRed: '#ff6396',
  flatGreen: '#01ed86',
}

export default function BackgroundTiles({ translateY }) {
  const { current } = useCardAnimation()

  const columnOneWidth = width * 0.6
  const columnTwoWidth = width * 0.6
  const columnThreeWidth = width * 1.4

  const rowOneHeight = height * 0.8
  const rowTwoHeight = height * 0.3
  const rowThreeHeight = height * 0.4

  const rowOneTransitions = {
    transform: [
      {
        translateY: current.progress.interpolate({
          inputRange: [0, 0.5],
          outputRange: [-rowOneHeight, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  }

  const columnTwoTransitions = {
    transform: [
      {
        translateY: current.progress.interpolate({
          inputRange: [0.8, 1],
          outputRange: [-rowTwoHeight, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  }

  const columnThreeTransitions = {
    transform: [
      {
        translateY: current.progress.interpolate({
          inputRange: [0.8, 1],
          outputRange: [rowTwoHeight, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  }

  const gestureState = new Value(-1)

  function interaction(gestureTranslation, gestureState) {
    const dragging = new Value(0)
    const position = new Value(0)

    return cond(
      eq(gestureState, State.ACTIVE),
      [cond(eq(dragging, 0), [set(dragging, 1)]), set(position, gestureTranslation)],
      [set(dragging, 0), position]
    )
  }

  const translationY = interaction(translateY.current, gestureState)

  const onGestureEvent = event([
    {
      nativeEvent: {
        absoluteY: translateY.current,
        state: gestureState,
      },
    },
  ])

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onGestureEvent}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: '#868be2',
            transform: [{ translateY: cond(eq(translationY, 0), translationY, sub(translationY, height / 2)) }],
          },
        ]}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: [
              { rotate: '35deg' },
              {
                translateY: 0,
                translateX: -width * 0.8,
              },
              {
                skewX: '-45deg',
                skewY: '35deg',
              },
            ],
            flexDirection: 'row',
          }}
        >
          <View style={{ width: columnOneWidth, flexDirection: 'column' }}>
            <RNAnimated.View
              style={[rowOneTransitions, { backgroundColor: colors.navy3, height: rowOneHeight }]}
            />
            <RNAnimated.View
              style={[
                columnTwoTransitions,
                { backgroundColor: colors.navy3, height: rowTwoHeight },
              ]}
            />
            <RNAnimated.View
              style={[
                columnThreeTransitions,
                { backgroundColor: colors.navy1, height: rowThreeHeight },
              ]}
            />
          </View>

          <View style={{ width: columnTwoWidth, flexDirection: 'column' }}>
            <RNAnimated.View
              style={[rowOneTransitions, { backgroundColor: colors.navy2, height: rowOneHeight }]}
            />
            <RNAnimated.View
              style={[
                columnTwoTransitions,
                { backgroundColor: colors.navy3, height: rowTwoHeight },
              ]}
            />
            <RNAnimated.View
              style={[
                columnThreeTransitions,
                { backgroundColor: colors.navy1, height: rowThreeHeight },
              ]}
            />
          </View>

          <View style={{ width: columnThreeWidth, flexDirection: 'column' }}>
            <RNAnimated.View
              style={[
                rowOneTransitions,
                { backgroundColor: colors.flatGreen, height: rowOneHeight },
              ]}
            />

            <RNAnimated.View
              style={[
                columnTwoTransitions,
                { backgroundColor: colors.flatRed, height: rowTwoHeight },
              ]}
            />
            <RNAnimated.View
              style={[
                columnThreeTransitions,
                { backgroundColor: colors.navy1, height: rowThreeHeight },
              ]}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  )
}
