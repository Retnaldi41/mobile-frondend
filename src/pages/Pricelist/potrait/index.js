import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, ImageBackground, Image, Pressable, Button, Modal } from 'react-native';
import { WARNA_UTAMA } from '../../../utils/constant';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import DatePicker from 'react-native-modern-datepicker';
import { ImageHeader, Logo, Wedding, Group, Potrait, group, Studio } from '../../../../assets/images/index';
import Gap from '../../../components/Gap';
import axios from 'axios';
import { AuthContext } from '../../../context/Auth.context.js';
import {
    IconAddSaldo,
    IconGetPoint,
    IconKiloan,
} from '../../../../assets/icons';
import { BookingContext } from '../../../context/BookingContext';

const Pricelist = ({ navigation }) => {
    const [cos, setPotrait] = useState([]);
    const { user, logout } = useContext(AuthContext);
    // const { booking, book } = useContext(BookingContext);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    useEffect(() => {
        getPotrait(); // eslint-disable-next-line
    }, []);

    async function getPotrait() {
        await axios.get('http://192.168.1.7:3000/potrait/')
            .then((response) => {
                console.log("berhasil")
                setPotrait(response.data);
            })

    }       

    const [tgl, onChangeTgl] = useState('');
    const pesan = async (id_potrait) => {
        let booking = { id_user: user.id_user, jenis_booking: 'Potrait', id_item: id_potrait, tanggal_booking: selectedDate, bukti_transfer: '', status: 1 }
        await axios.post('http://192.168.1.10:3000/booking/', booking)
            .then((response) => {
                console.log(response.data)
                // book(response.data)
            })
            .catch(error => {
                console.log("gagal")
            })
        setModalVisible(!modalVisible)
    }

    let no = 1;
    return (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={ImageHeader} style={styles.header}>
                    <View style={styles.hello}>
                        <Text style={styles.selamat}>Potrait</Text>
                        <Text style={styles.username}>PhotoSano</Text>
                    </View>                    
                </ImageBackground>
                <View style={styles.list}>
                    {cos.map((cos, index) => (
                        <TouchableOpacity key={index}>
                            <View style={styles.container}>
                                <View style={styles.informasiSaldo2}>
                                    <View style={styles.text}>
                                        <Text style={styles.valueSaldo}>{cos.jenis_potrait}</Text>

                                    </View>
                                    <View style={styles.text}>
                                        <Image
                                            style={{ width: 150, margin: 10, height: 100 }}
                                            source={{ uri: cos.gambar_potrait }}
                                        ></Image>
                                    </View>
                                    <View style={styles.text}>
                                        <Text style={styles.labelPoint}>Fasilitas : {cos.fasilitas}</Text>
                                    </View>
                                    <Button
                                        title="Detail"
                                        onPress={() => {
                                            setModalVisible(true);
                                            setSelectedIndex(index);
                                        }}
                                    ></Button>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <Modal
                    style={styles.modal}
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>potrait</Text>
                            <Image
                                style={{ Align: 'center', width: 100, margin: 10, height: 150 }}
                                source={{ uri: cos[selectedIndex]?.gambar_potrait }}
                            />
                            <Text style={styles.valueSaldo}>{cos[selectedIndex]?.jenis_potrait}</Text>
                            <Text style={styles.labelPoint}>{cos[selectedIndex]?.fasilitas}</Text>
                            <Text style={styles.labelHarga}>Rp.{cos[selectedIndex]?.harga}</Text>
                            <DatePicker
                                style={styles.informasiSaldo}
                                onSelectedChange={tgl => setSelectedDate(tgl)}
                            />
                            <Text style={styles.text}>Tgl : {selectedDate}</Text>
                            <View style={styles.tombol}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Kembali</Text>
                                </Pressable>
                                {/* <TextInput
                                style={styles.isi}
                                onChangeText={onChangeTgl}
                                value={tgl}
                            /> */}

                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => pesan(cos[selectedIndex]?.id_potrait)}>
                                    <Text style={styles.textStyle}>Booking</Text>
                                </Pressable>

                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View >
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
    tombol: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        minWidth: '100%',
        justifyContent: 'space-around',
    },
    list: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    text: {
        flexDirection: 'row',
    },
    informasiSaldo2: {
        width: '100%',
    },
    informasiSaldo: {
        width: '100%',
        minWidth: '100%',
    },
    labelSaldo: {
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Regular',
    },
    valueSaldo: {
        fontSize: 15,
        fontFamily: 'TitilliumWeb-Bold',
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
    labelPoint: {
        fontSize: 12,
        fontFamily: 'TitilliumWeb-Regular',
        bold: {
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
        },
    },
    labelHarga: {
        fontSize: 12,
        fontFamily: 'TitilliumWeb-Regular',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    valuePoint: {
        fontSize: 12,
        fontFamily: 'TitilliumWeb-Bold',
        color: WARNA_UTAMA,
    },
    buttonAksi: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
    hello: {
        marginTop: windowHeight * 0.03,
    },
    header: {
        width: windowWidth,
        height: windowHeight * 0.3,
        paddingHorizontal: 30,
        paddingTop: 10,
    },
    selamat: {
        fontSize: 24,
        fontFamily: 'TitilliumWeb-Regular',
    },
    username: {
        fontSize: 22,
        fontFamily: 'TitilliumWeb-Bold',
    },
    centeredView: {
        position: 'relative',
        flex: 1,
        marginHorizontal: '10%',
        justifyContent: 'center',
        justifySelf: 'center',
        alignItems: 'center',
        marginTop: 22,
        maxWidth: '80%',
    },
    modalView: {
        marginVertical: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        minWidth: '45%',
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'TitilliumWeb-Bold',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'TitilliumWeb-Bold',
    },
});
