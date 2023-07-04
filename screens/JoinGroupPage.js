import React, { useContext, useEffect, useState } from "react";
import GroupContext from "../context/GroupContext";
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AccountContext from "../context/AccountContext";
import { useFocusEffect } from "@react-navigation/native";

const JoinGroupPage = ({route}) => {

    const { handleFetchGroupData, currentGroup, handleAddMemberToGroup } = useContext(GroupContext);
    const { user } = useContext(AccountContext);
    const [ toggle, setToggle ] = useState(false);
    const navigation = useNavigation();
    const [ groupID, setGroupID ] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            console.log('focus '+route.params.groupID);
            handleFetchGroupData(route.params.groupID)
            setGroupID(route.params.groupID)
            console.log(' here group id is '+groupID)
        },[route.params?.groupID]),
    )


    return (
        <View style={styles.container}>
            {toggle===true &&
                <View style={styles.popUp}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.checkText}>Are you sure you want to join:</Text>
                        <Text style={styles.groupName}>{currentGroup.GroupName}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.checkButton} onPress={() => {
                                handleAddMemberToGroup(currentGroup.GroupID, user.user.email, navigation, currentGroup.GroupName, currentGroup.GroupDescription, currentGroup.GroupPicture, currentGroup.GroupMembers)
                                }}>
                                <Text>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkButton} onPress={() => setToggle(false)}>
                                <Text>No</Text>
                            </TouchableOpacity>
                        </View>


                    </View>

                </View>
            }

            {currentGroup.GroupPicture!=''
                ?
                    <Image 
                        source={{uri: currentGroup.GroupPicture}}
                        style={styles.groupPic}
                    />
                :
                    <Image 
                        source={{uri: "https://img.freepik.com/free-vector/groovy-psychedelic-colorful-background_23-2149075813.jpg"}}
                        style={styles.groupPic}
                    />
            }

            <Text style={styles.title}>{currentGroup.GroupName}</Text>
            <Text style={styles.members}>Members: {currentGroup.GroupMembers}</Text>

            <View style={styles.descContainer}>
                <Text style={styles.descText}>{currentGroup.GroupDescription}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => {
                setToggle(true);

            }}>
                <Text>Join Group</Text>
            </TouchableOpacity>

            <LinearGradient 
                        colors={['rgba(0,230,64,0.6)','transparent']}
                        style={styles.circle}
            />

        </View>
    )


}

export default JoinGroupPage;

const styles = StyleSheet.create({
    container:{
        flex: 1

    },
    groupPic: {
        height: 200,
        width: 200,
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: 25
    },
    title: {
        fontSize: 20,
        letterSpacing: 5,
        width: '80%',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 20,
        fontWeight: '600'
    },
    members:{
        fontSize: 20,
        fontWeight: '400',
        letterSpacing: 5,
        marginTop: 10,
        alignSelf: 'center'
    },
    descContainer: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '80%',
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
    },
    descText: {
        fontWeight: '400',
        fontSize: 15,
        textAlign: 'center'
    },
    button: {
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
        marginTop: 50
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
    popUp: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: '100%',
        height: '100%',
        zIndex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    innerContainer: {
        backgroundColor: 'white',
        width: '80%',
        height: '40%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    checkButton:{
        backgroundColor: '#b3feac',
        width: 100,
        alignItems:'center',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        marginTop: 10
    },
    buttonContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
        marginTop: 30

    },
    checkText: {
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 3,
        margin: 30,
        alignSelf: 'center',
        textAlign: 'center'
    },
    groupName: {
        fontSize: 25,
        fontWeight: '600',
        letterSpacing: 3,
        alignSelf: 'center',
        textAlign: 'center'
    }
    

});