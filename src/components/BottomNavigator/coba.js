import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  IconAddSaldo,
  IconGetPoint,
  IconKiloan,
  IconKarpet,
  IconSatuan,
  IconVIP,
  IconSetrika,
  IconEkspress,
} from '../../../assets/images';
import {WARNA_SEKUNDER} from '../../utils/constant';

const coba= () => {  

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.button}>
        <IconAddSaldo />
        <IconGetPoint />
      </View>
      <Text style={styles.text}>ok</Text>
    </TouchableOpacity>
  );
};

export default coba;

const styles = StyleSheet.create({
  container:{
      marginBottom : 12,
      marginRight : 30
  }, 
  button:{
    backgroundColor: WARNA_SEKUNDER,
    padding: 12,
    borderRadius: 10,
  },
  text:{
    fontSize: 14,
    fontFamily:'TitilliumWeb-Regular',
    textAlign: 'center',
  },
});
