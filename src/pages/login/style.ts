import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#5C9EDC'
    },
    boxTop:{
        height:Dimensions.get('window').height/3,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    boxMid:{
        height:Dimensions.get('window').height/4,
        width:'100%',
        paddingHorizontal: 32,
        justifyContent:'center',
        marginTop: 20,
    },
    boxBottom:{
        height:Dimensions.get('window').height/3,
        width:'40%',
        alignItems:'center',
        marginBottom: -40,
        paddingTop: 40
    },
    logo:{
        width: 250,
        height: 250,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    textTitle:{
        fontFamily:'inter',
        color:'#fff',
        fontWeight:'bold',
        fontSize: 18,
        letterSpacing: 2,
        paddingLeft: 8,
        marginTop: 15,
        marginBottom: 2,
    },
    boxInput:{
        width:'100%',
        height: 45,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: '#F6F8FA',
        borderRadius: 20,
        marginTop: 12,
        marginBottom: 8,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 10,
    },
    textInput:{
        flex: 1,
        height:'100%',
        fontSize: 15,
        color: '#222',
        paddingLeft: 5,
        backgroundColor: 'transparent',
    },
    button:{
        width: '100%',
        height: 48,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#1A5DB2',
        borderRadius: 24,
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height: 4
        },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 6,
    },
    textButton:{
        fontSize: 18,
        fontWeight:'bold',
        color:'#fff',
        letterSpacing: 1,
    },
    textForget:{
        alignSelf:'flex-start',
        paddingLeft: 8,
        fontSize: 15,
        fontWeight:'500',
        color:'#E9EDF6',
        marginTop: 10,
        marginBottom: 10,
    },
    textBotton:{
        fontSize: 15,
        fontWeight:'bold',
        color:'#fff'
    }
})