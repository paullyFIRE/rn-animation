import React, { useCallback, useRef, useState } from 'react'
import { View, Text, StatusBar, StyleSheet, Dimensions, Image } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import AlarmClock from '../images/alarmClock.jpg'
import Animated, { divide, multiply, useCode } from 'react-native-reanimated'

const { cond, eq, add, set, Value, event } = Animated

const { height, width } = Dimensions.get('window')

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

const imageHeight = height * 0.7
const imageWidth = imageHeight

export default function ClimateControl() {
  const [temperature, setTemperature] = useState(85)

  const velocityY = useRef(new Value(0))
  const offsetY = useRef(new Value(height / 2))
  const gestureState = useRef(new Value(-1))
  const onGestureEvent = useRef(
    event([
      {
        nativeEvent: {
          velocityY: velocityY.current,
          state: gestureState.current,
        },
      },
    ])
  )

  const rotation = cond(
    eq(gestureState.current, State.ACTIVE),
    add(offsetY.current, 1),
    set(offsetY.current, add(offsetY.current, 1))
  )

  return (
    <>
      <StatusBar barStyle="light-content" />
      <PanGestureHandler
        maxPointers={1}
        onGestureEvent={onGestureEvent.current}
        onHandlerStateChange={onGestureEvent.current}
      >
        <Animated.View
          style={{
            borderColor: 'red',
            borderWidth: 2,
            position: 'absolute',
            top: height / 2 - imageHeight / 2,
            right: -imageWidth / 2 - imageWidth / 4,
            width: imageWidth,
            height: imageHeight,
            zIndex: 1,
            shadowColor: 'red',
            shadowRadius: 2,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            transform: [
              {
                rotate: rotation,
              },
            ],
          }}
        >
          <Animated.Image
            source={AlarmClock}
            style={{
              width: imageWidth,
              height: imageHeight,
              borderRadius: imageHeight / 2,
            }}
          />
        </Animated.View>
      </PanGestureHandler>

      <View style={styles.root}>
        <View
          style={{
            position: 'absolute',
            top: height / 2 - 108,
            left: 8 * 6,
          }}
        >
          <Text style={styles.temperatureLabel}>Temperature, *F</Text>
          <Text style={styles.temperature}>{temperature}</Text>
        </View>

        <View>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ color: 'red' }}>Icon</Text>
            <Text style={styles.setScheduleLabel}>Set smart schedule</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '70%',
              justifyContent: 'space-between',
              marginTop: 8 * 4,
            }}
          >
            <Icon />
            <Icon />
            <Icon />
          </View>

          <View style={{ height: 50, borderColor: 'red', borderWidth: 1, marginTop: 8 * 4 }}></View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginVertical: 8 * 4,
            }}
          >
            <Text style={{ color: 'red' }}>Power</Text>
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
    paddingHorizontal: 8 * 6,
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
    color: 'red',
  },
})
