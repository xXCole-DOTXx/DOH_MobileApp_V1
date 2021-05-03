import React, { Fragment, useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, TextInput, Picker } from 'react-native';
import { styles } from './styles.js';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const FormSubmit = ({navigation, route}) => {
    const [Name, onChangeName] = useState("Full Name");
    const [Phone, onChangePhone] = useState("Phone");
    const [Email, onChangeEmail] = useState("Email");
    const [selectedValue, setSelectedValue] = useState("Choose..");
    const [MileMarker, onChangeMileMarker] = useState("");
    const [Comments, onChangeComments] = useState("Comments");
    const [RoadName, onChangeRoadName] = useState("");
    const [image, setImage] = useState(null);

    const counties = ["Barbour", "Berkeley", "Boone", "Braxton", "Brooke", "Cabell", "Calhoun", "Clay", "Doddridge", "Fayette", "Gilmer", "Grant", "Greenbrier", "Hampshire", "Hancock", "Hardy",
                    "Harrison", "Jackson", "Jefferson", "Kanawha", "Lewis", "Lincoln", "Logan", "Marion", "Marshall", "Mason", "Mercer", "Mineral", "Mingo", "Monongalia", "Monroe", "Morgan", "McDowell",
                    "Nicholas", "Ohio", "Pendleton", "Pleasants", "Pocahontas", "Preston", "Putnam", "Raleigh", "Randolph", "Ritchie", "Roane", "Summers", "Taylor", "Tucker", "Tyler", "Upshur", "Wayne", 
                    "Webster", "Wetzel", "Wirt", "Wood", "Wyoming"]

     const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
        setImage(result.uri);
        }
  };

  //This needs to happen when I press the button I think but it doesnt really seem to work if I dp.
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
        <Text>Submit a complaint form.</Text>

        <View style={styles.rowContainer}>
            <Text style={styles.myText}>Name</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={Name}
            />
        </View>

        <View style={styles.rowContainer}>
            <Text style={styles.myText}>Phone</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangePhone}
            value={Phone}
            />
        </View>

        <View style={styles.rowContainer}>
            <Text style={styles.myText}>Email</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={Email}
            />
        </View>

        <View style={styles.rowContainer}>
            <Picker
                style={styles.charPicker}
                mode="dropdown"
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                {counties.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={index}/>) 
                })}
            </Picker>
        </View>

        <View style={styles.rowContainer}>
            <Text style={styles.myText}>Mile Marker</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeMileMarker}
            value={MileMarker}
            />
        </View>

        <View style={styles.rowContainer}>
            <Text style={styles.myText}>Road Name</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeRoadName}
            value={RoadName}
            />
        </View>

        <View style={styles.rowContainer}>
            <Text style={styles.myText}>Comments</Text>
            <TextInput
            style={styles.textArea}
            numberOfLines={10}
            multiline={true}
            onChangeText={onChangeComments}
            value={Comments}
            />
        </View>

        <Button title="Pick an image from camera roll" onPress={pickImage} />

        <Button
                style = {styles.button}
                title="Submit"
                        onPress={() => {
                             navigation.navigate('', {
                              screen: '',
                              params: {
                                playerName: selectedValue
                              }
                            });
                        }}
                color="#19AC52"
            />

    </View>
  );
}

export default FormSubmit;
