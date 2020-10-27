import React, { useRef } from 'react'
import { Dimensions, StatusBar } from 'react-native'
import Animated, {
  add,
  concat,
  Extrapolate,
  interpolate,
  max,
  Value,
  multiply,
  divide,
} from 'react-native-reanimated'

import ListBlock from './components/ListBlock'
import NavigationLayout from './components/NavigationLayout'

const { height } = Dimensions.get('window')

export default function MenuCategories({ navigation }) {
  const CARD_HEIGHT = 155
  const ROW_MARGIN = 8 * 2
  const ROW_HEIGHTS = CARD_HEIGHT + ROW_MARGIN
  const ROWS = 16

  const TOTAL_CONTENT_AREA = height - 32
  const ROWS_THAT_CAN_FIT = Math.floor(TOTAL_CONTENT_AREA / ROW_HEIGHTS)

  const scrollY = useRef(new Value(0))
  const velocityY = new Value(0)

  // artifical stiffness by making the scrollView X time longer
  const SCROLL_MULTIPLE = 8

  const dampenedScrollY = divide(scrollY.current, SCROLL_MULTIPLE)

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationLayout title="Menu">
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

              const rowMargin = interpolate(dampenedScrollY, {
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

              const item1Title = `Menu Item ${Math.floor(Math.random() * 25125)}`
              const item2Title = `Menu Item ${Math.floor(Math.random() * 25125)}`

              return (
                <Animated.View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: shouldHide ? cardHeight : CARD_HEIGHT,
                    justifyContent: 'space-between',
                    paddingBottom: shouldHide ? rowMargin : ROW_MARGIN,
                    transform: [
                      {
                        rotateX: concat(shouldHide ? rotateX : 0, 'deg'),
                      },
                    ],
                  }}
                >
                  <ListBlock
                    {...(shouldHide && { rotateX, opacity, skewX })}
                    title={item1Title}
                    onPress={() =>
                      navigation.navigate('FoldingListRows.CategoryOverview', {
                        category: item1Title,
                      })
                    }
                  />
                  <ListBlock
                    {...(shouldHide && { rotateX, opacity, skewX: multiply(skewX, -1) })}
                    title={item2Title}
                    onPress={() =>
                      navigation.navigate('FoldingListRows.CategoryOverview', {
                        category: item2Title,
                      })
                    }
                  />
                </Animated.View>
              )
            })}
          </Animated.View>
        </Animated.ScrollView>
      </NavigationLayout>
    </>
  )
}
