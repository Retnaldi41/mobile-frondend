import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import { SplashBackground, Logo } from '../../../assets/images/index'

const Splash = ({ navigation }) => {
    
    useEffect(() => {
        setTimeout( () => {
            navigation.replace('MainApp');
        }, 3000)
    }, [navigation]);

    return (
       <ImageBackground source={SplashBackground} style={styles.background}>           
       </ImageBackground>
    )
}

export default Splash

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 80
    }
})
