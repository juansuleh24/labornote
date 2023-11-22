import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Absen, Prof, Logout, gStaff, Info } from '../../assets';


class SupervisorProfile extends Component {
  constructor(props) {
    super(props);
    const { jsonData } = this.props.route.params;
    this.state = {
      jsonData: jsonData,
    };
    console.log('Sekarang di profile:' + jsonData[0].username);
  }

  iconToAttendance = () => {
    this.props.navigation.goBack();
  };

  navigateToChangePassword = () => {
    this.props.navigation.navigate('SupervisorChangePassword', { jsonData: this.state.jsonData });
  };  
  navigateToStudentInformasi = () => {
    this.props.navigation.navigate('SupervisorInfo');
  };
  
  iconToLogout = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={style.container}>
        <View style={style.appname}>
          <Text style={style.labor}>Labor</Text>
          <Text style={style.note}>Note</Text>
        </View>
        <ScrollView style={style.file}>
          <View style={style.profile}>
            <Text style={style.text}>Supervisor Profile</Text>
            <Image source={gStaff} style={style.logo} />
          </View>
          <View style={style.datadiri}>
            <Text style={style.username}>Nama: {this.state.jsonData[0].username}</Text>
          </View>
          <View style={style.datadiri}>
            <Text style={style.username}>NIK: {this.state.jsonData[0].nik}</Text>
          </View>
          <View style={style.datadiri}>
            <Text style={style.username}>Status: {this.state.jsonData[0].status}</Text>
          </View>
          <View style={style.datadiri}>
            <Text style={style.username}>Departemen: {this.state.jsonData[0].departemen}</Text>
          </View>
          <View style={style.change_pw_info_position}>
            <TouchableOpacity style={style.button_c_p_w} onPress={this.navigateToChangePassword}>
              <Text style={style.change_pw}>ChangePassword</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.button_info} onPress={this.navigateToStudentInformasi}>
              <Image source={Info} style={style.info} />
            </TouchableOpacity>
          </View>
          <View style={style.footer}>
            <Text style={style.footerText}>2023 © LaborNote</Text>
          </View>
        </ScrollView>
        <View style={style.navigation}>
          <TouchableOpacity style={{ width: '30%', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={this.iconToAttendance}>
            <Image source={Absen} style={style.iconabsent} />
          </TouchableOpacity>
          <View style={{ width: '30%', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={Prof} style={style.iconproff} />
          </View>
          <TouchableOpacity style={{ width: '30%', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={this.iconToLogout}>
            <Image source={Logout} style={style.iconlogoutt} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SupervisorProfile;

const style = StyleSheet.create({
  container: {
    backgroundColor: '#040D12',
    flex: 1,
  },
  username: {
    fontSize: 16,
    color: '#05375a',
    fontWeight: 'bold',
    fontSize: 20,
  },
  appname: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 10,
  },
  labor: {
    color: '#B90059',
    fontSize: 15,
  },
  note: {
    color: '#4254F6',
    marginTop: 1,
    fontSize: 15,
  },
  file: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 15,
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
  },
  datadiri: {
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 20,
  },
  navigation: {
    backgroundColor: '#040D12',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginLeft: 5,
  },
  iconhandback: {
    width: 30,
    height: 20,
  },
  iconabsent: {
    width: 17,
    height: 20,
  },
  iconproff: {
    width: 20,
    height: 20,
  },
  iconlogoutt: {
    width: 20,
    height: 20,
  },
  logo: {
    width: 120,
    height: 120,
    backgroundColor: 'black',
    borderRadius: 80,
    marginTop: 50,
    marginBottom: 50,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  text: {
    color: 'black',
    marginTop: 30,
    fontSize: 23,
    fontWeight: '500',
  },
  change_pw_info_position: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '43.5%',
    marginBottom: -5,
  },
  button_c_p_w: {
    width: 150,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 92,
    marginRight: 60,
  },
  change_pw: {
    color: 'blue',
    fontSize: 15,
  },
  button_info: {
    width: 30,
    height: 30,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -10,
    marginTop: -15, 
  },
  info: {
    width: 23,
    height: 23,
  },
  footer: {
    height: 25,
    display: 'flex',
    alignItems: 'center',
    marginTop: 14,
    width: '100%',
    backgroundColor: '#DEDEDE',
    borderRadius: 10,
  },
  footerText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 2,
  },
});
