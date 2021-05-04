import React, { useEffect, useState } from 'react';
import { Button, View, Text, TextInput, Picker } from 'react-native';
import { styles } from './styles.js';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

const FormSubmit = ({navigation, route}) => {
    const [Name, onChangeName] = useState(null);
    const [Phone, onChangePhone] = useState(null);
    const [Email, onChangeEmail] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [MileMarker, onChangeMileMarker] = useState(null);
    const [Comments, onChangeComments] = useState(null);
    const [RoadName, onChangeRoadName] = useState(null);
    const [image, setImage] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);

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

    const takeImage = async () => {
      let result = await ImagePicker.launchCameraAsync({
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
      const {status} = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

    //POST a new form to the database
    const postForm = async () =>{
      console.log(MileMarker);
      fetch('http://10.0.2.2:5000/forms', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: Name,
          Phone: Phone,
          Email: Email,
          County: selectedValue,
          RoadName: RoadName,
          MileMarker: MileMarker,
          Comments: Comments
        })
      }).then(response =>{
        if(response.ok){
          return response.json();
        }
      }).then(data => console.log(data));
    }

    const SaveToPhone = async (item) => {
      // Remember, here item is a file uri which looks like this. file://..
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        try {
          const asset = await MediaLibrary.createAssetAsync(item);
          MediaLibrary.createAlbumAsync('Images', asset, false)
            .then(() => {
              console.log('File Saved Successfully!');
            })
            .catch(() => {
              console.log('Error In Saving File!');
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('Need Storage permission to save file');
      }
    };



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
        <Button title="Take a picture" onPress={takeImage} />

        <Button
                style = {styles.button}
                title="Submit"
                        onPress={() => {
                          SaveToPhone(image);
                          postForm();
                        //   await FileSystem.moveAsync({
                        //     from: image,
                        //     to: FileSystem.documentDirectory + 'Images/'
                        // });
                        }}
                color="#19AC52"
            />

    </View>
  );
}

export default FormSubmit;
