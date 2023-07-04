import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import AccountContext from '../context/AccountContext';
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { addDoc, collection, doc, setDoc, getDoc } from "firebase/firestore";
import Ionicons from '@expo/vector-icons/Ionicons'
import { getDownloadURL, ref } from "firebase/storage";
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const { handleFetchUserData, userData } = useContext(AccountContext);
    const navigation = useNavigation();

    const [userAbout, setUserAbout] = useState('');
    const [userAvailability, setUserAvailability] = useState('');
    const [userProfilePic, setProfilePic] = useState('');

    useEffect( () => {
        handleFetchUserData();
        console.log('useEffect fetch')
    }, []);

    useEffect(() =>{
        setUserAbout(userData.About);
        setUserAvailability(userData.Availability)
        setProfilePic(userData.ProfilePic)
        console.log('useffect set')
    },[userData])

    return (
        <View>
            {userData.ProfilePic === '' 
                ?
                    <Image 
                        style={styles.image}
                        source={{uri: 'https://t3.ftcdn.net/jpg/05/54/48/78/360_F_554487892_fTLKkQq7AifYvctsBOeGxoZMIB2XDAaw.jpg'}}
                    />
                :
                    <Image 
                    style={styles.image}
                    source={{uri: userData.ProfilePic}}
                    />
            }

            <Text style={styles.DisplayName}> {userData.DisplayName} </Text>

            <TouchableOpacity 
                style={styles.editButton}
                onPress={() => {navigation.replace('EditProfile')} }
            >
                <Ionicons name='pencil-outline' size={20} color="green"/>
                <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>

            <View style={styles.userContainer}>
                <Text style={styles.sectionTitle}>About me</Text>
                <Text style={styles.innerSection} >{userAbout}</Text>
                <Text style={styles.sectionTitle}>Availability</Text>
                <Text style={styles.innerSection}>{userAvailability}</Text>

            </View>

            <LinearGradient 
                    colors={['rgba(0,230,64,0.6)','transparent']}
                    style={styles.circle}
            />
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle:{
        top:500,
        left:-275,
        right:0,
        bottom:0,
        height: 1000,
        width: 1000,
        borderRadius: 500,
        position:'absolute',
        zIndex: -1
    },
    openButton:{
        position: 'absolute',
        top: 20, 
        right: 20,
    },
    image:{
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: 30,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    DisplayName:{
        fontSize: 25,
        alignSelf: 'center',
        letterSpacing: 5,
        marginTop: 20,
    },
    editButton:{
        alignSelf: 'center',
        backgroundColor: '#b3feac',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    editText:{
        marginLeft: 10,
        color: 'darkgreen',
        fontSize: 15,
        fontWeight: '700',
    },
    userContainer:{
        width: '85%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignSelf: 'center',
        marginTop: 25,
        borderRadius: 10,
        paddingBottom: 20,
    },
    sectionTitle:{
        paddingTop: 15,
        paddingLeft: 20,
        fontWeight: '600',
        fontSize: 17,
        letterSpacing: 3,
    },
    innerSection:{
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        // color: 'white'

    }
  });