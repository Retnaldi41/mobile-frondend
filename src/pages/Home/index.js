import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { ImageHeader, Logo, Wedding, Group, Potrait, Cosplay, Studio } from '../../../assets/images/index';
import { WARNA_UTAMA } from '../../utils/constant';
import { Saldo, BottomNavigator, PesananAktif, Pricelist } from '../../components/';
import ButtonNav from '../../components/ButtonIcon';
import { IconSatuan } from '../../../assets/icons';
import Gap from '../../components/Gap';
import {
  IconAddSaldo,
  IconGetPoint,
} from '../../../assets/icons';
import { AuthContext } from '../../context/Auth.context.js';
// import { link } from '../../../assets/axios/Link';
import axios from 'axios';


const Home = ({ navigation }) => {
  const [wed, setWedding] = useState([]);
  const [cos, setCosplay] = useState([]);
  const [nama, setName] = useState('');
  const [bok, setBooking] = useState([]);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    getBooking(); // eslint-disable-next-line
  }, []);

  async function cosplay() {
    navigation.navigate('CosplayR');
  }

  async function wedding() {
    navigation.navigate('Wedding');
  }

  async function potrait() {
    navigation.navigate('Potrait');
  }

  async function studio() {
    navigation.navigate('Studio');
  }

  async function group() {
    navigation.navigate('Group');
  }

  async function pesanan() {
    navigation.navigate('Pesanan');
  }

  async function getBooking() {
    await axios.get('http://192.168.1.10:3000/booking/' + user.id_user)
      .then((response) => {
        console.log("berhasil")
        setBooking(response.data);
      })
  }

  async function metu() {
    logout()
    navigation.navigate('Login')
  }

  function keluar() {
    Alert.alert(
      'Peringatan!',
      'Apakah anda yakin untuk keluar ?',
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

  let no = 1;
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={ImageHeader} style={styles.header}>
          <Pressable style={styles.button1} onPress={() => keluar()}>
            <Text style={styles.button}>Keluar</Text>
          </Pressable>

          <View style={styles.hello}>
            <Text style={styles.selamat}> Selamat Datang</Text>
            <Text style={styles.username}>{user.nama_user}  </Text>
          </View>
        </ImageBackground>

        <View style={styles.container}>
          {/* <TouchableOpacity onPress={() => pesanan()}> */}
            <View style={styles.informasiSaldo}>
              <View style={styles.text}>
                <Text style={styles.labelSaldo1}  onPress={() => pesanan()}>Pesanan anda</Text>               
              </View>
            </View>
            <View style={styles.buttonAksi}>
              <Gap width={10} />
              <SvgXml width="40" height="30" xml={IconGetPoint} />
            </View>
          {/* </TouchableOpacity> */}
        </View>

        <View style={styles.layanan}>
          <Text style={styles.label}>Kategori : </Text>
        </View>
        <View style={styles.listLayanan}>
          <TouchableOpacity style={styles.container3} onPress={() => cosplay()}>
            <Image source={Cosplay} style={styles.ico} />
            <View style={styles.text}>
              <Text style={styles.labelSaldo}>Cosplay</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container3} onPress={() => wedding()}>
            <Image source={Wedding} style={styles.ico} />
            <View style={styles.text}>
              <Text style={styles.labelSaldo}>Wedding</Text>
            </View>
          </TouchableOpacity>

        </View>

        <View style={styles.listLayanan}>
          <TouchableOpacity style={styles.container3}>
            <SvgXml width="50" height="30" xml={IconSatuan} />
            <View style={styles.text}>
              <Text style={styles.labelSaldo}>Komersial</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container3} onPress={() => group()}>
            <Image source={Group} style={styles.ico} />
            <View style={styles.text}>
              <Text style={styles.labelSaldo}>Grup</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.listLayanan}>
          <TouchableOpacity style={styles.container3} onPress={() => potrait()}>
            <Image source={Potrait} style={styles.ico} />
            <View style={styles.text}>
              <Text style={styles.labelSaldo}>Potrait</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container3} onPress={() => studio()}>
            <Image source={Studio} style={styles.ico} />
            <View style={styles.text}>
              <Text style={styles.labelSaldo}>Studio</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.pesananAktif}>
          <Text style={styles.label}>Kategori Terlaris : </Text>
          <Pricelist />
        </View>
      </ScrollView>
    </View>
  )
}

export default Home;

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
  container3: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 5,
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
  ico: {
    width: 30,
    height: 30,
    marginLeft: 9,
    marginRight: 9
  },
  oke: {
    width: 100,
    height: 100,
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
  listLayanan: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 15,
  },
  label: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Bold',
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
  labelSaldo: {
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
    width: '100%',
  },
  labelSaldo1: {
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
  },
});
