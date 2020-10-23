import React, { useState } from 'react'
import { View, Text, StatusBar, StyleSheet, Dimensions, Image } from 'react-native'
import Dial from './components/Dial'

const { height } = Dimensions.get('window')

const Icon = () => (
  <View
    style={{
      width: 50,
      height: 50,
      borderRadius: 50,
      borderColor: '#e3e3e3',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ color: '#fff' }}>S</Text>
  </View>
)

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
          <Text style={styles.temperatureLabel}>Temperature, *F</Text>
          <Text style={styles.temperature}>{temperature}</Text>
        </View>

        <View>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ color: '#DE1F55' }}>Icon</Text>
            <Text style={styles.setScheduleLabel}>Set smart schedule</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '60%',
              justifyContent: 'space-between',
              marginTop: 8 * 4,
            }}
          >
            <Icon />
            <Icon />
            <Icon />
          </View>

          <View
            style={{ height: 50, borderColor: '#DE1F55', borderWidth: 1, marginTop: 8 * 4 }}
          ></View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginVertical: 8 * 4,
            }}
          >
            <Text style={{ color: '#DE1F55' }}>Power</Text>
            <Text style={{ color: '#3f3f3f', paddingLeft: 8 * 2 }}>Hold to turn off</Text>
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
    fontSize: 24,
  },
  temperature: {
    color: '#fff',
    fontSize: 108,
  },
  setScheduleLabel: {
    paddingLeft: 8 * 2,
    color: '#DE1F55',
  },
})
