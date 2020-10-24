import React from 'react'
import { Svg, G, Circle, Line } from 'react-native-svg'
import Animated, {
  and,
  call,
  defined,
  floor,
  greaterThan,
  neq,
  useCode,
} from 'react-native-reanimated'

import { Dimensions, View } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

const { cond, eq, add, set, Value, event, multiply, sub, divide } = Animated

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const { height } = Dimensions.get('window')
const DIAL_SIZE = height * 0.8

export default class Dial extends React.Component {
  translateY = new Value(0)
  gestureState = new Value(-1)
  onGestureEvent = event([
    {
      nativeEvent: {
        translationY: this.translateY,
        state: this.gestureState,
      },
    },
  ])

  calculateRotation(gestureTranslation, gestureState) {
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
        greaterThan(sub(previousRotation, rotation), 0),
        call([], this.props.onIncrement),
        call([], this.props.onDecrement)
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

  render() {
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

    const rotation = this.calculateRotation(this.translateY, this.gestureState)

    return (
      <View
        style={{
          position: 'absolute',
          top: height / 2 - DIAL_SIZE / 2,
          right: -DIAL_SIZE / 2 - DIAL_SIZE / 4,
          width: DIAL_SIZE,
          height: DIAL_SIZE,
          backgroundColor: '#000',
          shadowColor: '#ed215b',
          shadowRadius: 50,
          shadowOffset: {
            width: 10,
            height: 2,
          },
          shadowOpacity: 0.85,
          borderRadius: DIAL_SIZE / 2,
          elevation: 5,
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
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onGestureEvent}
        >
          <Animated.View
            style={{
              position: 'absolute',
              width: DIAL_SIZE / 1,
              height: DIAL_SIZE / 1.25,
              top: 0,
              left: 0,
              borderWidth: 1,
              borderColor: 'red'
            }}
          />
        </PanGestureHandler>
      </View>
    )
  }
}
