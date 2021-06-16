import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TextInput, Image } from 'react-native';
import { Card, Header } from 'react-native-elements'
import { styles } from './styles.js';
import filter from 'lodash.filter';


const FormsScreen = ({navigation, route}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  
  //Fetch all formsfrom database
  useEffect(() =>{
    setIsLoading(true);
    fetch('http://10.0.2.2:5000/forms').then(response =>{
      if(response.ok){
        return response.json();
      }
    }).then(data => setFullData(data)).then(setIsLoading(false));
  }, []);

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          borderRadius: 20
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={queryText => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
        />
      </View>
    );
  }

  const handleSearch = text => {
  const formattedQuery = text.toLowerCase();
  const filteredData = filter(fullData, form => {
    return contains(form, formattedQuery);
  });
  setData(filteredData);
  setQuery(text);
};

const contains = ({ ID }, query) => {
  console.log("ID was: "+ID);
  console.log("Query was: "+query);
  const id = ID;
  console.log('id was: '+id);
  if (id.toString().includes(query)) {
    return true;
  }
  return false;
};


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }
  else{
  return (
      <SafeAreaView>
        <Header
          //leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Request Forms', style: { color: '#fff', fontSize: 25} }}
          //rightComponent={{ icon: 'home', color: '#fff' }}
        />
   
        <FlatList 
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.ID.toString() }
        data={query?data:fullData}
        renderItem={({item}) => (
          <Card>
            <Card.Title>{item.ID}</Card.Title>
            <Card.Divider/>
            <View style={styles.Container}>
              <Text>{item.Comments}</Text>
              {/* THIS WORKS!! */}
              {/* <Image style={styles.Image} source={require('../../Assets/transportation.png')} alt="No photo found" /> */}
              <Image style={styles.Image} source={{uri: item.Path}} alt="No photo found" />
              <Text>{item.RoadName}</Text>
              <Text>{item.County + " County"}</Text>
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
     </SafeAreaView>

  );
  } 
}

export default FormsScreen;
