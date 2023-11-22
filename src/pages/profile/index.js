import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Absen, IconHistory, Prof, Logout, gLabor,Info } from '../../assets';


class Profile extends Component {
  constructor(props) {
    super(props);
    const { jsonData } = this.props.route.params;
    console.log('sekarang ada di Profile');
    console.log(jsonData);
    this.state = {
      jsonData: jsonData,
    };
    //console.log('nim_nil_nik: ' + jsonData[0].nim_nil);
  }

  // Di komponen Profile saat mengakses komponen Attendance
  iconToAttendance = () => {
    this.props.navigation.navigate('Attendance', { jsonData: this.state.jsonData });
  };

  iconToProfile = () => {
    this.props.navigation.navigate('Profile');
  };

  iconToHistory = () => {
    this.props.navigation.navigate('History', { jsonData: this.state.jsonData });
  };

  navigateToChangePassword = () => {
    this.props.navigation.navigate('ChangePassword', { jsonData: this.state.jsonData });
  };  
  navigateToStudentInfo = () => {
    this.props.navigation.navigate('StudentInfo');
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
        <View style={style.file}>
          <View style={style.profile}>
            <Text style={style.text}> Student Labor Profile</Text>
            <Image source={gLabor} style={style.logo} />
          </View>
          <View style={style.datadiri}>
            <Text style={style.username}>Nama: {this.state.jsonData[0].username}</Text>
          </View>
          <View style={style.datadiri}>
            <Text style={style.username}>NIM/NIL: {this.state.jsonData[0].nim_nil}</Text>
          </View>
          <View style={style.datadiri}>
            <Text style={style.username}>Fakultas: {this.state.jsonData[0].fakultas}</Text>
          </View>
          <View style={style.datadiri}>
            <Text style={style.username}>Prodi: {this.state.jsonData[0].prodi}</Text>
          </View>
          <View style={style.datadiri}>
            <Text style={style.username}>Status: {this.state.jsonData[0].status}</Text>
          </View>
          <View style={style.datadiri}>
            <Text style={style.username}>Departemen: {this.state.jsonData[0].departemen}</Text>
          </View>
          <View style={style.datadiri}>
            <Text style={style.username}>Nama Supervisor: {this.state.jsonData[0].supervisor_name}</Text>
          </View>

          <View style={style.change_pw_info_position}>
            <TouchableOpacity style={style.button_c_p_w} onPress={this.navigateToChangePassword}>
              <Text style={style.change_pw}>ChangePassword</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.button_info} onPress={this.navigateToStudentInfo}>
              <Image source={Info} style={style.info} />
            </TouchableOpacity>
          </View>
          <View style={style.footer}>
            <Text style={style.footerText}>2023 © LaborNote</Text>
          </View>

        </View>
        <View style={style.navigation}>
          <TouchableOpacity style={{ width: '24%', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={this.iconToAttendance}>
              <Image source={Absen} style={style.iconabsen} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '24%', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={this.iconToHistory}>
              <Image source={IconHistory} style={style.iconhistory} />
          </TouchableOpacity>
          <View style={{ width: '24%', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={this.iconToProfile}>
              <Image source={Prof} style={style.iconprof} />
          </View>
          <TouchableOpacity style={{ width: '24%', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={this.iconToLogout}>
              <Image source={Logout} style={style.iconlogout} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Profile;

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
  change_pw_info_position: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 65,
    marginBottom: -5,
  },
  button_c_p_w: {
    // backgroundColor: 'black',
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
    // textAlign: 'center', 
    // marginLeft: 105,
    // marginRight: 60,
  },
  button_info: {
    // backgroundColor: 'blue',
    width: 30,
    height: 30,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -10,
    marginTop: -15, 
    // marginRight: -10,
  },
  info: {
    width: 23,
    height: 23,
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
  iconabsen: {
    width: 17,
    height: 20,
    marginRight: '15%',
    marginLeft: '15%',
  },
  iconhistory: {
    width: 20,
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
  iconlogout: {
    width: 20,
    height: 20,
    marginRight: '15%',
    marginLeft: '15%',
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
    marginTop: 25,
    fontSize: 23,
    fontWeight: '500',
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
