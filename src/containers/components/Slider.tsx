import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { Value, event, useCode, call, cond, eq, set } from 'react-native-reanimated'

const SLIDER_BUTTON_SIZE = 30

export default React.memo(function Slider() {
  const translateX = new Value(0)
  const gestureState = new Value(-1)

  const onGestureEvent = event([
    {
      nativeEvent: {
        x: translateX,
        state: gestureState,
      },
    },
  ])

  function interaction(gestureTranslation, gestureState) {
    const dragging = new Value(0)
    const position = new Value(0)

    return cond(
      eq(gestureState, State.ACTIVE),
      [cond(eq(dragging, 0), [set(dragging, 1)]), set(position, gestureTranslation)],
      [set(dragging, 0), position]
    )
  }

  const translationX = interaction(translateX, gestureState)

  return (
    <View
      style={{
        height: 50,
        paddingLeft: 8,
        marginTop: 8 * 4,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <MaterialCommunityIcons
        name="fan"
        size={20}
        color="#3f3f3f"
        style={{
          flex: 1,
        }}
      />

      <PanGestureHandler
        maxPointers={1}
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}
      >
        <Animated.View
          style={{
            flex: 9,
            height: '100%',
            paddingRight: 8 * 4,
            paddingLeft: 8 * 2,
            // PanHandler Area
            // borderColor: 'blue',
            // borderWidth: 1,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              height: 10,
              borderRadius: 5,
              backgroundColor: '#3f3f3f',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Animated.View
              style={{
                height: 10,
                backgroundColor: '#ed215b',
                borderRadius: 10,
                width: translationX,
                maxWidth: '100%',
              }}
            ></Animated.View>
            <Animated.View
              style={{
                width: SLIDER_BUTTON_SIZE,
                height: SLIDER_BUTTON_SIZE,
                borderRadius: SLIDER_BUTTON_SIZE / 2,
                backgroundColor: '#fff',
                borderColor: '#000',
                borderWidth: 2,
                transform: [
                  {
                    translateX: -SLIDER_BUTTON_SIZE / 2,
                  },
                ],
              }}
            />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
})
