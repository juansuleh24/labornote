import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Imagebg, gMahasiswa, Call } from '../../assets'

export default class StudentInfo extends Component {
  render() {
    return (
        <View style={style.container}>
        <View style={style.appname}>
          <Text style={style.labor}>Labor</Text>
          <Text style={style.note}>Note</Text>
        </View>
        <Image style={style.line} source={Imagebg} />
        <View style={style.appname2}>
            <Text style={style.labor2}>LABOR</Text>
            <Text style={style.note2}>NOTE</Text>
            <Text> adalah Platform mobile untuk laporan </Text>
        </View>
        <Text>
            kerja student labor di Universitas Klabat. Platform ini adalah solusi dari laporan 
            kerja manual(Kertas) sebelumnya. Platform labornote dapat membantu setiap student 
            labor dalam membuat dan mengirim laporan kerja mereka setiap harinya. Platform ini 
            dapat membuat pelaporan kerja student labor lebih cepat dan efisien dan aman tanpa 
            takut laporan hilang atau tercecer.
        </Text>
        <Text style={style.help_header}>Help? </Text>
        <View style={style.help}>
            <Image source={Call} style={style.iconcall}/>
            <Text>   :</Text>
            <Text style={style.nomor}> +62 852-5675-7620</Text>
            <Text> (Student Finance)</Text>
        </View>
        <View style={style.image_position}>
            <Image source={gMahasiswa} />
        </View> 
        <View style={style.position}>
            <Image style={style.background_button} source={Imagebg}/>
            <TouchableOpacity style={style.button_back} onPress={() => this.props.navigation.goBack()}>
                <Text>kembali</Text>
            </TouchableOpacity> 
        </View>
    </View>
    )
  }
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#040D12',
        flex: 1,
      },
    appname: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        marginBottom: 10,
      },
    labor: {
        color: '#B90059',
        fontSize: 40,
    },
    note: {
        color: '#4254F6',
        marginTop: 1,
        fontSize: 40,
    },
    info: {
        marginLeft: 15,
    },
    line: {
        width: '100%',
        height: 1,
        marginBottom: 10,
    },
    appname2: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 30,
        marginBottom: -2,
      },
    labor2: {
        color: '#B90059',
    },
    note2: {
        color: '#4254F6',
    },
    help_header: {
        marginTop: 10,
        marginBottom: 5,
    },
    iconcall: {
        width: 15,
        height: 15,
    },
    help: {
        flexDirection: 'row',
    },
    nomor: {
        color: 'blue',
    },
    image_position: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 60,
    },
    position: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 75,
    },
    background_button: {
        width: 100,
        height: 35,
        borderRadius: 20,
    },
    button_back: {
        backgroundColor: 'black',
        width: 90,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginLeft: -95.5,
    },
})