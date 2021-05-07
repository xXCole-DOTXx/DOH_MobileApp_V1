import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'
import { styles } from './styles.js';

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
        style = {styles.List}
        data={formsArray}
        renderItem={({item}) => (
          <Card>
            <Card.Title>{item.ID}</Card.Title>
            <Card.Divider/>
            <View style={styles.Container}>
              <Text style={styles.Comments}>{item.Comments}</Text>
           
              <Text style={styles.Comments}>{item.RoadName}</Text>
            </View>

            <View style={styles.ListContainer}>
              <Text style={styles.LabelText}>Name</Text>
              <Text style={styles.LabelText}>Phone</Text>
              <Text style={styles.LabelText}>Email</Text>
            </View>
            <View style={styles.ListContainer}>
              <Text style={styles.CardText}>{item.Name}</Text>
              <Text style={styles.CardText}>{item.Phone}</Text>
              <Text style={styles.CardText}>{item.Email}</Text>
            </View>
          </Card>
        )}
        />
    </ScrollView>
  );
}

export default FormsScreen;
