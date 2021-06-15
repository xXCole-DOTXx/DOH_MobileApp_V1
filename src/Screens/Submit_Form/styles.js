import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
    },

    rowContainer: {
        flexDirection: 'row'
    },

    input: {
      height: 40,
      margin: 12,
      width: 200,
      borderWidth: 1,
    },

    myText: {
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 20
    },

    charPicker: {
        flex: 2, 
        justifyContent: 'flex-start' 
      },

    button: {
        flex: 3,
        marginTop: 20,
        justifyContent: 'flex-start'
      },

    textArea: {
        height: 150,
        justifyContent: "flex-start",
        borderWidth: 1,
        width: 200
      },
  })

  export {styles} 