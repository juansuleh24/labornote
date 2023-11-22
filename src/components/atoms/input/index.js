import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { Hide, Show } from '../../../assets';

export default function Input({password, ...props}) {
  const [isFocus, setIsFocus] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View style={style.container}>
      {/* <Text style={style.label}>{label}</Text> */}
      <View style={[style.inputcontainer, {borderColor: isFocus ? '#F4F4F4' : 'grey'}]}>
        <TextInput 
          secureTextEntry={hidePassword}
          {...props} 
          style={style.textinput} 
          onFocus={() => {
            setIsFocus(true);
          }} 
          onBlur={() => {
            setIsFocus(false);
          }} 
        />
        {password && (
          <TouchableOpacity 
            style={style.show} 
            onPress={() => {
              setHidePassword(!hidePassword);
            }}>
            {hidePassword ? (
              <Image style={style.hide} source={Hide} />
            ) : (
              <Image style={style.hide} source={Show} />
            )}
        </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
    container: {marginBottom: 10, alignItems: 'center',},
    inputcontainer: { 
      borderRadius: 10,
      height: 43,
      width: 280,
      backgroundColor: 'black',
      borderWidth: 1,
      borderColor: 'grey',
      paddingHorizontal: 10,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textinput: { marginLeft: 10, color: 'white', flex: 1, },
    show: { marginRight: 5,
            height: 30, 
            width: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', },
    hide: {width: 19, height: 13.5, },
})