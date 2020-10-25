import { useCardAnimation } from '@react-navigation/stack'
import React, { useRef } from 'react'
import { View, Text, Dimensions, Animated as RNAnimated } from 'react-native'
import Animated, {
  add,
  concat,
  Extrapolate,
  interpolate,
  max,
  Value,
  multiply,
  divide,
  useCode,
  call,
} from 'react-native-reanimated'

import ListBlock from './components/ListBlock'

const { height, width } = Dimensions.get('window')

export default function FoldingListRows() {
  const CARD_HEIGHT = 155
  const ROW_MARGIN = 8 * 2
  const ROW_HEIGHTS = CARD_HEIGHT + ROW_MARGIN
  const ROWS = 16

  const TOTAL_CONTENT_AREA = height - 32
  const ROWS_THAT_CAN_FIT = Math.floor(TOTAL_CONTENT_AREA / ROW_HEIGHTS)

  const scrollY = useRef(new Value(0))
  const velocityY = new Value(0)

  // artifical stiffness by making the scrollView X time longer
  const SCROLL_MULTIPLE = 12

  const dampenedScrollY = divide(scrollY.current, SCROLL_MULTIPLE)

  useCode(() => call([dampenedScrollY, scrollY.current], console.log), [])

  const {
    current: { progress: navigationTransitionProgress },
  } = useCardAnimation()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#e9eef9',
        paddingTop: 8 * 8,
        paddingHorizontal: width * 0.05,
      }}
    >
      <RNAnimated.Text
        style={{
          fontSize: 48,
          textAlign: 'left',
          fontWeight: 'bold',
          transform: [
            {
              translateX: navigationTransitionProgress.interpolate({
                inputRange: [0, 0.55, 1],
                outputRange: [100, 100, 0],
              }),
            },
          ],
          opacity: navigationTransitionProgress.interpolate({
            inputRange: [0, 0.55, 1],
            outputRange: [0, 0, 1],
          }),
        }}
      >
        Menu
      </RNAnimated.Text>
      <RNAnimated.View style={{
         transform: [
          {
            translateY: navigationTransitionProgress.interpolate({
              inputRange: [0, 0.55, 1],
              outputRange: [100, 100, 0],
            }),
          },
        ],
        opacity: navigationTransitionProgress.interpolate({
          inputRange: [0, 0.55, 1],
          outputRange: [0, 0, 1],
        }),
      }}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToInterval={ROW_HEIGHTS * SCROLL_MULTIPLE}
          contentContainerStyle={{
            height: height + (ROWS - ROWS_THAT_CAN_FIT) * (ROW_HEIGHTS * SCROLL_MULTIPLE),
          }}
          onScroll={Animated.event([
            {
              nativeEvent: {
                velocity: { y: velocityY },
                contentOffset: { y: scrollY.current },
              },
            },
          ])}
        >
          <Animated.View
            style={{
              alignItems: 'center',
              transform: [
                {
                  translateY: max(0, add(scrollY.current, ROW_MARGIN)),
                },
              ],
            }}
          >
            {Array.from({ length: ROWS }).map((_, index) => {
              const makeIndexAwareRange = (rangeInput) => (rangeInput + index) * ROW_HEIGHTS

              const baseRanges = [0, 0.5, 1]
              const inputRange = baseRanges.map(makeIndexAwareRange)

              const rotateX = interpolate(dampenedScrollY, {
                inputRange: inputRange,
                outputRange: [0, -75, -90],
                extrapolate: Extrapolate.CLAMP,
              })

              const skewX = interpolate(dampenedScrollY, {
                inputRange: [0, 1].map(makeIndexAwareRange),
                outputRange: [0, 10],
                extrapolate: Extrapolate.CLAMP,
              })

              const cardHeight = interpolate(dampenedScrollY, {
                inputRange: [0, 0.5, 0.75, 1].map(makeIndexAwareRange),
                outputRange: [CARD_HEIGHT, CARD_HEIGHT * 0.45, CARD_HEIGHT * 0.15, 0],
                extrapolate: Extrapolate.CLAMP,
              })

              const rowMarign = interpolate(dampenedScrollY, {
                inputRange: inputRange,
                outputRange: [ROW_MARGIN, ROW_MARGIN * 0.5, 0],
                extrapolate: Extrapolate.CLAMP,
              })

              const opacity = interpolate(dampenedScrollY, {
                inputRange: inputRange,
                outputRange: [1, 0.8, 0],
                extrapolate: Extrapolate.CLAMP,
              })

              const shouldHide = index < ROWS - ROWS_THAT_CAN_FIT

              return (
                <Animated.View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: shouldHide ? cardHeight : CARD_HEIGHT,
                    justifyContent: 'space-between',
                    paddingBottom: shouldHide ? rowMarign : ROW_MARGIN,
                    transform: [
                      {
                        rotateX: concat(shouldHide ? rotateX : 0, 'deg'),
                      },
                    ],
                  }}
                >
                  <ListBlock {...(shouldHide && { rotateX, opacity, skewX })} />
                  <ListBlock
                    {...(shouldHide && { rotateX, opacity, skewX: multiply(skewX, -1) })}
                  />
                </Animated.View>
              )
            })}
          </Animated.View>
        </Animated.ScrollView>
      </RNAnimated.View>
    </View>
  )
}
