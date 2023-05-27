

import { Dimensions, I18nManager, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    SearchInput: {

        marginTop: getStatusBarHeight() + 40,
        fontSize: 20,
        fontWeight: "650",
        textAlign: "right",
        borderColor: "#ff914d",
        backgroundColor: "#ffffff",
        marginStart: 10,
        marginEnd: 10,
        paddingRight: 30,


        // borderRadius : 5,
    },
    emptyFont : {
        fontSize: 20,
        fontWeight: "800",
        color: "#ff914d",  
        marginTop : "30%",    
         alignSelf: 'center',
       //100%
        
      },
    SearchInput2: {

        marginTop: getStatusBarHeight() + 40,
        fontSize: 20,
        fontWeight: "650",
        textAlign: "right",
        borderColor: "#ff914d",
        backgroundColor: "#ffffff",
        marginStart: 10,
        marginEnd: 10,
        paddingLeft: 30,


        // borderRadius : 5,
    },
    ChangeRequestButton: {
        backgroundColor: "#ff914d",
        height: 50,

        justifyContent: 'center',
        alignItems: 'center',
    },
    ChangeRequestButtonText: {
        fontSize: 20,

        fontWeight: '800',
    },

    searchIcon: {
        position: "absolute",
        zIndex: 1,
        right: 20,
        top: getStatusBarHeight() + 70,
    },
    searchIcon2: {
        position: "absolute",
        zIndex: 1,
        left: 20,
        top: getStatusBarHeight() + 70,
    },
    flatList: {
        marginTop: 20,

    },
    item: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        borderColor: "#ff914d",
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    Books: {
        justifyContent: 'space-between',
        borderColor: "#ff914d",
        flexDirection:  I18nManager.isRTL ? 'row' :'row-reverse',
        alignItems: 'center',
    },

    Book: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    status1 : {
        fontWeight: "800",
        fontSize : 20,
        color :  "#ff914d",
    }, 
    status2 : {
        fontWeight: "800",
        fontSize : 20,
        color :  "green",
    }, 
    status3 : {
        fontWeight: "800",
        fontSize : 20,
        color :  "red",
    },
    profile: {
        flexDirection:  I18nManager.isRTL ? 'row' : 'row-reverse',
        alignItems: 'center',
    },
    itemUpper: {
        justifyContent: 'space-between',
        flexDirection:  I18nManager.isRTL ?  'row-reverse' : 'row',
        width: '100%',
    },
    ChangeRequestText: {
        fontSize: 18,
        color: "#ff914d",
        fontWeight: '900',
        alignSelf: 'center',
        marginTop: 10,


    },
    title: {

        // backgroundColor : 'red',
        fontSize: 15,
        color: "#ff914d",
        fontWeight: '900',
        // alignSelf : 'flex-end',
        textAlign: "right",
        // flexWrap : 'wrap',

       

        // marginStart: 20,


    },
    starRating: {
        flexDirection:  I18nManager.isRTL ? 'row' : 'row-reverse',
        alignSelf: "flex-end",
    },
    imageStar: {
        height: 30,
        width: 30,

    },
    ratingFontContiner: {
        flexDirection:  I18nManager.isRTL ? 'row' : 'row-reverse',
        marginTop: 5,
        marginEnd: 5,
    },
    ratingFont: {
        fontSize: 18,
        fontWeight: '800',
        color: "#f8c40c",
    },
    txt: {

        
        fontSize: 18,
        color: "grey",
        fontWeight: '800',
        textAlign: "right",
      
    },
    ImageBackGround: {
        height: Dimensions.get('window').height / 5,
    },
    imageIteam: {
        height: 80,
        width: 80,
        margin: 20,
        borderRadius: 20,
    },
    imageProfile: {
        height: 50,
        width: 50,
        borderRadius: 100,
        marginStart: 10,
        marginEnd : 10,


    },
    firstPartItem: {
        flexDirection:  I18nManager.isRTL ? 'row-reverse' : 'row',
        marginBottom: 10,

        alignItems: 'center',


    },
    seconPartItem: {
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    itemIcons: {
        flexDirection:  I18nManager.isRTL ? 'row' : 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',


    },
    Icons: {
        marginStart: 10,

    },
    itemImageAndeDerails: {
        // flexGrow: 1,
        flexDirection:  I18nManager.isRTL ?  'row-reverse' : 'row',
        // justifyContent : 'space-between',
        // alignItems: 'center',
        marginEnd: 5,
        marginTop: 20,


    },

    details: {
        // flexShrink : 1,
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'flex-end',
        marginTop: 10,

    },
    addButton: {
        position: 'absolute',
        bottom: Platform.OS === "ios" ? getStatusBarHeight() + 120 : 120,
        backgroundColor: "#ff914d",
        borderRadius: 100,
        justifyContent: 'center',
        alignContent: 'center',
    },
    alertContainer: {
        flexDirection: "column",
        width: "100%",
        // height: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",

    },
    IconError: {

        color: "red",


    },
    alertContentTextError: {

        textAlign: I18nManager.isRTL ? "left" : "right",
        fontSize: 20,
        marginBottom: 10,
        // color: "red",
        fontWeight: '800',
        paddingRight: 8,
        color: "#ff914d",

    },
    alertContentContainer: {

        backgroundColor: "white",
        borderColor: "#ff914d",
        borderWidth: 1,
        borderRadius: 7,
        padding: 50,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
    },

    ButtonDelete: {
        backgroundColor: "red",
        height: 50,
        width: "100%",
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 20,
    },

    ButtonDeleteFont: {
        fontSize: 18,
        fontWeight: '800',

    },
    ButtonClose: {
        backgroundColor: "#ff914d",
        height: 50,
        width: "100%",
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 20,
    },
    ButtonCloseFont: {
        fontSize: 18,
        fontWeight: '800',
    },
    addButton: {
        position: 'absolute',
        bottom: Platform.OS === "ios" ? getStatusBarHeight() + 120 : 120,
        backgroundColor: "#ff914d",
        borderRadius: 100,
        justifyContent: 'center',
        alignContent: 'center',
    },
    modelAnswer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'

    },
    ModealButtons: {
        // height: 50,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: '#ff914d',
        borderWidth: 1,
        marginEnd: 20,
        marginStart: 20,

    },
    filterButtonFont: {
        fontSize: 14,
        fontWeight: '800',
        color: "#ff914d",
    },
    alertContentTextError1: {

        textAlign: "right",
        fontSize: 20,
        marginBottom: 10,
        color: "red",
        fontWeight: '800',


    },
    modelContainer: {
        flexDirection: "column",
        width: "100%",
        // height: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    
      },
    modelContentContainer: {

        backgroundColor: "white",
        borderColor: "#ff914d",
        borderWidth: 1,
        borderRadius: 7,
        padding: 50,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
      },
      checkboxContiner: {
        flexDirection: 'row-reverse',
    
      },
    
    
      checkBoxText: {
    
        textAlign: "right",
        fontSize: 20,
        fontWeight: '800',
        paddingRight: 8,
        color: "#ff914d",
        marginEnd: 10,
      },
      checkboxAndText: {
        justifyContent: 'center',
        flexDirection: 'row-reverse',
      },
      input: {

        backgroundColor: "#ffffff",
        textAlign: "right",
        height: 55,
        // marginTop:20,
    
      },
      checkbox: {
        marginEnd: 10,
        marginTop: Platform.OS === "ios" ? 0 : 5,
    
      },
      ratingText: {
        color: "#ff914d",
        fontWeight: '600',
        fontSize: 15,
        marginStart: 10,
        marginTop: 5,
      },
      starRating: {
        flexDirection: I18nManager.isRTL ? "row" :"row-reverse",
        marginTop: 20,
      },
});

export default styles;
