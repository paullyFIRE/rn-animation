import React from 'react'
import { Svg, G, Circle, Line } from 'react-native-svg'
import Animated from 'react-native-reanimated'

// const AnimatedG = Animated.createAnimatedComponent(G)

export default class Dial extends React.Component {
  render() {
    const { dialSize, } = this.props

    const DIAL_STROKE_WIDTH = 4
    const OUTER_RING_RADIUS = dialSize / 2 - DIAL_STROKE_WIDTH / 2
    const OUTER_RING_GAP_WIDTH = 12
    const LONG_MARKER_LENGTH = 25
    const SHORT_MARKER_LENGTH = 15
    const NTH_LONG_MARKER = 5
    const DEGREES_PER_STICK = 2

    const centerX = dialSize / 2
    const centerY = centerX

    const baseLineX = centerX
    const baseLineY1 = centerY + OUTER_RING_RADIUS - OUTER_RING_GAP_WIDTH
    const baseLineY2 = baseLineY1 - LONG_MARKER_LENGTH

    return (
      <Svg width={dialSize} height={dialSize}>
        <Circle
          cx={dialSize / 2}
          cy={dialSize / 2}
          r={OUTER_RING_RADIUS}
          stroke="#DE1F55"
          strokeWidth={DIAL_STROKE_WIDTH}
        />

        <G transform={{ rotation: 25, originX: centerX, originY: centerY }}>
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
      </Svg>
    )
  }
}
