import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Absen, IconHistory, Prof, Logout } from '../../assets';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
 
function Attendance({ navigation, route }) {
  const [tanggal_kerja, setTanggalKerja] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [jam_mulai_selesai, setJamMulaiSelesai] = useState('');
  const [gambar_mulai, setGambarMulai] = useState(null);
  const [gambar_selesai, setGambarSelesai] = useState(null);
  const [totalJamKerja, setTotalJamKerja] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(null);
  const [durasiMenit, setDurasiMenit] = useState('');

  const days = [
    { key: 'Senin', value: 'Senin' },
    { key: 'Selasa', value: 'Selasa' },
    { key: 'Rabu', value: 'Rabu' },
    { key: 'Kamis', value: 'Kamis' },
    { key: 'Jumat', value: 'Jumat' },
    { key: 'Sabtu', value: 'Sabtu' },
    { key: 'Minggu', value: 'Minggu' },
  ];

  const handleCategoryChange = (selectedCategory) => {
    setSelectedDay(selectedCategory);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || tanggal_kerja;
    setShowDatePicker(Platform.OS === 'ios'); 
    if (Platform.OS === 'android') {
      setTanggalKerja(currentDate);
    }
  };
  
  const { jsonData } = route.params;
  const [loading, setLoading] = useState(false);

  const openImagePicker = (imageType) => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      };
  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('Pilih gambar dibatalkan');
    } else if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const selectedImage = response.assets[0].uri;
      if (imageType === 'mulai') {
        setGambarMulai(selectedImage);
      } else if (imageType === 'selesai') {
        setGambarSelesai(selectedImage);
      }
      }
    });
  };
  
  const handleJamMulaiSelesaiChange = (text) => {
    const isValidInput = /^(\d{2}\.\d{2} - )?[\d.]*$/.test(text);
  
    if (!isValidInput) {
      Alert.alert('peringatan','format yang dapat diterapkan hanya : 09.30 - 17.00');
      return;
    }
  
    if (text.endsWith(' - ')) {
      setJamMulaiSelesai(text.slice(0, -3));
    } else if (text.includes(' -')) {
      const [jamMulai, jamSelesai] = text.split(' -');
  
      if (jamMulai && jamSelesai && jamSelesai.length === 5) {
        setJamMulaiSelesai(text);
      } else {
        setJamMulaiSelesai(text);
      }
    } else {
      if (text.length === 5) {
        const formattedText = `${text} - `;
        setJamMulaiSelesai(formattedText);
      } else {
        setJamMulaiSelesai(text);
      }
    }
  };

  const handleTotalJamKerjaChange = (text) => {
    if (/^\d*(\.\d{0,2})?$/.test(text) || text === '') {
      const totalJam = parseFloat(text);
      
      if (totalJam <= 8 || text === '') {
        setTotalJamKerja(text);
    
        // Konversi input dalam format jam ke menit
        const jamToMenit = totalJam * 60;
        setDurasiMenit(jamToMenit.toString());
      } else {
        Alert.alert('Peringatan', 'Total jam kerja tidak boleh melebihi maksimal total jam kerja/hari = 8 jam.');
      }
    } else {
      Alert.alert('Peringatan', 'Hanya dapat memasukkan angka atau desimal dengan format :        3,30 jam(tiga jam setengah) berarti anda harus mengetik : 3.5');
    }
  };

  const handleSubmit = () => {
    if (
      !selectedDay ||
      !tanggal_kerja ||
      !jam_mulai_selesai ||
      !gambar_mulai ||
      !gambar_selesai ||
      !totalJamKerja
    ) {
      Alert.alert('Peringatan', 'Harap lengkapi semua data laporan sebelum submit.');
      return;
    }

    const currentTime = new Date();
  const timeDifference = lastSubmitTime
    ? Math.abs(currentTime - lastSubmitTime) / 60000 
    : null;

  if (timeDifference !== null && timeDifference < 2) {
    Alert.alert('Peringatan', 'Anda telah mengisi data laporan hari ini.');
    setLoading(false);
    return;
  }

  // Update the lastSubmitTime with the current time
  setLastSubmitTime(currentTime);

    const requestBody = new FormData();
    setLoading(true);

    requestBody.append('student_name', jsonData[0].username);
    requestBody.append('no_regis', jsonData[0].no_regis);
    requestBody.append('departemen', jsonData[0].departemen);
    requestBody.append('day', selectedDay);
    requestBody.append('tanggal_kerja', tanggal_kerja.toISOString());
    requestBody.append('jam_mulai_selesai', jam_mulai_selesai);
    requestBody.append('total_jam_kerja', totalJamKerja);
    requestBody.append('supervisor_name', jsonData[0].supervisor_name);

    requestBody.append('gambar_mulai', {
      uri: gambar_mulai,
      type: 'image/jpg', 
      name: gambar_mulai, 
    });

    requestBody.append('gambar_selesai', {
      uri: gambar_selesai,
      type: 'image/jpg', 
      name: gambar_selesai, 
    });

    fetch('http://103.52.114.17/labornote/api/create_laporan_labor/laporan.php', {
      method: 'POST',
      body: requestBody,
    })
      .then((response) => response.text())
      .then((textData) => {
        console.log(textData);
        Alert.alert('Success', 'Laporan Kerja berhasil disubmit.');
        setSelectedDay('');
        setTanggalKerja(new Date());
        setJamMulaiSelesai('');
        setGambarMulai(null);
        setGambarSelesai(null);
        setTotalJamKerja('');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error Message', error);
        Alert.alert('Error', 'Terjadi kesalahan. Silakan coba lagi.');
        setLoading(false);
      });
  };

  return (
    <View style={style.container}>
      <View style={style.appname}>
        <Text style={style.labor}>Labor</Text>
        <Text style={style.note}>Note</Text>
      </View>
      <View style={style.file}>
        <ScrollView style={style.scrollViewContent}>
          <Text style={style.formatjudulfile}>UNIVERSITAS KLABAT</Text>
          <Text style={style.formatjudulfile}>LAPORAN JAM KERJA</Text>
          <Text style={style.formatjudulfile}>STUDENT LABOR</Text>
          {jsonData &&
            jsonData.map((item, index) => (
              <View key={index}>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 17,
                      marginRight: 5,
                    }}>
                    Nama: {item.username}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 17,
                      marginRight: 5,
                    }}>
                    No.Regis: S{item.no_regis}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 17,
                      marginRight: 5,
                    }}>
                    Dapartemen: {item.departemen}
                  </Text>
                </View>
              </View>
            ))}
          <View style={style.select}>
            <SelectList
              style={style.select}
              setSelected={handleCategoryChange}
              data={days}
              placeholder={"Hari"} 
            />
          </View>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={style.input}>
              {tanggal_kerja ? tanggal_kerja.toDateString() : 'Pilih Tanggal'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={tanggal_kerja}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <View style={{ flexDirection: 'row' }}>
            <View style={style.imageInput}>
              <TouchableOpacity onPress={() => openImagePicker('mulai')}>
                <Image
                  source={
                    gambar_mulai
                      ? { uri: gambar_mulai }
                      : require('../../assets/gambar/addimage.png')
                  }
                  style={style.gambar}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 15, marginBottom: 7, color: 'black' }}>
                Gambar Mulai Kerja
              </Text>
            </View>
            <View style={style.imageInput}>
              <TouchableOpacity onPress={() => openImagePicker('selesai')}>
                <Image
                  source={
                    gambar_selesai
                      ? { uri: gambar_selesai }
                      : require('../../assets/gambar/addimage.png')
                  }
                  style={style.gambar}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 15, marginBottom: 7, color: 'black' }}>
                Gambar Selesai Kerja
              </Text>
            </View>
          </View>
          <TextInput
            style={style.input}
            placeholder="Rentang jam kerja"
            placeholderTextColor="gray"
            value={jam_mulai_selesai}
            onChangeText={handleJamMulaiSelesaiChange}
          />
          <TextInput
            style={style.input}
            placeholder="Total Jam Kerja"
            placeholderTextColor="gray"
            value={totalJamKerja}
            onChangeText={handleTotalJamKerjaChange}
          />
           {loading ? (
            <View style={[style.container, style.horizontal]}>
              <ActivityIndicator size="large" color="#A6FF96" />
            </View>
            ) : (
              <Button title="Submit Laporan Kerja" onPress={handleSubmit} />
            )} 
          <View style={style.imagePreviewContainer}>
            {gambar_mulai && (
              <View style={style.imagePreview}>
                <Text style={style.previewText}>Gambar Mulai Kerja:</Text>
                <Image source={{ uri: gambar_mulai }} style={style.previewImage} />
              </View>
            )}
            {gambar_selesai && (
              <View style={style.imagePreview}>
                <Text style={style.previewText}>Gambar Selesai Kerja:</Text>
                <Image source={{ uri: gambar_selesai }} style={style.previewImage} />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <View style={style.navigation}>
        <View
          style={{
            width: '24%',
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={Absen} style={style.iconabsen} />
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
            navigation.navigate('History', { jsonData: jsonData })
          }>
          <Image source={IconHistory} style={style.iconhis} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '24%',
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Profile', { jsonData: jsonData })}>
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
          onPress={() => navigation.navigate('Login', { jsonData: jsonData })}>
          <Image source={Logout} style={style.iconlogout} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Attendance;


const style = StyleSheet.create({
  container: {
    backgroundColor: '#040D12',
    flex: 1,
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
  formatjudulfile: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  scrollViewContent: {
    padding: 10,
  },
  hari: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F0F0F0',
    color: 'black',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  select: {
    backgroundColor: 'gray', 
    marginBottom: 10,
    borderRadius: 10,
  },
  imageInput: {
    marginBottom: 10,
    marginRight: 30,
  },
  gambar: {
    width: 100,
    height: 100,
  },
  button: {
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
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
    marginRight: '15%',
    marginLeft: '15%',
  },
  iconhis: {
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
});