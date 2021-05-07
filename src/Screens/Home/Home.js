import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
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
            <Image style={styles.Image} source={require('../../Assets/transportation.png')}/>
            <Text>Home Screen</Text>
            <Text>Temperature in Charleston WV (Kelvin): {temp}</Text>
        </View>
    )
}

export default HomeScreen;