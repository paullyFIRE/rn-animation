import React from 'react'
import { Svg, G, Circle, Line } from 'react-native-svg'
import Animated, {
  call,
  Extrapolate,
  floor,
  greaterThan,
  interpolate,
  neq,
  useCode,
} from 'react-native-reanimated'

import { Dimensions } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import {  useMountAnimationNode } from '../../../utils'

const { cond, eq, add, set, Value, event, multiply, sub, divide } = Animated

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const { height } = Dimensions.get('window')
const DIAL_SIZE = height * 0.8

export default React.memo(function Dial(props) {
  const animationProgress = useMountAnimationNode()

  const mountTranslationX = interpolate(animationProgress.current, {
    inputRange: [0, 1],
    outputRange: [150, 0],
  })
  const mountRotation = interpolate(animationProgress.current, {
    inputRange: [0, 1],
    outputRange: [0.75, 0],
  })

  const translateY = new Value(0)
  const gestureState = new Value(-1)
  const onGestureEvent = event([
    {
      nativeEvent: {
        translationY: translateY,
        state: gestureState,
      },
    },
  ])

  const calculateRotation = (gestureTranslation, gestureState) => {
    const initialGestureRotation = new Value(0)
    const previousTranslation = new Value(0)
    const dragging = new Value(0)
    const previousRotation = new Value(0)
    const rotation = new Value(0)

    const radianToDegrees = (radianValue) => multiply(radianValue, divide(180, Math.PI))
    const lowestMultipleOf10 = (value) => floor(divide(value, 10))

    const deltaLowestMultiplesOfTen = sub(
      lowestMultipleOf10(radianToDegrees(rotation)),
      lowestMultipleOf10(radianToDegrees(previousRotation))
    )
    const didTick = neq(deltaLowestMultiplesOfTen, 0)

    const callOnTick = cond(
      didTick,
      cond(
        greaterThan(sub(rotation, previousRotation), 0),
        call([], props.onIncrement),
        call([], props.onDecrement)
      )
    )

    return cond(
      eq(gestureState, State.ACTIVE),
      [
        cond(eq(dragging, 0), [
          set(dragging, 1),
          set(initialGestureRotation, rotation),
          set(previousTranslation, gestureTranslation),
          callOnTick,
        ]),
        set(previousRotation, rotation),
        set(
          rotation,
          add(
            initialGestureRotation,
            multiply(2, divide(sub(initialGestureRotation, gestureTranslation), DIAL_SIZE))
          )
        ),
        callOnTick,
        rotation,
      ],
      [set(dragging, 0), rotation]
    )
  }

  const DIAL_STROKE_WIDTH = 4
  const OUTER_RING_RADIUS = DIAL_SIZE / 2 - DIAL_STROKE_WIDTH / 2
  const OUTER_RING_GAP_WIDTH = 12
  const LONG_MARKER_LENGTH = 25
  const SHORT_MARKER_LENGTH = 15
  const NTH_LONG_MARKER = 5
  const DEGREES_PER_STICK = 2

  const centerX = DIAL_SIZE / 2
  const centerY = centerX

  const baseLineX = centerX
  const baseLineY1 = centerY + OUTER_RING_RADIUS - OUTER_RING_GAP_WIDTH
  const baseLineY2 = baseLineY1 - LONG_MARKER_LENGTH

  const rotation = calculateRotation(translateY, gestureState)

  const shadowRadius = interpolate(rotation, {
    inputRange: [-1, 0, 2],
    outputRange: [25, 50, 75],
    extrapolate: Extrapolate.CLAMP,
  })
  const shadowOpacity = interpolate(rotation, {
    inputRange: [-1, 0, 2],
    outputRange: [0.25, 0.85, 1],
    extrapolate: Extrapolate.CLAMP,
  })

  useCode(() => call([rotation], console.log), [])

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: height / 2 - DIAL_SIZE / 2,
        right: -DIAL_SIZE / 2 - DIAL_SIZE / 4,
        width: DIAL_SIZE,
        height: DIAL_SIZE,
        backgroundColor: '#000',
        shadowColor: '#ed215b',
        shadowRadius: shadowRadius,
        shadowOffset: {
          width: 10,
          height: 2,
        },
        shadowOpacity: shadowOpacity,
        borderRadius: DIAL_SIZE / 2,
        elevation: 5,
        transform: [
          { translateX: mountTranslationX },
          {
            rotate: mountRotation,
          },
        ],
      }}
    >
      <AnimatedSvg
        width={DIAL_SIZE}
        height={DIAL_SIZE}
        style={{
          transform: [{ rotate: rotation }],
        }}
      >
        <Circle
          cx={centerX}
          cy={centerY}
          r={OUTER_RING_RADIUS}
          stroke="#ed215b"
          strokeWidth={DIAL_STROKE_WIDTH}
        />

        <G>
          {Array.from({ length: Math.floor(360 / DEGREES_PER_STICK) }).map((_, i) => {
            const isBigStick = i % NTH_LONG_MARKER === 0

            const y2 = isBigStick ? baseLineY2 : baseLineY1 - SHORT_MARKER_LENGTH

            return (
              <G
                key={i}
                transform={{
                  rotation: DEGREES_PER_STICK * i,
                  originX: centerX,
                  originY: centerY,
                }}
              >
                <Line stroke="#645257" strokeWidth={2} x={baseLineX} y1={baseLineY1} y2={y2} />
              </G>
            )
          })}
        </G>
      </AnimatedSvg>
      <PanGestureHandler
        maxPointers={1}
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}
      >
        <Animated.View
          style={{
            position: 'absolute',
            width: DIAL_SIZE / 1,
            height: DIAL_SIZE / 1.25,
            top: 0,
            left: 0,
            // Dial PanHandler Debug
            // borderWidth: 1,
            // borderColor: 'red'
          }}
        />
      </PanGestureHandler>
    </Animated.View>
  )
})
