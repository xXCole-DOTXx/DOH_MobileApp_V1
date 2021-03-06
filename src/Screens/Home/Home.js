import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { Header } from 'react-native-elements';
import { styles } from './styles.js';

const HomeScreen = ({navigation, route}) => {
    const [temp, setTemp] = useState("");

    //Weather api fetch
    useEffect(() => {
      fetchItems();
    }, []);
  
    //Fetch data from the OpenWeatherMaps free api: https://openweathermap.org/api
    const fetchItems = async () => {
      const data = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Charleston&appid=4df7cfc15bfeb45b68bc24aeb62af934');
      const items = await data.json();
      setTemp(items.main.temp);
    }

    return (
        <View style={styles.container}>
          <Header
          //leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'WV DOT Work Request', style: { color: '#fff', fontSize: 25} }}
          //rightComponent={{ icon: 'home', color: '#fff' }}
        />
            <Image style={styles.Image} source={require('../../Assets/transportation.png')}/>
            <Text>Home Screen</Text>
            <Text>Temperature in Charleston WV (Kelvin): {temp}</Text>
            <Image style={styles.Image2} source={require('../../Assets/WVDOT.png')}/>
        </View>
    )
}

export default HomeScreen;