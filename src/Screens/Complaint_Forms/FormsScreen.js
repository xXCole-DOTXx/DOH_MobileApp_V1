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
          <Card>
            <Card.Title>{item.ID}</Card.Title>
            <Card.Divider/>
            <View>
              <Text>{item.Name}</Text>
            </View>
          </Card>
        )}
        />
    </ScrollView>
  );
}

export default FormsScreen;
