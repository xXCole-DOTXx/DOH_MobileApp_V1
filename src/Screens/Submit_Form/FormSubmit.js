import React, { useEffect, useState } from 'react';
import { Button, View, Text, TextInput, Picker } from 'react-native';
import { Header } from 'react-native-elements';
import { styles } from './styles.js';
import * as ImagePicker from 'expo-image-picker';
import { RNS3 } from 'react-native-aws3';
import Modal from 'react-native-modal';
import { config } from '../../config';

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
    const [isModalVisible, setModalVisible] = useState(false);

    const counties = ["Barbour", "Berkeley", "Boone", "Braxton", "Brooke", "Cabell", "Calhoun", "Clay", "Doddridge", "Fayette", "Gilmer", "Grant", "Greenbrier", "Hampshire", "Hancock", "Hardy",
                    "Harrison", "Jackson", "Jefferson", "Kanawha", "Lewis", "Lincoln", "Logan", "Marion", "Marshall", "Mason", "Mercer", "Mineral", "Mingo", "Monongalia", "Monroe", "Morgan", "McDowell",
                    "Nicholas", "Ohio", "Pendleton", "Pleasants", "Pocahontas", "Preston", "Putnam", "Raleigh", "Randolph", "Ritchie", "Roane", "Summers", "Taylor", "Tucker", "Tyler", "Upshur", "Wayne", 
                    "Webster", "Wetzel", "Wirt", "Wood", "Wyoming"]

  //This needs to happen when I press the button I think but it doesnt really seem to work if I do.
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
        toggleModal();
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
      toggleModal();
      }
    };

    //POST a new form to the database
    const postForm = async () =>{
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
          Comments: Comments,
          Path: "https://rn-mobile-app-bucket.s3.us-east-2.amazonaws.com/Uploaded+Photos/" + Name + Date.now()
        })
      }).then(response =>{
        if(response.ok){
          return response.json();
        }
      }).then(data => console.log(data));
    }

    //Save image to AWS S3 bucket
    const saveImage = async () => {
      const file = {
        uri: image,
        name: Name + Date.now(), //This needs to be a better naming convention
        type: 'image/png'
      }
      RNS3.put(file, config).then((response) => {
        console.log(response);
      });
    }

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

  return (
    <View style={styles.container}>
        <Header
          //leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Create request', style: { color: '#fff', fontSize: 25} }}
          //rightComponent={{ icon: 'home', color: '#fff' }}
        />

        <View style={styles.rowContainer}>
            <TextInput
            style={styles.input}
            placeholder = "Name"
            onChangeText={onChangeName}
            value={Name}
            />
        </View>

        <View style={styles.rowContainer}>
            <TextInput
            style={styles.input}
            placeholder = "Phone"
            onChangeText={onChangePhone}
            value={Phone}
            />
        </View>

        <View style={styles.rowContainer}>
            <TextInput
            style={styles.input}
            placeholder = "Email"
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
            <TextInput
            style={styles.input}
            placeholder = "Mile Marker"
            onChangeText={onChangeMileMarker}
            value={MileMarker}
            />
        </View>

        <View style={styles.rowContainer}>
            <TextInput
            style={styles.input}
            placeholder = "Road Name"
            onChangeText={onChangeRoadName}
            value={RoadName}
            />
        </View>

        <View style={styles.rowContainer}>
            <TextInput
            style={styles.textArea}
            placeholder = "Describe the problem..."
            numberOfLines={10}
            multiline={true}
            onChangeText={onChangeComments}
            value={Comments}
            />
        </View>
        <Button title="Upload Photo" onPress={toggleModal} />
        <Button
                style = {styles.button}
                title="Submit"
                        onPress={() => {
                          saveImage();
                          postForm();
                          navigation.navigate('ThankYou');
                        }}
                color="#19AC52"
            />

      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>
          <Button title="Camera Roll" onPress={pickImage} />
          <Button title="Camera" onPress={takeImage} />
          <Button title="Cancel" onPress={toggleModal} />
        </View>
      </Modal>

    </View>
  );
}

export default FormSubmit;