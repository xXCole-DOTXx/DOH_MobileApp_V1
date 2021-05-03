import React, { Fragment, useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, Image, FlatList } from 'react-native';

const FormsScreen = ({navigation, route}) => {

  const [usersArray, setUsersArray] = useState([]);
  const nameArray = [];
  
  //Fetch all users from database
  useEffect(() =>{
    fetch('http://10.0.2.2:5000/forms').then(response =>{
      if(response.ok){
        return response.json();
      }
    }).then(data => setUsersArray(data));
  }, []);

  for(var i=0; i<usersArray.length; i++){
    nameArray.push(usersArray[i].Name);
  }

  const listUsers = usersArray.map((user) =>
    <li>{user}</li>
    );

  const listNames = nameArray.map((name) =>
     <Text>{name}</Text>
  );

  return (
    <View>
        <Text>WV DOT Employees.</Text>
        <FlatList 
        keyExtractor={(item) => item.ID }
        data={usersArray}
        renderItem={({item}) => (
          <Text>{item.Name}</Text>
        )}
        />
    </View>
  );
}

export default FormsScreen;
