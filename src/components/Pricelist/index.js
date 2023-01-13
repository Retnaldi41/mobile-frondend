import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { WARNA_UTAMA } from '../../utils/constant';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { AuthContext } from '../../context/Auth.context.js';
import Gap from '../Gap';
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
import axios from 'axios';

const Pricelist = ({ navigation }) => {
    const [cos, setCosplay] = useState([]);
    const [wedd, setWedding] = useState([]);
    const [stu, setStudio] = useState([]);
    const { user, logout } = useContext(AuthContext);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        getCosplay(); // eslint-disable-next-line
        getStudio(); // eslint-disable-next-line
        getWedding(); // eslint-disable-next-line
    }, []);

    async function getCosplay() {
        await axios.get('http://192.168.1.10:3000/cosplay/')
            .then((response) => {
                console.log("berhasil")
                setCosplay(response.data[1]);
            })

    }

    async function getWedding() {
        await axios.get('http://192.168.1.10:3000/wedding/')
            .then((response) => {
                console.log("berhasil")
                setWedding(response.data[2]);
            })

    }

    async function getStudio() {
        await axios.get('http://192.168.1.10:3000/studio/')
            .then((response) => {
                console.log("berhasil")
                setStudio(response.data[0]);
            })

    }
    let no = 1;

    return (
        <View>
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.informasiSaldo}>
                    <View style={styles.text}>
                        <Text style={styles.valueSaldo}>{cos.jenis_cosplay}</Text>
                    </View>
                    <View style={styles.text}>
                        <Text style={styles.labelPoint}>Fasilitas :</Text>
                        <Text style={styles.valuePoint}>{cos.fasilitas}</Text>
                    </View>
                </View>                
            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.informasiSaldo}>
                    <View style={styles.text}>
                        <Text style={styles.valueSaldo}>{wedd.jenis_wedding}</Text>
                    </View>
                    <View style={styles.text}>
                        <Text style={styles.labelPoint}>Fasilitas :</Text>
                        <Text style={styles.valuePoint}>{wedd.fasilitas}</Text>
                    </View>
                </View>                
            </View>
        </TouchableOpacity>
        
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.informasiSaldo}>
                    <View style={styles.text}>
                        <Text style={styles.valueSaldo}>{stu.jenis_studio}</Text>
                    </View>
                    <View style={styles.text}>
                        <Text style={styles.labelPoint}>Fasilitas :</Text>
                        <Text style={styles.valuePoint}>{stu.fasilitas}</Text>
                    </View>
                </View>                
            </View>
        </TouchableOpacity>

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
    text: {
        
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
        fontSize: 12,
        fontFamily: 'TitilliumWeb-Bold',        
    },
    buttonAksi: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});
