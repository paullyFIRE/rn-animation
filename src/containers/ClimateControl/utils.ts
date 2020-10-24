import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Ref, useEffect, useRef, useState } from 'react'
import Animated, {
  block,
  Clock,
  cond,
  Value,
  clockRunning,
  startClock,
  stopClock,
  set,
  timing,
  debug,
  Easing,
  useCode,
  call,
  interpolate,
  add,
  sub,
} from 'react-native-reanimated'

export function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: value,
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration: 500,
    toValue: dest,
    easing: Easing.inOut(Easing.ease),
  }

  return block([
    cond(clockRunning(clock), 0, [
      // If the clock isn't running we reset all the animation params and start the clock
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug('stop clock', stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ])
}

export const useMountAnimationNode = () => {
  const animationProgressNodeRef = useRef(new Value(0))

  useCode(
    () => [
      set(
        animationProgressNodeRef.current,
        runTiming(new Clock(), animationProgressNodeRef.current, new Value(1))
      ),
      animationProgressNodeRef.current,
    ],
    []
  )

  return animationProgressNodeRef
}
