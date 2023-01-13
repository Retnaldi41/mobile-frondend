import * as React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Home, Splash, Akun, Pesanan, Register, Login, CosplayR, Wedding, Potrait, Studio, Group, Saldo} from '../pages/index';
import MyTabBar from '../components/BottomNavigator/coba';
import testSvg from '../../assets/icons/akun.svg';
import Icon from 'react-native-vector-icons/FontAwesome';


const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#1a1516"
      barStyle={{
        backgroundColor: 'white',
        opacity: 0.7
      }}
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} />
          ),
        }} />
      <Tab.Screen name="Pesanan" component={Pesanan}
        options={{
          tabBarLabel: 'Pesanan',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" size={24} />
          ),
        }}
      />
      <Tab.Screen name="Tentang Kami" component={Akun}
        options={{
          tabBarLabel: 'Tentang Kami',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" size={24} />
          ),
        }}
      />
      <Tab.Screen name="Register" component={Register}
        options={{
          tabBarLabel: 'Register',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-plus" size={24} />
          ),
        }}
      />
      <Tab.Screen name="Login" component={Login}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} />
          ),
        }}
      />
      {/* <Tab.Screen name="Home" component={Home} options={{ tabBarBadge: 3 }} /> */}
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
      <Stack.Screen name="CosplayR" component={CosplayR} options={{ headerShown: false }} />
      <Stack.Screen name="Wedding" component={Wedding} options={{ headerShown: false }} />
      <Stack.Screen name="Group" component={Group} options={{ headerShown: false }} />
      <Stack.Screen name="Potrait" component={Potrait} options={{ headerShown: false }} />
      <Stack.Screen name="Studio" component={Studio} options={{ headerShown: false }} />
      <Stack.Screen name="Saldo" component={Saldo} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});