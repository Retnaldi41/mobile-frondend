import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { ContextProvider } from '../src/context/Auth.context';

import Router from './router';


const App = () => {
  return (
    <ContextProvider value={500}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </ContextProvider>
  )
}

export default App

const styles = StyleSheet.create({})