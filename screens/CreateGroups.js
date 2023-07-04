import { NavigationContainer, useNavigation } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, FlatList, SectionList, ScrollView} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import AccountContext from "../context/AccountContext";
import { LinearGradient } from 'expo-linear-gradient';
import GroupContext from "../context/GroupContext";



const CreateGroup = ({route}) => {

    const { user } = useContext(AccountContext);
    const { handleCreateGroup, groupCategory } = useContext(GroupContext);
    const [ groupPicture, setGroupPicture ] = useState('');
    const [ groupDescription, setGroupDescription ] = useState('');
    const [ groupName, setGroupName ] = useState('');
    const navigation = useNavigation();
    const [ showBox, setShowBox] = useState(false);

    useEffect(() => {
        if(route?.params?.image!=undefined)
        {
            setGroupPicture(route?.params?.image)
        }
    },[route])


    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [5, 5],
    //         quality: 0.5
    //     });
    //     console.log(result);
    //     if(!result.canceled){
    //         setGroupPicture(result.assets[0].uri);
    //     }
    //     console.log(user.user.email);
    // };

    const pickImage = () => {
        navigation.navigate('GroupImagePicker', {prevScreen: 'CreateGroup'});
    }



    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView 
                    behavior='position' 
                    style={styles.container}
                >

                    <Text style={styles.title}>Create a new group</Text>

                    {groupPicture === ''
                        ?
                            <Image
                                style = {styles.image}
                                source = {{ uri: 'https://www.fil.ion.ucl.ac.uk/wp-content/uploads/2019/05/grey-background.jpg' }}
                            />
                        : 
                            <Image
                                style = {styles.image}
                                source={{uri: groupPicture}}
                            />
                    }

                    <TouchableOpacity
                    style={styles.addImageButton}
                    onPress={()=>{pickImage()}}
                    >
                        <Ionicons name='add' size={40} color='green'/>
                    </TouchableOpacity>

                    <Text style={styles.headings}>Group Name</Text>
                    <TextInput
                    placeholder="Enter Group Name..."
                    value={groupName}
                    onChangeText={text => setGroupName(text)}
                    style={styles.input}
                    />

                    <Text style={styles.headings}>Group Description</Text>
                    <TextInput
                    placeholder="Enter Group Description..."
                    value={groupDescription}
                    multiline
                    onChangeText={text => setGroupDescription(text)}
                    style={styles.inputDescription}
                    />

                    <TouchableOpacity 
                        style={styles.submitButton}
                        onPress={() => {
                            if(groupPicture!=''&&groupDescription!=''&&groupName!='')
                            {
                                handleCreateGroup(groupPicture, groupDescription, groupName, user.user.email, navigation)
                            }
                            else(
                                alert('Make sure all fields are completed.')
                            )
                            
                        }}
                    >
                        <Text style={styles.submitText}>Submit Changes</Text>
                    </TouchableOpacity>

                    <LinearGradient 
                            colors={['rgba(0,230,64,0.6)','transparent']}
                            style={styles.circle}
                    />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default CreateGroup

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize:20,
        letterSpacing: 5
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
    addImageButton: {
        backgroundColor: '#b3feac',
        height: 50,
        width: 50,
        borderRadius: 25,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 4,
        top: 230,
        left: 230
    },
    headings: {
        marginTop: 30,
        marginLeft: 25,
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 4
    },
    input: {
          backgroundColor: 'rgba(0,0,0,0.1)',
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          paddingTop: 10,
          paddingLeft:15,
          paddingBottom: 10,
          paddingRight: 10,
          borderRadius:10,
          maxHeight: 60,
          minHeight: 40
    },
    inputDescription: {
        backgroundColor: 'rgba(0,0,0,0.1)',
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          paddingTop: 10,
          paddingLeft:15,
          paddingBottom: 10,
          paddingRight: 10,
          borderRadius:10,
          maxHeight: 160,
          minHeight: 100
    },
    circle:{
        marginTop: 500,
        height: 1000,
        width: 1000,
        borderRadius: 500,
        position:'absolute',
        zIndex: -1,
        alignSelf: 'center'
    },
    submitButton: {
        backgroundColor: '#b3feac',
        width: 200,
        alignItems:'center',
        alignSelf: 'center',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        marginTop: 30
      },
      imagePickerContainer: {
          position: 'absolute',
          backgroundColor: 'pink',
          width: '90%',
          height: '90%',
          zIndex: 1,
          alignSelf: 'center',
          marginTop: '5%',
          borderRadius: 10
      },
      imageTitle: {
          alignSelf: 'center',
          marginTop: 20,
          fontSize: 20,
          fontWeight: '600'
      },
      submitImageButton: {
        backgroundColor: '#b3feac',
        width: 100,
        alignItems:'center',
        alignSelf: 'center',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3
      },
      section:{
          backgroundColor: 'grey',
          width: '80%',
          alignSelf: 'center',
          marginBottom: 10,
          padding: 10,
          borderRadius: 5
      },
      images:{
          width: 120,
          height: 120,
          borderRadius: 10,
          margin: 10
      },
      list: {
          backgroundColor: 'blue',
          flex:1
      },
      scrool:{
          backgroundColor: 'purple',
          margin: 10,
      },
      
        
})