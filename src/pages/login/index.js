import { View, Text, StyleSheet, Image, Alert, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { Logo, Ground, Groundunklab, Logounklab, Labornote } from '../../assets'
import { Input, Button, Dropdown } from '../../components/atoms'

export default function Login({ navigation }) {
  const [nim_nil_nik, setNim_nil_nik] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [isStudent, setIsStudent] = useState(true); 

  const roles = [
    { key: 'student', value: 'Student' },
    { key: 'supervisor', value: 'Supervisor' },
    //{ key: 'student_finance', value: 'Student Finance'},
  ]

  // Callback yang akan dijalankan saat dropdown dipilih
  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole)
    setIsStudent(selectedRole === 'student');
  }

  const handleLogin = () => {
    // check if role, email and password are not empty or only spaces
    // console.log(role)
    // console.log(nim_nil_nik)
    // console.log(password)
    if (!nim_nil_nik.trim() && !role.trim() && !password.trim()) {
      Alert.alert('Pesan Eror', 'Tidak ada input Role, NIM/NIL atau password. Mohon di isi.');
      return;
    }

    if (!nim_nil_nik.trim()) {
      Alert.alert('Pesan Eror', 'Input NIM/NIL tidak ada. Mohon di isi.');
      return;
    }
    //console.log("Nilai Role:", role);
    //console.log("Nilai NIM:", nim);
    // console.log("Nilai Password:", password);
    // if (!role || !role.trim()) {
    //   Alert.alert('Pesan Eror', 'Input Role tidak ada. Mohon di isi.');
    //   return;
    // }

    if (!password.trim()) {
      Alert.alert('Pesan Eror', 'Input Password tidak ada. Mohon di isi.');
      return;
    }

    // create request body with email and password input values
    const requestBody = {
      'nim_nil_nik': nim_nil_nik, // Kirim nim ke server
      'role': role, // Kirim role ke server
      'password': password, // Kirim password ke server
    };

    // Time out request data
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out'));
      }, 5000); // 5000 (5 detik)
    });

    Promise.race([
      fetch('http://103.52.114.17/labornote/api/user_login/handle_login.php', {
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
        console.log('Data Login Terkirim : ')
        console.log(textData);
        // console.log(role)
        // check if textData contains "ERROR"
        if (textData.includes("ERROR")) {
          // handle error case
          //console.error("Login failed:", textData);
          Alert.alert('Pesan eror', 'Maaf, login gagal. Mohon coba lagi.');
          return;
        } else if (textData.includes("SUCCESS LOGIN")) {
          const dataArray = textData.split("SUCCESS LOGIN");
          const jsonString = dataArray[1];
          const jsonData = JSON.parse(jsonString);
          // console.log("OUTPUT DARI SERVER:")
          // console.log(jsonData[0].role);

          // Periksa role di sini
          if (jsonData[0].role === "student") {
            navigation.navigate('Attendance', { jsonData }); // Gantilah 'StudentScreen' dengan nama layar untuk mahasiswa.
          } else if (jsonData[0].role === "supervisor") {
            navigation.navigate('Supervisor', { jsonData }); // Gantilah 'DosenScreen' dengan nama layar untuk dosen.
          } else if (jsonData[0].role === "student_finance") {
            navigation.navigate('FinanceHome', { jsonData});
          }else {
            Alert.alert('Pesan Error', 'Role tidak valid.'); // Handle peran yang tidak valid.
          }

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

  return (
    <ImageBackground source={Groundunklab} style={style.container}>
      <View style={style.appname}>
        <Image source={Logo} style={style.logoapp}/>
        <Text style={style.labor}>labor</Text>
        <Text style={style.note}>note</Text>
      </View>
      <View style={style.text}>
        <Image source={Logounklab} style={style.logo}></Image>

        <Text style={style.unklab}>Universitas Klabat</Text>
        <View style={style.form}>
          <View style={style.text_status}>
            <Text>Student | Supervisor</Text>
          </View>
          <View style={style.container1}>
            <View style={style.inputcontainer1}>
              <SelectList
                setSelected={handleRoleChange}
                data={roles}
                placeholder={"Status"}
                style={style.textinput1}
              />
            </View>
            {/* <Text>Category Selected: {role}</Text> */}
          </View>
          {isStudent ? (
          <Input
            placeholder="NIM/NIL"
            placeholderTextColor="grey"
            value={nim_nil_nik}
            onChangeText={(text) => setNim_nil_nik(text)}
          />
          ) : (
            <Input
              placeholder="NIK"
              placeholderTextColor="grey"
              value={nim_nil_nik} // Anda mungkin perlu mengganti variabel ini menjadi yang sesuai dengan NIK
              onChangeText={(text) => setNim_nil_nik(text)} // Dan juga callback-nya
            />
          )}
          <Input
            placeholder="Password"
            password
            placeholderTextColor="grey"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button
            label="continue"
            onPress={handleLogin}
          />
        </View>
      </View>
    </ImageBackground>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
  },
  container1: { marginBottom: 10, alignItems: 'center' },
  inputcontainer1: {
      paddingHorizontal: 0, 
      borderRadius: 10,
      width: 280,
      backgroundColor: 'black',
      marginBottom: 15,
  },
  textinput1: { marginLeft: 10, flex: 1 },
  logoapp: {
    width: 50,
    height: 50,
    marginBottom: -100,
    marginTop: -10,
    marginRight: -15,
  },
  logo: {
    // width: '20%',
    // height: '20%',
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appname: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginBottom: 80,
    marginTop: -100,
  },
  labor: {
    color: '#B90059',
    fontSize: 20,
    marginLeft: 5,
  },
  note: {
    color: '#4254F6',
    fontSize: 20,
  },
  unklab: {
    marginBottom: 40,
    fontSize: 25,
    fontStyle: 'italic',
  },
  text_status: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10, 
    borderRadius: 15,
  },
})