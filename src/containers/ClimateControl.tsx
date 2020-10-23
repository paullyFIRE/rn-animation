import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, StatusBar, StyleSheet, Dimensions, Image } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import AlarmClock from '../images/alarmClock.jpg'
import Animated, {
  block,
  call,
  defined,
  divide,
  greaterThan,
  max,
  min,
  multiply,
  neq,
  sub,
  useCode,
  timing,
  Clock,
} from 'react-native-reanimated'
import Dial from './components/Dial'

const { cond, eq, add, set, Value, event } = Animated

const { height } = Dimensions.get('window')

// const AnimatedDial = Animated.createAnimatedComponent(Dial)

const Icon = () => (
  <View
    style={{
      width: 50,
      height: 50,
      borderRadius: 50,
      borderColor: '#e3e3e3',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ color: '#fff' }}>S</Text>
  </View>
)

const imageHeight = height * 0.8
const imageWidth = imageHeight

export default function ClimateControl() {
  const [temperature, setTemperature] = useState(85)

  const translateY = useRef(new Value(0))
  const gestureState = useRef(new Value(-1))
  const onGestureEvent = useRef(
    event([
      {
        nativeEvent: {
          translationY: translateY.current,
          state: gestureState.current,
        },
      },
    ])
  )

  function calculateRotation(gestureTranslation, gestureState) {
    const previousRotation = new Value(0)
    const previousTranslation = new Value(0)
    const dragging = new Value(0)
    const rotation = new Value(0)

    return cond(
      eq(gestureState, State.ACTIVE),
      [
        cond(eq(dragging, 0), [
          set(dragging, 1),
          set(previousRotation, rotation),
          set(previousTranslation, gestureTranslation),
        ]),
        set(
          rotation,
          add(
            previousRotation,
            multiply(2, divide(sub(previousRotation, gestureTranslation), imageHeight))
          )
        ),
      ],
      [set(dragging, 0), rotation]
    )
  }

  const rotation = calculateRotation(translateY.current, gestureState.current)

  return (
    <>
      <StatusBar barStyle="light-content" />

      <View style={styles.root}>
        <PanGestureHandler
          maxPointers={1}
          onGestureEvent={onGestureEvent.current}
          onHandlerStateChange={onGestureEvent.current}
        >
          <Animated.View
            style={{
              position: 'absolute',
              top: height / 2 - imageHeight / 2,
              right: -imageWidth / 2 - imageWidth / 4,
              width: imageWidth,
              height: imageHeight,
              backgroundColor: '#000',
              shadowColor: '#DE1F55',
              shadowRadius: 50,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 1,
              borderRadius: imageHeight / 2,
              elevation: 5,
            }}
          >
            <Dial dialSize={imageHeight} />
          </Animated.View>
        </PanGestureHandler>

        <View
          style={{
            position: 'absolute',
            top: height / 2 - 108,
            left: 8 * 4,
          }}
        >
          <Text style={styles.temperatureLabel}>Temperature, *F</Text>
          <Text style={styles.temperature}>{temperature}</Text>
        </View>

        <View>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ color: '#DE1F55' }}>Icon</Text>
            <Text style={styles.setScheduleLabel}>Set smart schedule</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '60%',
              justifyContent: 'space-between',
              marginTop: 8 * 4,
            }}
          >
            <Icon />
            <Icon />
            <Icon />
          </View>

          <View
            style={{ height: 50, borderColor: '#DE1F55', borderWidth: 1, marginTop: 8 * 4 }}
          ></View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginVertical: 8 * 4,
            }}
          >
            <Text style={{ color: '#DE1F55' }}>Power</Text>
            <Text style={{ color: '#3f3f3f', paddingLeft: 8 * 2 }}>Hold to turn off</Text>
          </View>
        </View>
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
    fontSize: 24,
  },
  temperature: {
    color: '#fff',
    fontSize: 108,
  },
  setScheduleLabel: {
    paddingLeft: 8 * 2,
    color: '#DE1F55',
  },
})
