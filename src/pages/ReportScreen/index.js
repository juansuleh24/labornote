import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Back } from '../../assets';

class ReportScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      isApproved: false,
      isButtonDisabled: false,
      isUnapproved: false,
      studentData: [],
    };
    const jsonData = [
      ];
  }
componentDidMount() {
  const { studentData } = this.props.route.params;
  this.setState({ studentData: studentData });
  const { updatedData } = this.props.route.params;
  if (updatedData && updatedData.isApproved !== undefined) {
    this.setState({ isApproved: updatedData.isApproved });
  }
}

  handleApprove = () => {
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

    const requestData = new FormData();
    requestData.append('student_name', studentName);
    requestData.append('no_regis', noRegis); 
    requestData.append('departemen', Departemen);
    requestData.append('day', day);
    requestData.append('tanggal_kerja', tanggalKerja);
    requestData.append('gambar_mulai', gambarMulai);
    requestData.append('gambar_selesai', gambarSelesai);
    requestData.append('jam_mulai_selesai', jamMulaiSelesai);
    requestData.append('total_jam_kerja', totalJamKerja);
    requestData.append('supervisor_name', supervisorName);

    console.log("Data terkirim: ")


    fetch('http://103.52.114.17/labornote/api/supervisor_approve_laporan/handle_approve_supervisor.php', {
      method: 'POST',
      body: requestData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'approved') {
          this.setState({ isApproved: true });
          this.setState({ isButtonDisabled: true }); 
        } else {
          console.log('Error:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.setState({ isApproved: true });
  };

  handleUnapprove = () => {
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

    const requestData = new FormData();
    requestData.append('student_name', studentName);
    requestData.append('no_regis', noRegis); 
    requestData.append('departemen', Departemen);
    requestData.append('day', day);
    requestData.append('tanggal_kerja', tanggalKerja);
    requestData.append('gambar_mulai', gambarMulai);
    requestData.append('gambar_selesai', gambarSelesai);
    requestData.append('jam_mulai_selesai', jamMulaiSelesai);
    requestData.append('total_jam_kerja', totalJamKerja);
    requestData.append('supervisor_name', supervisorName);

    console.log("Data terkirim: ")


    fetch('http://103.52.114.17/labornote/api/unapprove-report/unapprove_report.php', {
      method: 'POST',
      body: requestData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'unapproved') {
          this.setState({ isUnapprove: true });
          this.setState({ isButtonDisabled: false });
        } else {
          console.log('Error:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.setState({ isUnapproved: true });
    this.setState({ isButtonDisabled: true }); 
  };

  renderListItem = ({ item }) => {
    const formattedTanggalKerja = new Date(item.tanggal_kerja).toLocaleDateString();
  
    return (
      <View style={style.listItem}>
        <Text style={style.hari}>{"Hari: " + item.day}</Text>
        <Text style={style.cellText}>{"Tanggal Kerja: " + formattedTanggalKerja}</Text>
        <ImageBackground
          style={style.image}
          source={{ uri: 'http://103.52.114.17/labornote/api/uploadGambar/image/' + item.gambar_mulai }}
          onError={() => console.log('Error loading image')}
        />
        <ImageBackground
          style={style.image}
          source={{ uri: 'http://103.52.114.17/labornote/api/uploadGambar/image/' + item.gambar_selesai }}
          onError={() => console.log('Error loading image')}
        />
  
        <Text style={style.cellText}>{"Jam Mulai Kerja Sampai Selesai: " + item.jam_mulai_selesai}</Text>
        <Text style={style.cellText}>{"Total Jam Kerja: " + item.total_jam_kerja +" Jam"+ "\n"}</Text>
      </View>
    );
  };

  render() {
    const { jsonData } = this.props.route.params;
    const { student_name, no_regis } = jsonData[0]; 
  
    return (
      <View style={style.container}>
        <View style={style.position_nav_bar}>
          <TouchableOpacity style={style.button_back} onPress={() => this.props.navigation.goBack()}>
            <Image style={style.back} source={Back} />
          </TouchableOpacity>
          <View style={style.header_title}>
            <Text style={style.title}>Detail Laporan Kerja</Text>
          </View>
        </View>
  
        <View style={style.container_celltext}>
          <Text style={style.namadanregis}>{`Nama: ${student_name}`}</Text>
          <Text style={style.namadanregis}>{`No Regis: S${no_regis}`}</Text>
        </View>
  
        <FlatList
          data={jsonData.filter((item) => item.no_regis === jsonData[0].no_regis)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderListItem}
        />
      <View style={style.header_approveandnot}>
        {this.state.isApproved ? (
          <Text style={style.approveApproved}>Approved</Text>
        ) : (
          <>
            <TouchableOpacity
              onPress={this.handleUnapprove}
              style={[style.unApproveButton, { backgroundColor: 'red', position: 'relative', top: -12 }]}
            >
              <Text style={style.unApproveText}>
                {this.state.isUnapproved ? 'Unapproved' : 'Unapprove'}
              </Text>
            </TouchableOpacity>
            {!this.state.isButtonDisabled && (
              <TouchableOpacity
                onPress={this.handleApprove}
                style={[
                  style.approveButton,
                  this.state.isButtonDisabled && { backgroundColor: 'gray' },
                ]}
                disabled={this.state.isButtonDisabled}
              >
                <Text style={style.approveText}>Approve</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
 }
} 
  
export default ReportScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  position_nav_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  button_back: {
    width: 40,
    height: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  listItem: {
    padding: 10,
  },
  back: {
    color: 'white',
  },
  header_title: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  container_celltext: {
    marginLeft: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: -65,
  },
  scroll_data: {
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10, 
    left: 10, 
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },  
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#343B7A',
    marginTop: 17,
  },
  tableCellHeader: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  hari: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  cellText: {
    color: 'white',
    marginBottom: 10,
    fontWeight: '500',
  },
  namadanregis: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  unApproveButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginTop: 32,
    marginBottom: 10,
    marginLeft: 10,
  },
  unApproveText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  approveApproved: {
    color: 'white',
    backgroundColor: 'green',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  approveButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 20,
  },
  approveText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%', 
    height: 200, 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, 
    borderRadius: 15,
  },
  imageText: {
    color: 'white',
    textAlign: 'center',
  },
  header_approveandnot: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});