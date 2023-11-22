import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Absen, Chat, Prof } from '../../../assets'

export default function Icon({ navigation }) {
  const goToProfile = () => {
    navigation.navigate('Profile');
  };
  const goToChat = () => {
    navigation.navigate('Chat');
  };


  // return (
  //   <View style={style.navigation}>
  //     <TouchableOpacity style={{width: 24,marginRight: '15%',marginLeft: '15%',}} onPress={goToProfile}>
  //       <Image source={Absen} style={style.iconabsen} />
  //     </TouchableOpacity>
  //     <TouchableOpacity style={{width: 24,marginRight: '15%',marginLeft: '15%',}} onPress={goToChat}>
  //       <Image source={Chat} style={style.iconchat} />
  //     </TouchableOpacity>
  //     <TouchableOpacity style={{width: 24,marginRight: '15%',marginLeft: '15%',}} onPress={goToProfile}>
  //       <Image source={Prof} style={style.iconprof} />
  //     </TouchableOpacity>
  //   </View>
  // ); 
}

const style = StyleSheet.create({
    navigation: {
            backgroundColor: '#040D12',
            height: 45,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 5,
        },
        iconabsen: {
            width: 17,
            height: 20,
            marginRight: '15%',
            marginLeft: '15%',
        },
        iconchat: {
            width: 23,
            height: 20,
            marginRight: '15%',
            marginLeft: '15%',
        },
        iconprof: {
            width: 20,
            height: 20,
            marginRight: '15%',
            marginLeft: '15%',
        },
})