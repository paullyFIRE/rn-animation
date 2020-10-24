import React, { useState } from 'react'
import { View, Text, StatusBar, StyleSheet, Dimensions, Image } from 'react-native'
import Dial from './components/Dial'
import ToggleRow from './components/ToggleRow'
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import Slider from './components/Slider'
const { height } = Dimensions.get('window')

export default function ClimateControl() {
  const [temperature, setTemperature] = useState(85)

  return (
    <>
      <StatusBar barStyle="light-content" />

      <View style={styles.root}>
        <View
          style={{
            position: 'absolute',
            top: height / 2 - 108,
            left: 8 * 4,
          }}
        >
          <Text style={styles.temperatureLabel}>TEMPERATURE, *F</Text>
          <Text style={styles.temperature}>{temperature}</Text>
        </View>

        <View>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <AntDesign name="clockcircleo" size={20} color="#3f3f3f" />
            <Text style={styles.setScheduleLabel}>Set smart schedule</Text>
          </View>

          <ToggleRow />

          <Slider />

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 8 * 6,
              marginBottom: 8 * 4,
            }}
          >
            <FontAwesome name="power-off" size={24} color="#ed215b" />
            <Text style={{ color: '#3f3f3f', paddingLeft: 8 * 2 }}>Hold to turn AC off</Text>
          </View>
        </View>

        <Dial
          onIncrement={() => setTemperature((p) => p + 1)}
          onDecrement={() => setTemperature((p) => p - 1)}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 8 * 4,
  },
  temperatureLabel: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: 'bold',
  },
  temperature: {
    color: '#fff',
    fontSize: 120,
    fontWeight: 'bold',
    lineHeight: 130,
  },
  setScheduleLabel: {
    fontSize: 14,
    paddingLeft: 8,
    color: '#ed215b',
  },
})
