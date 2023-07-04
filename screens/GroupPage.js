import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, TouchableWithoutFeedback, Keyboard, FlatList } from "react-native"
import GroupContext from "../context/GroupContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import { getMediaLibraryPermissionsAsync } from "expo-image-picker";
import AccountContext from "../context/AccountContext";
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { LinearGradient } from 'expo-linear-gradient';



const GroupPage = ({route}) => {

    const { handleFetchGroupData, currentGroup, handleCheckIfJoinedMember, ifMemberOfCurrentGroup, handleRemoveMemberFromGroup, handleCheckIfManagedMember, ifManagerOfGroup, handleFetchAllEvents, handleFetchGroupsEvents, currentGroupsEvents } = useContext(GroupContext);
    const { user } = useContext(AccountContext);
    const [ groupDescription, setGroupDescription ] = useState('');
    const [ groupName, setGroupName ] = useState('');
    const [ groupPicture, setGroupPicture ] = useState('');
    const [ GroupMembers, setGroupMembers ] = useState('');
    const [ ifMember, setIfMember ] = useState(ifMemberOfCurrentGroup);
    const [ ifManager, setIfManager ] = useState(ifManagerOfGroup)
    const [ leaveToggle, setLeaveToggle ] = useState(false);
    const [ groupEvents, setGroupEvents ] = useState([]);
    const navigation = useNavigation();
    

    useEffect(() => {
        handleFetchGroupData(groupID);
        handleCheckIfJoinedMember(groupID);
        handleCheckIfManagedMember(groupID);
        handleFetchGroupsEvents(groupID);
    }, []);        

    useEffect(() => {
        setGroupEvents(currentGroupsEvents);
    },[currentGroupsEvents]);

    useEffect(() =>{
        setGroupDescription(currentGroup.GroupDescription);
        setGroupName(currentGroup.GroupName)
        setGroupPicture(currentGroup.GroupPicture)
        setGroupMembers(currentGroup.GroupMembers);
        console.log(currentGroup.GroupPicture)
    },[currentGroup])

    useEffect(() => {
        setIfMember(ifMemberOfCurrentGroup);
        console.log(ifMemberOfCurrentGroup);
    }, [ifMemberOfCurrentGroup])

    useEffect(() => {      
        setIfManager(ifManagerOfGroup);
        console.log('Is the User a Manager: '+ifManagerOfGroup);
    }, [ifManagerOfGroup])

    const groupID = route.params.groupID;

    return(
        <View style={styles.container}>

            <View style={styles.groupContainer}>
                <Text style={styles.groupTitle}>{groupName}</Text>
                <Text style={styles.groupText}>{GroupMembers} Members </Text>
            </View>

            <Text style={styles.info}>{groupDescription}</Text>

            <View style={styles.eventcontainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.eventtitle}>Group Events</Text>
                    
                    <TouchableOpacity
                    >
                        <Text style={styles.eventView}>View all</Text>
                    </TouchableOpacity>
                </View>
                
                {
                    currentGroupsEvents.length==0 && <Text style={styles.noEvents}>There are currently no events.</Text>
                }

                <FlatList
                    data={currentGroupsEvents}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Events', {screen: 'EventPage', params: {eventID: item.EventID, groupID: item.GroupID}})
                            }}
                        >
                            <View style={styles.eventContainer}>
                                <Image 
                                    source={{uri: item.EventPicture}}
                                    style={styles.eventPicture}
                                />
                                <View>
                                    <Text style={styles.boldTextTitle}>{item.EventName}</Text>
                                    <Text style={styles.innerText}><Text style={styles.boldText}>Location: </Text>{item.EventLocation}</Text>
                                    <Text style={styles.innerText}><Text style={styles.boldText}>Time: </Text>{item.EventStart}</Text>
                                    <Text style={styles.innerText}><Text style={styles.boldText}>Group: </Text>{item.GroupName}</Text>

                                </View>

                            </View>
                        </TouchableOpacity>
                    }
                />
                
            </View>

            

            <View style={styles.eventcontainertwo}>
                <View style={styles.rowContainer}>
                    <Text style={styles.eventtitle}>Group Forum</Text>
                    <TouchableOpacity
                    >
                        <Text style={styles.eventView}>View all</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.noEvents}>There are currently no Forum posts.</Text>
            </View>

            
            {
                groupPicture!='' 
                ?
                    <Image
                    source={{uri: groupPicture}}
                    style={styles.groupPic}
                    />
                :
                <Image
                    source={{uri: "https://img.freepik.com/free-vector/groovy-psychedelic-colorful-background_23-2149075813.jpg"}}
                    style={styles.groupPic}
                />
                
            }

            {
                ifMember===true &&
                <View style={styles.leaveGroupContainer}>
                    <TouchableOpacity style={styles.leavePopUp} onPress={() => {setLeaveToggle(true)}}>
                        <Ionicons name='trash-outline' size={22} color='darkred'/>
                        <Text style={styles.leaveText}>Leave Group</Text>
                    </TouchableOpacity>
                </View>
            }

            {
                ifManager===true &&
                <View style={styles.editGroupContainer}>
                    <TouchableOpacity style={styles.editPopUp} onPress={() => {navigation.navigate('EditGroup', {groupID: groupID, groupName: groupName, groupDescription: groupDescription, groupPicture: groupPicture})}}>
                        <Ionicons name='pencil-outline' size={22} color='green'/>
                        <Text style={styles.editText}>Edit Group</Text>
                    </TouchableOpacity>
                </View>
            }

            {
                leaveToggle===true && 
                <View style={styles.modal}>
                    <View style={styles.innerModal}>
                        <Text style={styles.innerModalText}>Are you sure you want to leave the group?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.leaveButton} onPress={() => {handleRemoveMemberFromGroup(groupID, user.user.email, navigation)}}>
                                <Text style={styles.leaveButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.leaveButton} onPress={() => {setLeaveToggle(false)}}>
                                <Text style={styles.leaveButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            }

            <LinearGradient 
                    colors={['rgba(0,230,64,0.6)','transparent']}
                    style={styles.circle}
            />
            
        </View>
    )
}

