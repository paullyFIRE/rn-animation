import { useNavigation } from '@react-navigation/native'
import React from 'react'
import NavigationLayout from './components/NavigationLayout'
import { Text } from 'react-native'

export default function CategoryOverview() {
  const navigation = useNavigation()
  console.log('navigation: ', navigation);

  return (
    <NavigationLayout title='Some Pews'>
      <Text>Yoooo</Text>
    </NavigationLayout>
  )
}
