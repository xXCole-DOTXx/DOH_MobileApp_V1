import { StyleSheet } from 'react-native';

//Helpful video on Flexbox: https://www.youtube.com/watch?v=R2eqAgR_KlU&t=802s

const styles = StyleSheet.create({
    Container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    ListContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    CardText: {
        padding: 10
    },
    LabelText: {
        padding: 10,
        fontWeight: "bold"
    },
    List: {
        flex: 1,
        padding: 10
    },
    Image: {
        alignItems: 'flex-start',
        width: 350,
        height: 300,
        marginBottom: 10
        // resizeMode: 'contain'
      }
})

export {styles}