import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Absen, IconHistory,  Chat, Prof, Logo, Logout, IconDown, IconUp } from '../../assets';

class Supervisor extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      jsonData: [],
      displayedStudents: {},
    };
  }

  goToReportScreen = (item) => {
    this.props.navigation.navigate('ReportScreen', { jsonData: [item] });
  };

  goToHistory = () => {
    this.props.navigation.navigate('SupervisorHistory', { jsonData: this.props.route.params.jsonData });
  };

  goToProfile = () => {
    this.props.navigation.navigate('SupervisorProfile', { jsonData: this.props.route.params.jsonData });
  };

  goToLogout = () => {
    this.props.navigation.navigate('Login');
  };

  renderTableItem = ({ item }) => {
    console.log('Laporan student labor yang masuk:', item.student_name + ": " + item.day + ", " + item.tanggal_kerja);
    const { student_name, no_regis } = item;

    if (student_name && no_regis) {
      if (this.state.displayedStudents[student_name] === undefined) {
        this.state.displayedStudents[student_name] = true;

        return (
          <View>
            <TouchableOpacity
            style={style.studentbox}
            onPress={() => this.goToReportScreen(item)} 
          >
              <View>
                <Text style={style.namastudent}>{"FullName: " + student_name}</Text>
                <Text style={style.namastudent}>{"Regis Number: S" + no_regis}</Text>
              </View>
            </TouchableOpacity>
            
          </View>
        );
      } else {
        return null; 
      }
    } else {
      return null; 
    }
  };


  render() {
    const { jsonData } = this.props.route.params;

    return (
      <View style={style.container}>
        <View style={style.appname}>
          <Text style={style.labor}>Labor</Text>
          <Text style={style.note}>Note</Text>
        </View>
        <FlatList
          style={style.file}
          data={jsonData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderTableItem}
        />
        <View style={style.buttom_position}>
          <TouchableOpacity style={style.buttonhistory} onPress={this.goToHistory}>
             <Image source={IconHistory} style={style.iconhistory} />
          </TouchableOpacity>
        </View>
        <View style={style.navigation}>
          <View style={{ width: '30%', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={Absen} style={style.iconabsenn} />
          </View>
          <TouchableOpacity style={{ width: '30%', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={this.goToProfile}>
            <Image source={Prof} style={style.iconproff} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '30%', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={this.goToLogout}>
            <Image source={Logout} style={style.iconlogoutt} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Supervisor;

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
  buttom_position: {
    position: 'relative',
    marginTop: -60,
    marginBottom: 10,
    marginLeft: '83%',
  },
  buttonhistory: {
    height: 50,
    width: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    borderRadius: 10,
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
  studentbox: {
    width: '100%',
    backgroundColor: '#343B7A',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  student_date: {
    marginRight: 10,
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
  },
  iconhistory: {
    width: 20,
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

