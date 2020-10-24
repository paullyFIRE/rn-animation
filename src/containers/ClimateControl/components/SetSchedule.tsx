import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'

export default function SetSchedule() {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
      <AntDesign name="clockcircleo" size={20} color={isSelected ? '#ed215b' : '#3f3f3f'} />
      <TouchableOpacity activeOpacity={0.45} onPress={() => setIsSelected((p) => !p)}>
        <Text style={styles.setScheduleLabel}>Activate smart schedule</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  setScheduleLabel: {
    fontSize: 14,
    paddingLeft: 8,
    color: '#ed215b',
  },
})
