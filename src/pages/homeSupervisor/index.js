import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Absen, Chat, Prof, Logo, Logout, IconDown, IconUp } from '../../assets';

class HomeSupervisor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jsonData: jsonData
          };
        // const jsonData = [
        //     // Data laporan kerja (sesuaikan dengan data sebenarnya)
        // ];

        const { jsonData } = this.props.route.params;
    }

    handleViewReport = () => {
        const { jsonData } = this.props.route.params;
        const studentName = jsonData[0].student_name;
        const noRegis = jsonData[0].no_regis;
        const Departemen = jsonData[0].departemen;
        const day = jsonData[0].day;
        const tanggalKerja = jsonData[0].tanggal_kerja;
        const gambarMulai = jsonData[0].gambar_mulai;
        const gambarSelesai = jsonData[0].gambar_selesai;
        const jamMulaiSelesai = jsonData[0].jam_mulai_selesai;
        const totalJamKerja = jsonData[0].total_jam_kerja;
        const supervisorName = jsonData[0].supervisor_name;

        // Define the request data
        const requestBody = {
            //'role' : jsonData.role,
            'nim_nil_nik': jsonData[0].nik,
            'password': jsonData[0].password,
        };


        // console.log("Data terkirim: ")

        // Time out request data
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out'));
        }, 5000); // 5000 (5 detik)
      });
  
      Promise.race([
        fetch('http://103.52.114.17/labornote/api/lihat_laporan/lihat_laporan.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: Object.keys(requestBody).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(requestBody[key])}`).join('&')
        }),
        timeoutPromise
      ])
        .then(response => response.text())
        .then(textData => {
          // handle response data
          console.log('Data Diterima : ')
          console.log(textData);
          // console.log(role)
          // check if textData contains "ERROR"
          if (textData.includes("Nama dan data tidak ada.")) {
            // handle error case
            //console.error("Login failed:", textData);
            Alert.alert('Pesan eror', 'Maaf, Nama dan data tidak ada. Mohon coba lagi.');
            return;
          } else if (textData.includes("SUCCESS")) {
            const dataArray = textData.split("SUCCESS");
            const jsonString = dataArray[1];
            const jsonData1 = JSON.parse(jsonString);

            // Navigate to the "Supervisor" screen with the jsonData parameter
            this.props.navigation.navigate('Supervisor', jsonData1);
            // console.log("OUTPUT DARI SERVER:")
            // console.log(jsonData[0].role);
  
            // navigation.navigate('Attendance', { jsonData });
            // console.log("DATA SESUDAH DI SPLIT:");
            // console.log(jsonString);
  
            // to json format
            // const jsonData = JSON.stringify(jsonString);
            // console.log("DATA SESUDAH PARSER:");
            // console.log(jsonData);
  
  
            // Alert.alert('Login Success', 'Welcome to LaborNote App');
          } else {
            Alert.alert('Pesan Error', 'Role, NIK/NIM/NIL atau password salah. Coba lagi.')
          }
        })
        .catch(error => {
          Alert.alert('Error Message', error.message);
          return;
        });

        
    };

    goToChat = () => {
        this.props.navigation.navigate('SupervisorChat', { jsonData: this.props.route.params.jsonData });
    };

    goToProfile = () => {
        this.props.navigation.navigate('SupervisorProfile', { jsonData: this.props.route.params.jsonData });
    };

    goToLogout = () => {
        this.props.navigation.navigate('Login');
    };
    render() {
        const { jsonData } = this.props.route.params;

        return (
            <View style={style.container}>
                <View style={style.appname}>
                    <Text style={style.labor}>Labor</Text>
                    <Text style={style.note}>Note</Text>
                </View>
                <ScrollView style={style.file}>
                    {/* <Text style={{fontSize: 50, color: 'black'}}>{jsonData[0].student_name}</Text> */}

                    <TouchableOpacity
                        style={style.studentbox}
                        onPress={this.handleViewReport}
                    >
                        <Text style={style.buttonviewreport}>View Student Labor Report</Text>
                    </TouchableOpacity>

                </ScrollView>
                <View style={style.navigation}>
                    <TouchableOpacity style={{ width: 24, marginRight: '15%', marginLeft: '15%' }} onPress={this.goToChat}>
                        <Image source={Chat} style={style.iconchat} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 24, marginRight: '15%', marginLeft: '13%', display: 'flex', alignItems: 'center' }} onPress={this.goToProfile}>
                        <Image source={Prof} style={style.iconproff} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 24, marginRight: '15%', marginLeft: '13%' }} onPress={this.goToLogout}>
                        <Image source={Logout} style={style.iconlogout} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default HomeSupervisor;

const style = StyleSheet.create({
    container: {
        backgroundColor: '#040D12',
        flex: 1,
    },
    dayname: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 16,
        marginBottom: 5,
        color: 'white',
        textDecorationLine: 'underline',
    },
    report: {
        color: 'white',
        marginTop: 10,
        marginLeft: 10,
        fontSize: 16,
        marginBottom: 5,
    },
    images_report: {
        flexDirection: 'row',
    },
    images_start_finish: {
        width: 145,
        height: 100,
        backgroundColor: 'grey',
        marginRight: 10,
        borderRadius: 10,
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
        padding: 10,
    },
    scroll_data: {
        height: 473,
    },
    buttonviewreport: {
        alignItems: 'center',
        marginBottom: 10,
        textAlign: 'center',
    },
    studentbox: {
        width: '100%',
        height: '100%',
        backgroundColor: '#343B7A',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        justifyContent: 'center',
    },
    profilestudent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    namastudent: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    navigation: {
        backgroundColor: '#040D12',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    iconabsenn: {
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
    iconproff: {
        width: 20,
        height: 20,
        marginRight: '15%',
        marginLeft: '15%',
    },
    iconlogoutt: {
        width: 20,
        height: 20,
        marginRight: '15%',
        marginLeft: '15%',
    },
    hiddenposition: {
        flexDirection: 'row',
        marginBottom: -24,
        color: 'white',
        marginTop: 10,
        height: '100%',
        justifyContent: 'space-around',
    },
    detail: {
        color: 'white',
        fontWeight: 'bold',
    },
    approve: {
        color: 'white',
        fontWeight: 'bold',
    },
})




