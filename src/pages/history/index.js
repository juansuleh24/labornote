import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import {Absen, IconHistory, Prof, Logout, LogoHistory } from '../../assets';

class History extends Component {
  constructor(props) {
    super(props);
    const {jsonData} = this.props.route.params;
    var json_data_history;

    this.state = {
      jsonData: jsonData,
    };

    const requestBody = {
      'no_regis': jsonData[0].no_regis,
      'student_name': jsonData[0].username,
    };

    
    const fetchPromise = fetch(
      'http://103.52.114.17/labornote/api/history_report/history_report.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Object.keys(requestBody)
          .map(
            key =>
              `${encodeURIComponent(key)}=${encodeURIComponent(
                requestBody[key],
              )}`,
          )
          .join('&'),
      },
    )
    .then(response => response.text())
    .then(textData => {
      console.log(textData);

      
      if (textData.includes('ERROR')) {
        Alert.alert(
          'Error Message',
          'Sorry, access data class failed. Please try again.',
        );
        return;
      } else if (textData.includes('EMPTY ROW')) {
        Alert.alert(
          'Empty Record',
          'Sorry, there is no class you have registered.',
        );
        return;
      } else {
        const history = textData; 
        const json_data_history = JSON.parse(history);
        console.log('DATA HISTORY:');
        console.log(json_data_history[0]);
        this.setState({json_data_history: json_data_history});
      }
    })
    .catch(error => {
      console.error('Error:', error); 
      Alert.alert(
        'Error Message',
        `Sorry, we encountered an error. Please try again. Error: ${error.message}`,
      );
      return;
    });

  const timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out'));
    }, 5000); 
  });

  Promise.race([fetchPromise, timeout]).catch(error => {
    if (error.message === 'Request timed out') {
      Alert.alert(
        'Error Message',
        'Sorry, the request has timed out. Please try again.',
      );
    } else {
      Alert.alert(
        'Error Message',
        'Sorry, we have got an error. Please try again.',
      );
    }
  });
  }

  navigationToAttandent = () => {
    this.props.navigation.navigate('Attendance', { jsonData: this.props.route.params.jsonData });
  }

  navigationToProfile = () => {
    this.props.navigation.navigate('Profile', { jsonData: this.props.route.params.jsonData });
  }

  navigationToLogout = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    const { json_data_history } = this.state;
    console.log('History:')
    console.log(json_data_history)
    
    return (
      <View style={style.container}>
        <View style={style.appname}>
          <Text style={style.labor}>Labor</Text>
          <Text style={style.note}>Note</Text>
        </View>
        <ScrollView style={style.file}>
          <View>
            <Text style={style.history}>HISTORY LAPORAN KERJA</Text>
            </View>
          {json_data_history && json_data_history.length > 0 ? (
            json_data_history.map((item, index) => (
              <View key={index} style={style.box_history}>
                {item.map((data, dataIndex) => (
                  <View key={dataIndex}>
                    <View style={style.position_logo_history}>
                      <Image source={LogoHistory} />
                      <Text style={style.history_day}>{data.day}</Text>
                    </View>
                    <Text style={style.history_data_terkirim}>Tanggal Kerja: {data.day + ", " + new Date(data.tanggal_kerja).toLocaleDateString('id-ID')}</Text>
                    <Text style={style.history_data_terkirim}>Total Jam Kerja: {data.total_jam_kerja + " jam"}</Text>
                    <View style={style.header_status}>
                      <Text style={style.history_data_terkirim}>Status Laporan:</Text>
                      <Text style={data.report_status === 'Unapproved' ? style.unapproved : style.approved}>
                        {data.report_status}
                      </Text>
                    </View>
                    <Text>{"\n"}</Text>
                  </View>
                ))}
              </View>
            ))
          ) : (
            <Text style={style.history_data_terkirim}>History Laporan Kosong</Text>
          )}
        </ScrollView>
        <View style={style.navigation}>
        <TouchableOpacity
          style={{
            width: '24%',
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() =>
            this.navigationToAttandent(this.props.navigation)
          }
        >
          <Image source={Absen} style={style.iconabsen} />
        </TouchableOpacity>
        <View
          style={{
            width: '24%',
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() =>
            navigation.navigate('History', {jsonData: jsonData})
          }>
          <Image source={IconHistory} style={style.iconhis} />
        </View>
        <TouchableOpacity
          style={{
            width: '24%',
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() =>
            this.navigationToProfile(this.props.navigation)
          }
          >
          <Image source={Prof} style={style.iconprof} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '24%',
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() =>
            this.navigationToLogout(this.props.navigation)
          }
          >
          <Image source={Logout} style={style.iconlogout} />
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040D12',
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
  history: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
  },
  file: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 15,
    padding: 20,
  },
  box_history: {
    borderWidth: 1,
    borderColor: '#000', 
    borderRadius: 5,
    padding: 10,
    marginBottom: 5, 
  },
  position_logo_history: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  history_day: {
    color: 'black',
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  history_data_terkirim: {
    color: 'black',
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  header_status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  approved: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 15,
  },
  unapproved: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
  info_detail_history: {
    color: 'black',
    marginLeft: 10,
  },
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
  },
  iconhis: {
    width: 20,
    height: 20,
  },
  iconprof: {
    width: 20,
    height: 20,
  },
  iconlogout: {
    width: 20,
    height: 20,
  },
});

export default History;
