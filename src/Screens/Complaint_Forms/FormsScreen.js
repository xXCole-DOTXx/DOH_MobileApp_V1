import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'

const FormsScreen = ({navigation, route}) => {

  const [formsArray, setFormsArray] = useState([]);
  
  //Fetch all users from database
  useEffect(() =>{
    fetch('http://10.0.2.2:5000/forms').then(response =>{
      if(response.ok){
        return response.json();
      }
    }).then(data => setFormsArray(data));
  }, []);

  return (
    <ScrollView>
        <Text>WV DOT Employees.</Text>
        <FlatList 
        keyExtractor={(item) => item.ID }
        data={formsArray}
        renderItem={({item}) => (
          <Text>{item.Name}</Text>
        )}
        />

    <Card>
      <Card.Title>CARD WITH DIVIDER</Card.Title>
      <Card.Divider/>
      {
        formsArray.map((u, i) => {
          return (
            <View key={i}>
              <Text>{u.ID}</Text>
              <Text>{u.Name}</Text>
              <Text>{u.Phone}</Text>
              <Text>{u.Email}</Text>
            </View>
          );
        })
      }
    </Card>


    </ScrollView>
  );
}

export default FormsScreen;
