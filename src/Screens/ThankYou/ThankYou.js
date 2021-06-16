import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { Header } from 'react-native-elements';
import { styles } from './styles.js';

const ThankYou = ({navigation, route}) => {

    //Weather api fetch
    useEffect(() => {
      
    }, []);

    return (
        <View style={styles.container}>
          <Header
          //leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Thank You', style: { color: '#fff', fontSize: 25} }}
          //rightComponent={{ icon: 'home', color: '#fff' }}
        />
            <Image style={styles.Image} source={require('../../Assets/transportation.png')}/>
            <Text>Thank you for letting us know!</Text>
        </View>
    )
}

export default ThankYou;