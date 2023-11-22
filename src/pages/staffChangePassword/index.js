import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Back, Imagebg } from '../../assets';

const SupervisorChangePassword = ({ navigation, route }) => {
  const { jsonData } = route.params;

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setOldPass('');
      setNewPass('');
      setConfirmNewPass('');
    }, [])
  );

  const handleChangePassword = () => {
    if (!oldPass.trim() || !newPass.trim() || !confirmNewPass.trim()) {
      Alert.alert(
        'Error Message',
        'Input fields cannot be empty or contain only spaces.'
      );
      return;
    }

    if (newPass !== confirmNewPass) {
      Alert.alert(
        'Error Message',
        'New password and confirm password must match.'
      );
      return;
    }

    const requestBody = {
      'nim_nil_nik': jsonData[0].nik,
      'oldPass': oldPass,
      'newPass': newPass,
    };

    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out.'));
      }, 5000);
    });

    Promise.race([
      fetch('http://103.52.114.17/labornote/api/changePassword/change_password.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Object.keys(requestBody)
          .map(
            key =>
              `${encodeURIComponent(key)}=${encodeURIComponent(
                requestBody[key]
              )}`
          )
          .join('&'),
      }),
      timeoutPromise,
    ])
      .then(response => response.text())
      .then(textData => {
        console.log(textData);

        if (textData.includes('ERROR')) {
          Alert.alert(
            'Error Message',
            'Sorry, change password failed. Please try again.'
          );
          return;
        }

        if (textData.includes('INCORRECT')) {
          Alert.alert(
            'Error Message',
            'Sorry, you put an incorrect old password. Please try again.'
          );
          return;
        }

        if (textData.includes('SUCCESS')) {
          Alert.alert(
            'Success',
            'Password berhasil diubah. Mohon login dengan password baru anda.'
          );
          navigation.navigate('SupervisorProfile');
        }
      })
      .catch(error => {
        Alert.alert('Error Message', error.message);
        return;
      });
  };

  const backToProfile = () => {
    navigation.navigate('SupervisorProfile', { jsonData });
  };

  return (
    <View style={style.header_container}>
      <View style={style.appname}>
        <Text style={style.labor}>Labor</Text>
        <Text style={style.note}>Note</Text>
      </View>
      <View style={style.container}>
        <Text style={style.title}>Ubah Password</Text>
        <TextInput
          style={style.input}
          placeholder="Password Lama"
          placeholderTextColor={'#666666'}
          secureTextEntry
          value={oldPass}
          onChangeText={setOldPass}
        />
        <TextInput
          style={style.input}
          placeholder="Password Baru"
          placeholderTextColor={'#666666'}
          secureTextEntry
          value={newPass}
          onChangeText={setNewPass}
        />
        <TextInput
          style={style.input}
          placeholder="Konfirmasi Password Baru"
          placeholderTextColor={'#666666'}
          secureTextEntry
          value={confirmNewPass}
          onChangeText={setConfirmNewPass}
        />
        <View style={style.button_header}>
          <Image style={style.button} source={Imagebg} />
          <TouchableOpacity style={style.touch} onPress={handleChangePassword}>
            <Text style={style.buttonText}>Ubah Password</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={style.buttonback} onPress={backToProfile}>
        <Image source={Back} />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  header_container: {
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  input: {
    width: '80%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    marginBottom: 20,
    fontSize: 16,
  },
  button_header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: '50%',
    backgroundColor: 'blue',
    // padding: 15,
    height: 50,
    // alignItems: 'center',
    borderRadius: 8,
    marginTop: 30,
  },
  touch: {
    // backgroundColor: 'black',
    width: '50%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -180,
    marginBottom: -30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonback: {
    width: 30,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
    marginBottom: 30,
    marginLeft: 10,
  },
});

export default SupervisorChangePassword;
