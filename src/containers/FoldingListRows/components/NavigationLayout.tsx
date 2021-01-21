import { useNavigation } from '@react-navigation/native'
import { StackNavigationOptions, useCardAnimation } from '@react-navigation/stack'
import React from 'react'
import { View, Dimensions, Animated as RNAnimated } from 'react-native'
const { width } = Dimensions.get('window')

export default function NavigationLayout({ title, children }) {
  const navigation = useNavigation()

  React.useLayoutEffect(() => {
    const navigationOptions: StackNavigationOptions = {
      headerTransparent: true,
      title: '',
      headerBackTitleVisible: false,
      headerTintColor: '#615798',
      headerLeftContainerStyle: {
        paddingLeft: 8 * 2,
      },
    }

    navigation.setOptions(navigationOptions)
  }, [])

  const {
    current: { progress: navigationTransitionProgress },
  } = useCardAnimation()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#e9eef9',
        paddingTop: 8 * 10,
        paddingHorizontal: width * 0.05,
      }}
    >
      <RNAnimated.Text
        style={{
          fontSize: 48,
          textAlign: 'left',
          fontWeight: 'bold',
          transform: [
            {
              translateY: navigationTransitionProgress.interpolate({
                inputRange: [0, 0.55, 1],
                outputRange: [-100, -100, 0],
              }),
            },
          ],
          opacity: navigationTransitionProgress.interpolate({
            inputRange: [0, 0.55, 1],
            outputRange: [0, 0, 1],
          }),
        }}
      >
        {title}
      </RNAnimated.Text>
      <RNAnimated.View
        style={{
          transform: [
            {
              translateY: navigationTransitionProgress.interpolate({
                inputRange: [0, 0.55, 1],
                outputRange: [100, 100, 0],
              }),
            },
          ],
          opacity: navigationTransitionProgress.interpolate({
            inputRange: [0, 0.55, 1],
            outputRange: [0, 0, 1],
          }),
        }}
      >
        {children}
      </RNAnimated.View>
    </View>
  )
}
