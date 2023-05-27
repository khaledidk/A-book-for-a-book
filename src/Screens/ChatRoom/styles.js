import { Dimensions, I18nManager, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  emptyFont : {
    fontSize: 20,
    fontWeight: "800",
    color: "#ff914d",  
    marginTop : "25%",    
     alignSelf: 'center',
   //100%
    
  },
  label: {
    backgroundColor: "#ff914d",
    height: 100,
  },
  SearchInput: {

    marginTop: 10,
    fontSize: 20,
    fontWeight: "650",
    textAlign: "right",
    borderColor: "#ff914d",
    backgroundColor: "#ffffff",
    marginStart: 10,
    marginEnd: 10,
    paddingRight: 30,

  },
  SearchInput2: {

    marginTop: 10,
    fontSize: 20,
    fontWeight: "650",
    textAlign: "right",
    borderColor: "#ff914d",
    backgroundColor: "#ffffff",
    marginStart: 10,
    marginEnd: 10,
    paddingLeft: 30,

  },
  searchIcon: {
    position: "absolute",
    zIndex: 1,
    right: 20,
    top: 40,
  },
  searchIcon2: {
    position: "absolute",
    zIndex: 1,
    left: 20,
    top: 40,
  },
  flatList: {
    marginTop: 10,

  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
  },
  userNameAndLastMassage: {
    marginEnd: 10,
  },
  userName: {

  },
  lastMassageSeen: {
    color: "grey",
    textAlign: I18nManager.isRTL ? 'left' : 'right'
  },
  lastMassageNotSeen: {
    color: "black",
    fontWeight: "800",
    textAlign: I18nManager.isRTL ? 'left' : 'right'
  },
  row: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
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