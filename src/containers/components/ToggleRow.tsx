import { Ionicons, Entypo, Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Icon = ({ startSelected, children }) => {
  const [isSelected, setIsSelected] = useState(startSelected || false)

  return (
    <TouchableOpacity
      activeOpacity={0.65}
      onPress={() => setIsSelected((p) => !p)}
      style={{
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: isSelected ? '#ed215b' : '#645257',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSelected ? '#ed215b' : '#000',
      }}
    >
      {React.cloneElement(children, { color: isSelected ? '#fff' : '#3f3f3f' })}
    </TouchableOpacity>
  )
}

export default function ToggleRow() {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        marginTop: 8 * 4,
      }}
    >
      <Icon startSelected>
        <Ionicons name="md-snow" size={18} />
      </Icon>
      <Icon>
        <Entypo name="drop" size={18} />
      </Icon>
      <Icon>
        <Feather name="sun" size={18} />
      </Icon>
    </View>
  )
}
