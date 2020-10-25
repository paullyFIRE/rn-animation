import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Animated, { concat } from 'react-native-reanimated'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

const featherIconNames = [
  'alert-circle',
  'align-justify',
  'aperture',
  'arrow-down',
  'archive',
  'alert-triangle',
  'airplay',
  'activity',
]

const Block = ({ rotateX, opacity, skewX, title, onPress }) => (
  <AnimatedTouchable
    onPress={onPress}
    style={{
      width: 155,
      borderRadius: 8,
      backgroundColor: '#fff',
      shadowColor: '#d2d2d2',
      shadowRadius: 5,
      shadowOffset: {
        width: 4,
        height: 6,
      },
      shadowOpacity: 0.25,
      ...(rotateX && {
        transform: [
          {
            skewX: concat(skewX, 'deg'),
            rotate: concat(skewX, 'deg'),
          },
        ],
      }),
    }}
  >
    <Animated.View
      style={{
        flex: 1,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        ...(opacity && { opacity }),
      }}
    >
      <Feather
        name={featherIconNames[Math.floor(Math.random() * featherIconNames.length)]}
        size={46}
        color="#615798"
      />
      <Text style={{ marginTop: 4 }}>{title}</Text>
    </Animated.View>
  </AnimatedTouchable>
)

export default Block
