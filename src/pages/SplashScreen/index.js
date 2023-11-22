import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { gMahasiswa, Logo, Ground, Groundunklab, Logounklab } from '../../assets';
const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);
  return (
    <ImageBackground source={Groundunklab} style={style.container}>
      <Image source={Logounklab} style={style.logo} />
      <Text style={style.unklab}>Universitas Klabat</Text>
      {/* <View style={style.appname}>
          <Text style={style.labor}>Labor</Text>
          <Text style={style.note}>Note</Text>
       </View> */}
       <View style={style.center}>
          <Image source={gMahasiswa}></Image>
       </View>
    </ImageBackground>
  )
} 

export default SplashScreen

const style = StyleSheet.create({
    container: {
      backgroundColor: '#040D12',
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 70,
      height: 70,
      marginBottom: 10,
    },
    // appname: {
    //   flexDirection: 'row',
    //   marginTop: 30,
    // },
    // labor: {
    //   color: '#B90059',
    //   fontSize: 30,
    // },
    // note: {
    //   color: '#4254F6',
    //   marginTop: 1,
    //   fontSize: 30,
    // },
    unklab: {
      marginBottom: 40,
      fontSize: 25,
      fontStyle: 'italic',
      marginBottom: -30,
    },
    center: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 80,
    },
})