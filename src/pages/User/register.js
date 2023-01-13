import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    Button,
    View,
    Alert,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    TextInput,    
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { ImageHeader, Logo } from '../../../assets/images/index';
import { WARNA_UTAMA } from '../../utils/constant';
import { Saldo, BottomNavigator, PesananAktif, Pricelist } from '../../components/';
import ButtonNav from '../../components/ButtonIcon';
import {
    IconAddSaldo,
    IconGetPoint,
    IconKiloan,
    IconPesananActive,
    IconKarpet,
    IconSatuan,
    IconVIP,
    IconSetrika,
    IconEkspress,
} from '../../../assets/icons';
import Gap from '../../components/Gap';
import { AuthContext } from '../../context/Auth.context.js';
// import { link } from '../../../assets/axios/Link';
import axios from 'axios';

const Register = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');
    const [pass, onChangePassword] = useState('');
    const [nama_user, onChangeNama] = useState('');
    const [alamat, onChangeAlamat] = useState('');
    const [telpon, onChangeTelpon] = useState('');

    const { login } = useContext(AuthContext);

    const simpan = async () => {
        let user = { email: email, password: pass, nama_user: nama_user, alamat_user: alamat, telpon_user: telpon }
        await axios.post('http://192.168.1.10:3000/users/tambah', user)
        .then((response) => {
            Alert.alert(
                'Peringatan!',
                'Apakah anda yakin untuk mendaftarkan akun ini ?',
                [
                  {
                    text: 'Iya', onPress: () => metu()
                  },
                  { text: 'Tidak', onPress: () => console.log('No button clicked'), style: 'cancel' },
                ],
                {
                  cancelable: true
                }
              );
            console.log(response.data)
            login(response.data)            
        })
        .catch(error => {
            console.log("gagal")
        })

    }
    
    async function metu() {       
        navigation.navigate('Login')
      }
    
      function keluar() {
        Alert.alert(
          'Peringatan!',
          'Apakah anda yakin untuk mendaftarkan akun ini ?',
          [
            {
              text: 'Iya', onPress: () => metu()
            },
            { text: 'Tidak', onPress: () => console.log('No button clicked'), style: 'cancel' },
          ],
          {
            cancelable: true
          }
        );
      }
    return (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={ImageHeader} style={styles.header}>                    
                    <View style={styles.hello}>
                        <Text style={styles.selamat}>Login Registrasi</Text>
                        <Text style={styles.username}>PhotoSano</Text>
                    </View>
                </ImageBackground>

                <View style={styles.layanan}>
                    <Text style={styles.label}>Registrasi</Text>
                </View>

                <View style={styles.pesananAktif}>
                    <Text style={styles.titleLogin}>Email</Text>
                    <TextInput
                        style={styles.isi}
                        onChangeText={onChangeEmail}
                        value={email}
                    />

                    <Text style={styles.titleLogin}>Password</Text>
                    <TextInput
                        style={styles.isi}
                        onChangeText={onChangePassword}
                        value={pass}
                    />
                    <Text style={styles.titleLogin}>Nama User</Text>
                    <TextInput
                        style={styles.isi}
                        onChangeText={onChangeNama}
                        value={nama_user}

                    />
                    <Text style={styles.titleLogin}>Alamat User</Text>
                    <TextInput
                        style={styles.isi}
                        onChangeText={onChangeAlamat}
                        value={alamat}
                    />
                    <Text style={styles.titleLogin}>No. Telepon User</Text>
                    <TextInput
                        style={styles.isi}
                        onChangeText={onChangeTelpon}
                        value={telpon}
                    />

                    <Button
                        title="Kirim"
                        // {Alert.alert('Simple Button pressed')}
                        onPress={() => simpan()}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Register;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        backgroundColor: 'white',
        padding: 17,
        marginHorizontal: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginTop: -windowHeight * 0.07,
        flexDirection: 'row',
    },
    container2: {
        padding: 17,
        backgroundColor: 'white',
        marginHorizontal: 30,
        flexDirection: 'row',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginVertical: windowHeight * 0.02,
        alignItems: 'center'
    },
    header: {
        width: windowWidth,
        height: windowHeight * 0.3,
        paddingHorizontal: 30,
        paddingTop: 10,
    },
    logo: {
        width: windowWidth * 0.10,
        height: windowHeight * 0.04,
    },
    isi: {
        padding: 11,
        backgroundColor: 'white',
        marginHorizontal: -5,
        flexDirection: 'row',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginVertical: windowHeight * 0.01,
        alignItems: 'center'
    },
    hello: {
        marginTop: windowHeight * 0.03,
    },
    selamat: {
        fontSize: 24,
        fontFamily: 'TitilliumWeb-Regular',
    },
    username: {
        fontSize: 22,
        fontFamily: 'TitilliumWeb-Bold',
    },
    layanan: {
        paddingLeft: 30,
        paddingTop: 15,
    },
    label: {
        fontSize: 18,
        fontFamily: 'TitilliumWeb-Bold',
        textAlign: 'center',
    },
    iconLayanan: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        flexWrap: 'wrap',
    },
    pesananAktif: {
        paddingTop: 10,
        paddingHorizontal: 30,
        flex: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text2: {
        marginLeft: windowWidth * 0.02,
    },
    title: {
        fontSize: 18,
        fontFamily: 'TitilliumWeb-SemiBold'
    },
    titleLogin: {
        fontSize: 14,
        fontFamily: 'TitilliumWeb-Regular',
    },
    valueSaldo: {
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Bold',
    },
    buttonAksi: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    informasiSaldo: {
        width: '60%',
    },
});
