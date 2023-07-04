import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, TouchableWithoutFeedback, Keyboard, FlatList, SectionList, ScrollView} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { LinearGradient } from 'expo-linear-gradient';
import GroupContext from "../context/GroupContext";
import AccountContext from "../context/AccountContext";

const EditGroup = ({route}) => {

    const [ groupID, setGroupID ] = useState(route.params.groupID);
    const [ groupName, setGroupName ] = useState(route.params.groupName);
    const [ groupDescription, setGroupDescription ] = useState(route.params.groupDescription);
    const [ groupPicture, setGroupPicture ] = useState(route.params.groupPicture);
    const navigation = useNavigation();
    const { handleEditGroup } = useContext(GroupContext);
    const { user } = useContext(AccountContext);
    console.log(route.params)

    const pickImage = () => {
        navigation.navigate('GroupImagePicker', {prevScreen: 'EditGroup'});
    }

    useEffect(() => {
        if(route?.params?.image!=undefined)
        {
            setGroupPicture(route?.params?.image)
            console.log(route?.params?.image)
        }
    },[route])


    return(
        <TouchableOpacity onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.container}>
                <Text style={styles.title}>Edit Group</Text>

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
                    <Ionicons name='pencil-outline' size={25} color='green'/>
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

                <LinearGradient 
                        colors={['rgba(0,230,64,0.6)','transparent']}
                        style={styles.circle}
                />

                <TouchableOpacity 
                    style={styles.submitButton}
                    onPress={() => {
                        if(groupPicture!=''&&groupDescription!=''&&groupName!='')
                        {
                            handleEditGroup(groupID, groupPicture, groupDescription, groupName, navigation, user.user.email)
                        }
                        else(
                            alert('Make sure all fields are completed.')
                        )
                        
                    }}
                >
                    <Text style={styles.submitText}>Submit Changes</Text>
                </TouchableOpacity>

            </View>
        </TouchableOpacity>
        
    )
}

export default EditGroup;

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize:20,
        letterSpacing: 5, 
        textAlign: 'center'
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

})