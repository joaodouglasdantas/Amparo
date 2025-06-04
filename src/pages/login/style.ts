import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
    boxBottom:{
        alignItems:'center',
        height:Dimensions.get('window').height/3,
        marginBottom: -40,
        paddingTop: 40,
        width:'40%'
    },
    boxInput:{
        alignItems:'center',
        backgroundColor: '#F6F8FA',
        borderRadius: 20,
        elevation: 10,
        flexDirection:'row',
        height: 45,
        marginBottom: 8,
        marginTop: 12,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        width:'100%',
    },
    boxMid:{
        height:Dimensions.get('window').height/4,
        justifyContent:'center',
        marginTop: 20,
        paddingHorizontal: 32,
        width:'100%',
    },
    boxTop:{
        alignItems:'center',
        height:Dimensions.get('window').height/3,
        justifyContent:'center',
        width:'100%',
    },
    button:{
        alignItems:'center',
        backgroundColor:'#1A5DB2',
        borderRadius: 24,
        elevation: 6,
        height: 48,
        justifyContent:'center',
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height: 4
        },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        width: '100%',
    },
    container:{
        alignContent:'center',
        alignItems:'center',
        backgroundColor:'#5C9EDC',
        flex:1,
        justifyContent:'center'
    },
    logo:{
        height: 250,
        marginBottom: 10,
        resizeMode: 'contain',
        width: 250,
    },
    textBotton:{
        color:'#fff',
        fontSize: 15,
        fontWeight:'bold'
    },
    textButton:{
        color:'#fff',
        fontSize: 18,
        fontWeight:'bold',
        letterSpacing: 1,
    },
    textForget:{
        alignSelf:'flex-start',
        color:'#E9EDF6',
        fontSize: 15,
        fontWeight:'500',
        marginBottom: 10,
        marginTop: 10,
        paddingLeft: 8,
    },
    textInput:{
        backgroundColor: 'transparent',
        color: '#222',
        flex: 1,
        fontSize: 15,
        height:'100%',
        paddingLeft: 5,
    },
    textTitle:{
        color:'#fff',
        fontFamily:'inter',
        fontSize: 18,
        fontWeight:'bold',
        letterSpacing: 2,
        marginBottom: 2,
        marginTop: 15,
        paddingLeft: 8,
    }
})