export default GroupPage;

const styles = StyleSheet.create({
    groupPicture: {
        height: 300
    },
    groupPic: {
        height: 150,
        width: 150,
        borderRadius: 75,
        position:'absolute',
        top: 15,
        left: 20
    },
    groupContainer:{
        width: '80%',
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        marginTop: 45,
        alignSelf: 'center',
        padding: 20
    },
    groupText: {
        marginLeft: 120,
        fontSize: 15,
        letterSpacing: 1
    },
    groupTitle: {
        marginLeft: 120,
        fontSize: 15,
        letterSpacing: 1,
        fontWeight: '600',
        marginBottom: 5
    },
    info: {
        marginTop: 50,
        alignSelf: 'center',
        fontSize: 15,
        width: '90%'
    },
    eventtitle: {
        fontSize: 20,
        letterSpacing: 5,
        marginTop: 10
    },
    forumtitle: {
        fontSize: 20,
        letterSpacing: 5,
        marginTop: 60
    },
    eventcontainer:{
        width: '90%',
        alignSelf: 'center',
        height: '30%'
    },
    eventView: {
        fontSize: 15,
        letterSpacing: 3,
        marginLeft: '45%',
        marginTop: 15,
        color: 'grey'
    }, 
    eventcontainertwo:{
        marginTop: 5,
        width: '90%',
        alignSelf: 'center',
        height: '30%'
    },
    noEvents: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 13,
        letterSpacing:3
    },
    leavePopUp:{
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: 'darkred'
    },
    leaveText: {
        marginTop: 2.5,
        color: 'darkred',
        fontWeight: '500',
        marginLeft: 5,
        fontSize: 15,
        letterSpacing: 1
    },
    leaveGroupContainer: {
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center'
    },
    container: {
        flex: 1,
    },
    modal : {
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    innerModal: {
        backgroundColor: 'white',
        width: '70%',
        height: '20%',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 80,
        padding: 20
    },
    innerModalText: {
        alignSelf:'center',
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 2,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 30   
    },
    leaveButton: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 8,
        borderRadius: 10,
        width: 75,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    leaveButtonText: {
        fontSize: 15,
        alignSelf: 'center'
    },
    editGroupContainer: {
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center'
    },
    editText: {
        marginTop: 2.5,
        color: 'green',
        fontWeight: '500',
        marginLeft: 5,
        fontSize: 15,
        letterSpacing: 1
    },
    editPopUp: {
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: 'green'

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
    rowContainer: {
        flexDirection: 'row'
    },
    eventContainer: {
        width: '100%',
        height: 90,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginTop: 5,
        borderRadius: 10,
        flexDirection: 'row'
    },
    eventPicture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginLeft: 10,
        marginTop: 10,
        marginRight: 5
    },
    boldTextTitle: {
        fontWeight: '700',
        fontSize: 15,
        marginTop: 5,
        marginBottom: 2
    },
    boldText:{
        fontWeight: '600'
    },
    innerText: {
        marginBottom: 1
    }
});