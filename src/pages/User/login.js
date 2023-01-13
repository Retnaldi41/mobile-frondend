import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    Alert,
    Image,
    View,
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

const Login = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');
    const [pass, onChangePassword] = useState('');

    const { login } = useContext(AuthContext);

    const simpan = async () => {
        let user = { email: email, password: pass }
        await axios.post('http://192.168.1.10:3000/users/login', user)
        .then((response) => {
            console.log(response.data)
            login(response.data)
            navigation.navigate('Home')
        })
        .catch(error => {
            console.log("gagal")
        })

    }   
    return (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={ImageHeader} style={styles.header}>                    
                    <View style={styles.hello}>
                        <Text style={styles.selamat}>Login User</Text>
                        <Text style={styles.username}>PhotoSano</Text>
                    </View>
                </ImageBackground>

                <View style={styles.layanan}>
                    <Text style={styles.label}>Login</Text>
                </View>
        
                <View style={styles.pesananAktif}>
                    <Text style={styles.titleLogin}>Email</Text>
                    <TextInput
                        style={styles.isi}
                        icon="envelope"
                        onChangeText={onChangeEmail}
                        value={email}
                    />

                    <Text style={styles.titleLogin}>Password</Text>
                    <TextInput
                        style={styles.isi}
                        onChangeText={onChangePassword}
                        value={pass}
                        secureTextEntry={true}
                    />
                                        
                    <TouchableOpacity onPress={() => simpan()}>
                        <Text>Kirim</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default Login;

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
