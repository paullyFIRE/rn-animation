import React from 'react'
import { Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Animated, { concat } from 'react-native-reanimated'

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

const Block = ({ rotateX, opacity, skewX }) => (
  <Animated.View
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
      <Text style={{ marginTop: 4 }}>Menu Item {Math.floor(Math.random() * 25125)}</Text>
    </Animated.View>
  </Animated.View>
)

export default Block