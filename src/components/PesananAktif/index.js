import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput, Button, Clipboard, Pressable, Alert } from 'react-native';
import { WARNA_UTAMA } from '../../utils/constant';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { AuthContext } from '../../context/Auth.context.js';
import Gap from '../Gap';
import { ImageHeader, Logo, Wedding, Gopay, Cosplay, Studio, Bri, Bca, Dana, Shoppe, Rekening_tf } from '../../../assets/images/index';
import axios from 'axios';
import link from '../../../assets/axios/Link'
import { BookingContext } from '../../context/BookingContext';
import { launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-modern-datepicker';
import { Divider } from 'react-native-paper';

const Pricelist = ({ navigation }) => {
  const [bok, setBooking] = useState([]);
  const [hargaBooking, setHargaBooking] = useState([]);
  const [als, onChangeAlasan] = useState('');
  const { user, logout } = useContext(AuthContext);
  const [selectedFoto, setSelectedFoto] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [tgl, onChangeTgl] = useState('');
  // const { booking } = useContext(BookingContext)
  const [photo, setPhoto] = React.useState(null);
  const [photoShow, setPhotoShow] = React.useState(null);
  const [copiedText, setCopiedText] = useState('')
  const [uploadIdBooking, setUploadIdBooking] = useState('')
  const [uploadBuktiTransfer, setUploadBuktiTransfer] = useState('')

  useEffect(() => {
    getBooking(); // eslint-disable-next-line
  }, []);

  async function getBooking() {
    await axios.get('http://192.168.1.10:3000/booking/' + user.id_user)
      .then((response) => {
        console.log("berhasil")
        setBooking(response.data);
        getBookingWithHarga(response.data)
      })
  }

  async function getHarga(jenis_booking, id_item) {
    let tabel =
      jenis_booking === 'Cosplay' ? 'cosplay' :
        jenis_booking === 'Wedding' ? 'wedding' :
          jenis_booking === 'Studio' ? 'studio' :
            jenis_booking === 'Potrait' ? 'potrait' :
              jenis_booking === 'Group' ? 'group' :
                jenis_booking === 'Komersial' ? 'komersial' : ''

    const res = await axios.get('http://192.168.1.10:3000/' + tabel + '/' + id_item)
    return res.data
  }

  async function getBookingWithHarga(booking) {
    const withDetail = await Promise.all(booking.map(bp => getHarga(bp.jenis_booking, bp.id_item)))
    setHargaBooking(withDetail)
  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString()
    setCopiedText(text)
  }

  async function uploadTF(id_booking) {
    let result = await launchImageLibrary({ mediaType: 'photo' });
    setSelectedFoto({ ...result.assets[0], id_booking })
    console.log(result.assets[0])

    if (result.cancelled) {
      return;
    }
    let formData = new FormData();
    formData.append('bukti_transfer', {
      uri: result.assets[0].uri,
      name: result.assets[0].fileName,
      type: result.assets[0].type
    });
    formData.append('Content-Type', result.assets[0].type);
    const firstRespon = await axios.post('https://sihaq.com/photosano/bukti_transfer/upload.php', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    setUploadBuktiTransfer(firstRespon.data.nama)
    setUploadIdBooking(id_booking)
  }

  async function simpanTf() {
    Alert.alert(
      'Peringatan!',
      'Apakah anda yakin untuk upload bukti transfer ini ?',
      [
        {
          text: 'Iya', onPress: () => masuk()
        },
        { text: 'Tidak', onPress: () => console.log('No button clicked'), style: 'cancel' },
      ],
      {
        cancelable: true
      }
    );
  }

  async function masuk() {
    {
      let ubah = {
        bukti_transfer: uploadBuktiTransfer,
        id_booking: uploadIdBooking,
      }
      console.log(ubah)
      await axios.put('http://192.168.1.10:3000/booking/transfer', ubah)
        .then((response) => {
          console.log("berhasil")
          getBooking()
        })
    }
  }

  async function Rescheduling(id) {
    {
      let ubah = {
        tanggal_booking: selectedDate,
        status: 7,
        id_booking: id,
      }
      await axios.put('http://192.168.1.10:3000/booking/rescheduling', ubah)
        .then((response) => {
          console.log("berhasil")
          getBooking()
        })
    }
  }

  async function btl(id) {
    Alert.alert(
      'Peringatan!',
      'Apakah anda yakin untuk membatalkan pesanan anda ?',
      [
        {
          text: 'Iya', onPress: () => Pembatalan(id)
        },
        { text: 'Tidak', onPress: () => console.log('No button clicked'), style: 'cancel' },
      ],
      {
        cancelable: true
      }
    );
  }

  async function Pembatalan(id) {
    {
      let ubah = {
        status: 10,
        id_booking: id,
        alasan: als,
      }
      await axios.put('http://192.168.1.10:3000/booking/pembatalan', ubah)
        .then((response) => {
          console.log("berhasil")
          onChangeAlasan('')
        })
    } r
  }
  let no = 1;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Button
        style={styles.button}
        title="Refresh"
        // {Alert.alert('Simple Button pressed')}
        onPress={() => getBooking()}
      /> */}
        <Pressable style={styles.button1} onPress={() => getBooking()}>
          <Text style={styles.button}>Refresh</Text>
        </Pressable>
        {bok.map((bok, index) => (
          <View key={index}>
            <View style={styles.container}>
              <View style={styles.informasiSaldo}>
                <View style={styles.text}>
                  <Text style={styles.valueSaldo}>{bok.jenis_booking}</Text>
                </View>
                <View style={styles.text}>
                  {/* <Text style={styles.valuePoint}>Id Item : {bok.id_item}</Text> */}
                  <Text style={styles.valuePoint}>Jenis Booking : {bok.jenis_booking}</Text>
                  <Text style={styles.valuePoint}>Tanggal Booking</Text>
                  <Text style={{ fontFamily: 'TitilliumWeb-Regular' }}>{bok.tanggal_booking}</Text>
                  <Text style={styles.valuePoint}>No. Rekening</Text>
                  <Divider />
                  <Divider />
                  <Divider />
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.valuePoint}>BRI</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Image source={Bri} style={styles.valuePoint666} />
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => Clipboard.setString('371601020962533')}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.noRek}>
                        371601020962533
                      </Text>
                      <Text style={{ fontSize: 14, fontFamily: 'TitilliumWeb-Regular', fontStyle: 'bold', flex: 1, textAlign: 'center' }}>
                        Salin
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row', paddingTop: '1%' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.valuePoint}>Shoppe</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Image source={Shoppe} style={styles.valuePoint666} />
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => Clipboard.setString('081233424503')}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.noRek}>
                        081233424503
                      </Text>
                      <Text style={{ fontSize: 14, fontFamily: 'TitilliumWeb-Regular', fontStyle: 'bold', flex: 1, textAlign: 'center' }}>
                        Salin
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.valuePoint}>Gopay</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Image source={Gopay} style={styles.valuePoint666} />
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => Clipboard.setString('081233424503')}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.noRek}>
                        081233424503
                      </Text>
                      <Text style={{ fontSize: 14, fontFamily: 'TitilliumWeb-Regular', fontStyle: 'bold', flex: 1, textAlign: 'center' }}>
                        Salin
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.valuePoint}>Dana</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Image source={Dana} style={styles.valuePoint666} />
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => Clipboard.setString('089688293611')}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.noRek}>
                        089688293611
                      </Text>
                      <Text style={{ fontSize: 14, fontFamily: 'TitilliumWeb-Regular', fontStyle: 'bold', flex: 1, textAlign: 'center' }}>
                        Salin
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <Text style={styles.valuePoint}>Total Pembayaran :</Text>
                  <Text style={styles.hargaST}>Rp. {hargaBooking[index]?.map((value) => value.harga)}</Text>

                  <Text style={styles.valuePoint}>Kirim Bukti Transfer : </Text>
                  {
                    selectedFoto && selectedFoto.id_booking == bok.id_booking && <Image
                      style={{ width: 100, height: 200, marginBottom: 5, alignSelf: 'center' }}
                      source={{ uri: selectedFoto.uri }}
                    ></Image>
                  }
                  <Button
                    title="Chose File"
                    onPress={() => uploadTF(bok.id_booking)}
                  ></Button>
                  <Pressable style={styles.button3} onPress={() => simpanTf()}>
                    <Text style={styles.button}>Upload</Text>
                  </Pressable>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: 'TitilliumWeb-Bold',
                    fontStyle: 'italic',
                    textAlign: 'justify',
                  }}>*Pesanan akan otomatis dibatalkan sistem apabila dalam 1x24 jam tidak terdapat unggahan bukti transfer setelah pesanan disetujui admin.</Text>
                  <Text style={styles.valuePoint}>Rescheduling :</Text>
                  <DatePicker
                    style={styles.informasiSaldo}
                    onSelectedChange={tgl => setSelectedDate(tgl)}
                  />
                  <Text style={styles.text}>Tgl : {selectedDate}</Text>
                  <View style={styles.tombol}>
                    <Pressable style={styles.button4} onPress={() => Rescheduling(bok.id_booking)}>
                      <Text style={styles.button}>Simpan Rescheduling</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.valuePoint}>Pembatalan : </Text>
                  <TextInput
                    style={styles.isiAls}
                    onChangeText={onChangeAlasan}
                    value={als}
                  />
                  <View style={styles.tombol}>
                    <Pressable style={styles.button4} onPress={() => btl(bok.id_booking)}>
                      <Text style={styles.button}>Ajukan Pembatalan</Text>
                    </Pressable>
                  </View>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: 'TitilliumWeb-Bold',
                    fontStyle: 'italic',
                    color: 'red',
                    textAlign: 'justify',
                  }}>*Fitur Rescheduling dan Pembatalan bisa digunakan sebelum H-3 dari tanggal yang di booking.</Text>
                  <Text style={{ textAlign: 'center', fontFamily: 'TitilliumWeb-Regular' }}>Status : </Text>
                  <Text style={styles.textStatus}>
                    {bok.status === 1 ?
                      <Text style={{
                        fontSize: 14,
                        fontFamily: 'TitilliumWeb-Bold',
                        color: 'cornflowerblue',
                      }}>Menunggu Persetujuan </Text> :

                      bok.status === 2 ?
                        <Text style={{
                          fontSize: 14,
                          fontFamily: 'TitilliumWeb-Bold',
                          color: 'green',
                        }}>Booking Disetujui </Text> :

                        bok.status === 3 ? <Text style={{
                          fontSize: 14,
                          fontFamily: 'TitilliumWeb-Bold',
                          color: 'red',
                        }}>Pembookingan Dibatalkan </Text> :

                          bok.status === 4 ?
                            <Text style={{
                              fontSize: 14,
                              fontFamily: 'TitilliumWeb-Bold',
                              color: 'cornflowerblue',
                            }}>Konfirmasi Pembayaran </Text> :

                            bok.status === 5 ? <Text style={{
                              fontSize: 14,
                              fontFamily: 'TitilliumWeb-Bold',
                              color: 'green',
                            }}>Pembayaran Terverifikasi </Text> :

                              bok.status === 6 ? <Text style={{
                                fontSize: 14,
                                fontFamily: 'TitilliumWeb-Bold',
                                color: 'red',
                              }}>Pembayaran Ditolak </Text> :

                                bok.status === 7 ?
                                  <Text style={{
                                    fontSize: 14,
                                    fontFamily: 'TitilliumWeb-Bold',
                                    color: 'cornflowerblue',
                                  }}>Permintaan Rescheduling </Text> :

                                  bok.status === 8 ? <Text style={{
                                    fontSize: 14,
                                    fontFamily: 'TitilliumWeb-Bold',
                                    color: 'green',
                                  }}>Rescheduling Disetujui </Text> :

                                    bok.status === 9 ? <Text style={{
                                      fontSize: 14,
                                      fontFamily: 'TitilliumWeb-Bold',
                                      color: 'red',
                                    }}>Rescheduling Ditolak </Text> :

                                      bok.status === 10 ?
                                        <Text style={{
                                          fontSize: 14,
                                          fontFamily: 'TitilliumWeb-Bold',
                                          color: 'cornflowerblue',
                                        }}>Permintaan Pembatalan </Text> :

                                        bok.status === 11 ? <Text style={{
                                          fontSize: 14,
                                          fontFamily: 'TitilliumWeb-Bold',
                                          color: 'green',
                                        }}>Pembatalan Disetujui</Text> :

                                          bok.status === 12 ? <Text style={{
                                            fontSize: 14,
                                            fontFamily: 'TitilliumWeb-Bold',
                                            color: 'red',
                                          }}>Pembatalan Ditolak</Text> :

                                            bok.status === 13 ? <Text style={{
                                              fontSize: 14,
                                              fontFamily: 'TitilliumWeb-Bold',
                                              color: 'red',
                                            }}>Pembookingan Dibatalkan</Text> : ''
                    }
                  </Text>
                  <Pressable style={styles.button2} onPress={() => getBooking()}>
                    <Text style={styles.button}>Lihat Status Terbaru</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default Pricelist;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    padding: 17,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: 1,
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
  button: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  button1: {
    elevation: 3,
    backgroundColor: "#009688",
    borderRadius: 15,
    paddingVertical: 10,
    width: '23%',
    paddingHorizontal: 12
  },
  button2: {
    elevation: 3,
    backgroundColor: "#777",
    borderRadius: 15,
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: 12
  },
  button3: {
    elevation: 3,
    backgroundColor: "#009688",
    borderRadius: 15,
    paddingVertical: 10,
    width: '25%',
    marginTop: '1%',
    alignSelf: 'center',
    paddingHorizontal: 12
  },
  button4: {
    elevation: 3,
    backgroundColor: "#009688",
    borderRadius: 15,
    paddingVertical: 10,
    width: '55%',
    marginTop: '1%',
    alignSelf: 'center',
    paddingHorizontal: 12
  },
  isiAls: {
    padding: 11,
    backgroundColor: 'white',
    marginHorizontal: -5,
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',

    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginVertical: windowHeight * 0.01,
    alignItems: 'center'
  },
  informasiSaldo: {
    width: '100%',
  },
  labelSaldo: {
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
  },
  valueSaldo: {
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Bold',
  },
  labelPoint: {
    fontSize: 12,
    fontFamily: 'TitilliumWeb-Regular',
  },
  valuePoint: {
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Bold',
    alignContent: 'center'
  },
  textStatus: {
    fontSize: 14,
    textAlign: 'center'
  },
  noRek: {
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    flex: 1
  },
  hargaST: {
    fontSize: 14,
    color: 'orange',
    fontFamily: 'TitilliumWeb-Bold',
    alignContent: 'center'
  },
  valuePoint666: {
    resizeMode: "contain",
    height: 30,
    alignItems: 'flex-end',
    width: '100%',
  },
  buttonAksi: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
