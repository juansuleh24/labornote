import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LogoHistory, Handback, Imagebg} from '../../assets';

class SupervisorHistory extends Component {
  constructor(props) {
    super(props);
    const {jsonData} = this.props.route.params;
    var json_data_history;
    this.state = {
      jsonData: jsonData,
    };
    const requestBody = {
      'student_name': jsonData[0].student_name,
      'supervisor_name': jsonData[0].supervisor_name,
    };
    const fetchPromise = fetch(
      'http://103.52.114.17/labornote/api/history_report/supervisor_view_history.php',
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

  navigationToAttendant = () => {
    this.props.navigation.goBack();
    const { jsonData } = this.state;
    if (jsonData && jsonData.length > 0) {
      this.setState({ jsonData: jsonData[0] });
    }
  };
  
  render() {
    const { json_data_history } = this.state;
    console.log('History:')
    console.log(json_data_history)
    
    return (
      <View style={style.container}>
        <View style={style.appname}>
          <Text>History</Text>
          <Text> Laporan</Text>
          <Text> Laporan</Text>
        </View>
        <ScrollView style={style.file}>
          {json_data_history && json_data_history.length > 0 ? (
            json_data_history.map((item, index) => (
              <View key={index} style={style.box_history}>
                {item.map((data, dataIndex) => (
                  <View key={dataIndex}>
                    <View style={style.position_header_history}>
                      <Image source={LogoHistory} />
                      <Text style={style.history_day}>{data.student_name}</Text>
                    </View>
                    <Text style={style.history_data_terkirim}>No Regis: S{data.no_regis}</Text>
                    <Text style={style.history_data_terkirim}>Hari/Tanggal Kerja: {data.day + ", " + new Date(data.tanggal_kerja).toLocaleDateString('id-ID')}</Text>
                    <Text style={style.history_data_terkirim}>Total Jam Kerja: {data.total_jam_kerja + " jam" + "\n"}</Text>
                  </View>
                ))}
              </View>
            ))
          ) : (
            <Text style={style.history_data_terkirim}>History Laporan Kosong</Text>
          )}
        </ScrollView>
        <View style={style.navigation}>
          <Image style={style.gambar} source={Imagebg} />
          <TouchableOpacity style={style.button_back} onPress={this.navigationToAttendant}>
            <Image source={Handback} style={style.iconhandback} />
          </TouchableOpacity>
        </View>
    </View>
    );
  }
}

export default SupervisorHistory;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040D12',
  },
  appname: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    padding: 20,
  },
  box_history: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    
  },
  position_header_history: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  history_day: {
    color: 'black',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
    fontWeight: 'bold',
  },
  history_data_terkirim: {
    color: 'black',
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  approved: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 2,
  },
  info_detail_history: {
    color: 'black',
    marginLeft: 10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -50,
    marginBottom: 10,
  },
  gambar: {
    width: 70,
    height: 45,
    borderRadius: 50,
  },
  button_back: {
    width: 70,
    height: 45,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -70,
  },
  iconhandback: {
    width: 30,
    height: 20,
  },
  iconButton: {
    width: 35,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8%',
    marginLeft: '8%',
  },
});
