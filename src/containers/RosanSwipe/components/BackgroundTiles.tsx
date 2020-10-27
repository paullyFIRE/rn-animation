import { useCardAnimation } from '@react-navigation/stack'
import React from 'react'
import { View, Animated as RNAnimated, StyleSheet, Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')

const colors = {
  navy1: '#1d1f47',
  navy2: '#303474',
  navy3: '#454b96',
  flatRed: '#ff6396',
  flatGreen: '#01ed86',
}

export default function BackgroundTiles({ translateY = 0 }) {
  const { current } = useCardAnimation()

  current.progress.addListener(console.log)

  const columnOneWidth = width * 0.6
  const columnTwoWidth = width * 0.6
  const columnThreeWidth = width * 1.4

  const rowOneHeight = height * 0.8
  const rowTwoHeight = height * 0.3
  const rowThreeHeight = height * 0.4

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: '#868be2',
          transform: [{ translateY: translateY }],
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
            style={{
              backgroundColor: colors.navy3,
              height: rowOneHeight,
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0.5, 0.75, 1],
                    outputRange: [-200, -120, 0],
                  }),
                },
              ],
            }}
          />
          <View style={{ backgroundColor: colors.navy3, height: rowTwoHeight }} />
          <View style={{ backgroundColor: colors.navy1, height: rowThreeHeight }} />
        </View>

        <View style={{ width: columnTwoWidth, flexDirection: 'column' }}>
          <RNAnimated.View
            style={{
              backgroundColor: colors.navy2,
              height: rowOneHeight,
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0.5, 0.75, 1],
                    outputRange: [-200, -80, 0],
                  }),
                },
              ],
            }}
          />
          <View style={{ backgroundColor: colors.navy3, height: rowTwoHeight }} />
          <View style={{ backgroundColor: colors.navy1, height: rowThreeHeight }} />
        </View>

        <View style={{ width: columnThreeWidth, flexDirection: 'column' }}>
          <RNAnimated.View
            style={{
              backgroundColor: colors.flatGreen,
              height: rowOneHeight,
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0.5, 0.75, 1],
                    outputRange: [-200, -30, 0],
                  }),
                },
              ],
            }}
          />
          <RNAnimated.View
            style={{
              backgroundColor: colors.flatRed,
              height: rowTwoHeight,
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0.5, 0.75, 1],
                    outputRange: [200, 80, 0],
                  }),
                },
              ],
            }}
          />
          <RNAnimated.View
            style={{
              backgroundColor: colors.navy1,
              height: rowThreeHeight,
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0.5, 0.75, 1],
                    outputRange: [200, 120, 0],
                  }),
                },
              ],
            }}
          />
        </View>
      </Animated.View>
    </Animated.View>
  )
}
