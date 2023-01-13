import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { WARNA_UTAMA } from '../../utils/constant';
import { SvgXml } from 'react-native-svg';
import { AuthContext } from '../../context/Auth.context.js';
import Gap from '../Gap';
import {
  IconAddSaldo,
  IconGetPoint,
} from '../../../assets/icons';
import axios from 'axios';

const Saldo = ({ navigation }) => {

  async function pesanan() {
    navigation.navigate('Pesanan');
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => pesanan()}>
        <View style={styles.informasiSaldo}>
          <View style={styles.text}>
            <Text style={styles.labelSaldo}>Pesanan anda</Text>
            {/* <Text style={styles.valueSaldo}>Anda</Text> */}
          </View>
        </View>
        <View style={styles.buttonAksi}>
          <Gap width={10} />
          <SvgXml width="40" height="30" xml={IconGetPoint} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Saldo;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
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
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  informasiSaldo: {
    width: '60%',
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
    color: WARNA_UTAMA,
  },
  buttonAksi: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
