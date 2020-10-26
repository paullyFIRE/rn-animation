import { useRef } from 'react'
import {
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
} from 'react-native-reanimated'

export function runTiming(clock, value, dest, duration?) {
  const state = {
    finished: new Value(0),
    position: value,
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration: duration || 500,
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

export const useMountAnimationNode = (duration?: number) => {
  const animationProgressNodeRef = useRef(new Value(0))

  // DEBUG
  useCode(
    () => [
      set(
        animationProgressNodeRef.current,
        runTiming(new Clock(), animationProgressNodeRef.current, new Value(1), duration)
      ),
      animationProgressNodeRef.current,
    ],
    []
  )

  return animationProgressNodeRef
}
