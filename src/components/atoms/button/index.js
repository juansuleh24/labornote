import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import React from 'react'

export default function Button({label,onPress}) {
  return (
    <View style={style.header_button}>
      <TouchableOpacity style={style.button} onPress={onPress} >
        <Text style={style.text}>{label}</Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
    header_button: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        height: 40,
        width: 120,
        backgroundColor: 'blue',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    text: {
        fontSize: 16, color: 'white'
    }
})