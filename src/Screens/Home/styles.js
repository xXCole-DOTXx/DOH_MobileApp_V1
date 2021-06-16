import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
    Image: {
      alignItems: 'flex-start',
      width: 350,
      height: 100,
      resizeMode: 'contain'
    },
    Image2: {
      display: 'flex',
      justifyContent: 'center', /* horizontally center */
      alignItems: 'center', /* vertically center */
      width: 200,
      height: 300,
      marginTop: 100
    }
})

export {styles}