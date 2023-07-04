import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Keyboard, TouchableWithoutFeedback, ImagePickerIOS } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useEffect } from "react";
import AccountContext from '../context/AccountContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { storage, db, auth } from "../config/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { LogBox } from "react-native";

LogBox.ignoreLogs(['Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead']);

const EditProfile = () => {

    const { user, handleFetchUserData, userData } = useContext(AccountContext);
    const [userAbout, setUserAbout] = useState('');
    const [userAvailability, setUserAvailability] = useState('');
    const [userProfilePic, setProfilePic] = useState('');
    const navigation = useNavigation();

    useEffect( () => {
        setUserAbout(userData.About);
        setUserAvailability(userData.Availability)
        setProfilePic(userData.ProfilePic)
        console.log('new screen')
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [5, 5],
            quality: 0.5
        });
        console.log(result);
        if(!result.canceled){
            setProfilePic(result.assets[0].uri);
        }
        console.log(user.user.email);
    };

    const handleChangesToUserProfile = async () => {
        const storageRef = ref(storage, '/userProfiles/'+user.user.email+'.jpeg');
        await fetch(userProfilePic)
            .then(response => response.blob())
            .then(blob => {
                uploadBytesResumable(storageRef, new File([blob], {type: 'image/jpeg'}))
                .then( (snap) => 
                {
                    console.log(snap.ref),
                    getDownloadURL(snap.ref)
                    .then((url) => {
                        updateDoc(doc(db, "Users", user.user.email), {
                            ProfilePic: url,
                            About: userAbout,
                            Availability: userAvailability
                        })
                        .then(
                            console.log('updated doc'),
                            navigation.replace('Profile')
                        )     
                    })         
                })
            })
            .catch(() => {
                updateDoc(doc(db, "Users", user.user.email), {
                    ProfilePic: "",
                    About: userAbout,
                    Availability: userAvailability
                })
                .then(navigation.replace('Profile'))
            })
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
                {userProfilePic === '' 
                    ?
                        <Image 
                            style={styles.image}
                            source={{uri: 'https://t3.ftcdn.net/jpg/05/54/48/78/360_F_554487892_fTLKkQq7AifYvctsBOeGxoZMIB2XDAaw.jpg'}}
                        />
                    :
                        <Image 
                        style={styles.image}
                        source={{uri: userProfilePic}}
                        />
                }

            <TouchableOpacity 
                style={styles.editButton}
                onPress={() => {pickImage()}}
            >
                <Ionicons name='pencil-outline' size={20} color="green"/>
            </TouchableOpacity>

                <Text style={styles.DisplayName}> {userData.DisplayName} </Text>

                <Text style={styles.sectionTitle}>About me</Text>
                <TextInput
                        placeholder='Enter About Yourself...'
                        value={userAbout}
                        multiline
                        onChangeText={text => setUserAbout(text)}
                        style={styles.innerInput}
                    />

                <Text style={styles.sectionTitle}>Availability</Text>
                <TextInput 
                        placeholder='Enter Your Availability...'
                        value={userAvailability}
                        multiline
                        onChangeText={text => setUserAvailability(text)}
                        style={styles.innerInput}
                    />

                <TouchableOpacity 
                    style={styles.submitButton}
                    onPress={() => {handleChangesToUserProfile()}}
                >
                    <Text style={styles.submitText}>Submit Changes</Text>
                </TouchableOpacity>

                <LinearGradient 
                        colors={['rgba(0,230,64,0.6)','transparent']}
                        style={styles.circle}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    
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
          paddingLeft: 30,
          fontWeight: '600',
          fontSize: 17,
          letterSpacing: 3,
      },
      innerInput: {
          backgroundColor: 'rgba(0,0,0,0.1)',
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          paddingTop: 10,
          paddingLeft:15,
          paddingBottom: 10,
          paddingRight: 10,
          borderRadius:10,
          maxHeight: 1000,
      },
      editButton:{
        backgroundColor: '#b3feac',
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        padding: 13,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        position: 'absolute',
        top: 180,
        left: 230
      },
      submitButton: {
        backgroundColor: '#b3feac',
        width: 200,
        alignItems:'center',
        alignSelf: 'center',
        padding: 15,
        borderRadius: 10,
        marginTop: 200,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
      },
      submitText: {
          fontSize: 15,
          fontWeight: '500',
          color: 'darkgreen'
      }
});