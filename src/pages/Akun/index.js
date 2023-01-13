import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Linking, TextInput, ImageBackground, Image, Pressable, Button } from 'react-native';
import { WARNA_UTAMA } from '../../utils/constant';
import Iframe from 'react-iframe';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import { ImageHeader, Logo, Wedding, Group, Potrait, Cosplay, Studio } from '../../../assets/images/index';
import Gap from '../../components/Gap';
import axios from 'axios';
import { AuthContext } from '../../context/Auth.context.js';
import {
    IconAddSaldo,
    IconGetPoint,
    IconKiloan,
} from '../../../../assets/icons';
import { BookingContext } from '../../../context/BookingContext';

const Pricelist = ({ navigation }) => {
    const [cos, setCosplay] = useState([]);
    const { user, logout } = useContext(AuthContext);
    // const { booking, book } = useContext(BookingContext);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    // async function getWa() {
    //         .then((response) => {
    //             console.log("berhasil")
    //             setCosplay(response.data);
    //         })

    // }   

    let no = 1;
    return (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={ImageHeader} style={styles.header}>
                    <View style={styles.hello}>
                        <Text style={styles.selamat}>Tentang Kami</Text>
                        <Text style={styles.username}>PhotoSano</Text>
                    </View>
                </ImageBackground>
                <View style={styles.list}>
                    <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 20 }}>PhotoSano </Text>
                    <Text style={styles.isi}>adalah sebuah badan usaha yang bergerak dalam
                        penyediaan jasa untuk melakukan dokumentasi seperti pernikahan,
                        potrait, komersial, studio, cosplay ataupun produk.
                        Di era sekarang semakin berkembangnya fotografi di era digital,
                        semakin banyak pula orang yang bisa memotret dengan baik menggunakan kamera.
                        Dibutuhkan sesuatu yang berbeda dalam fotografi agar dapat memikat
                        konsumen yang lebih, terutama dalam bidang pengambilan foto maupun videonya.
                        Terdapat banyak sekali terknik fotografi yang menarik,
                        hingga salah satunya yaitu teknik fotografi levitasi, juga masih banyak
                        Teknik fotografi lainnya. Sesuai perkembangan fashion sendiri sangat pesat
                        salah satu perkembangan fashion yang sedang naik daun adalah fashion wedding.
                        Fashion adalah benda-benda dan atribut yang dipakai manusia untuk
                        mengidentifikasikan dirinya secara khusus dan kelompok sosialnya sebagai satu
                        kesatuan dirinya. Sedangkan wedding sebuah acara pernikahan yang dimana pada
                        jaman sekarang sangat banyak sekali untuk melakukkan pengabadian adian moment
                        tersebut dengan berpenampilan yang sangat menarik. Adapun manfaatnya adalah dapat
                        menghasilkan karya fotografi yang memvisualkan fashion wedding.
                        Sehingga terlihat menarik dan berbeda dari karya fotografi fashion yang lainya.
                        Juga memperkenalkan fashion wedding yang tidak monoton dan dapat menjadi sebuah
                        pilihan untuk para pasangan pengantin yang ingin mengabadikan moment nya di
                        sebuah pesta pernikahannya. Teknik Fotografi levitasi bisa dijadikan salah satu
                        alternatif ide atau konsep yang masih fresh. Disatukan dengan teman fashion
                        wedding membuat teknik fotografi levitasi ini sangat unik dan menarik.
                    </Text>
                    {/* <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 26, textAlign: 'center' }}> Kontak Kami : </Text> */}
                    <Divider />
                    <Divider />
                    <Divider />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginRight: 5 }}>
                            <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 15, textAlign: 'center' }}> Kontak Kami</Text>
                            <Pressable style={styles.button1} onPress={() => { Linking.openURL('https://wa.me/6281233424503') }}>
                                <Text style={styles.button}><Icon name="whatsapp" /> Whatsapp</Text>                                
                            </Pressable>
                            <Pressable style={styles.button1} onPress={() => { Linking.openURL('https://instagram.com/photo_sano?igshid=YmMyMTA2M2Y=') }}>
                                <Text style={styles.button}><Icon name="instagram" /> Instagram</Text>
                            </Pressable>
                            <Pressable style={styles.button1} onPress={() => { Linking.openURL('https://wa.me/6287867575022') }}>
                                <Text style={styles.button}><Icon name="envelope-open" /> Gmail</Text>
                            </Pressable>
                        </View>
                        <View style={{ flex: 1, marginRight: 5 }}>
                            <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 15, textAlign: 'center' }}> Alamat</Text>
                            <WebView                                
                                source={{ html: '<iframe border:0;  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.228960453114!2d112.59881361450756!3d-7.658514077904261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7877a352659e73%3A0x7086bf23b6a8729b!2sSano%20Studio!5e0!3m2!1sid!2sid!4v1638761653370!5m2!1sid!2sid" width="600" height="100%; loading="lazy" frameborder="0" allowfullscreen></iframe>' }}                                
                            />
                        </View>
                    </View>

                </View>

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
        paddingLeft: 10,
        paddingRight: 10,
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
    button1: {
        elevation: 3,
        backgroundColor: "#009688",
        borderRadius: 15,
        paddingVertical: 10,
        width: '100%',
        marginTop: 5,
        paddingHorizontal: 12
    },
    button: {
        fontSize: 10,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
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
    isi: {
        fontSize: 14,
        fontFamily: 'TitilliumWeb-Regular',
        textAlign: 'justify',
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
