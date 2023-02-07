import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    
      },
    flatList: {
        marginTop: 50,
      
      },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
    },

    row: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomColor: '#cacaca',
        borderBottomWidth: 1,
    },
    addUser: {
        flexDirection: 'row',
        padding: 10,
    },
    input: {
        backgroundColor: '#cacaca',
        flex: 1,
        marginRight: 10,
        padding: 10,
    },
});
export default styles;