import React from "react";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import AccountContext from "../context/AccountContext";
import GroupContext from "../context/GroupContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer, useNavigation, useFocusEffect } from "@react-navigation/native"
import { LinearGradient } from 'expo-linear-gradient';

const EventPage = ({route}) => {

    const eventID = route.params.eventID;
    const groupID = route.params.groupID;
    const { handleFetchEventData, currentEvent, handleFetchGroupData, currentGroup, handleCheckIfAttending, ifAttending, handleAddMemberToEvent, handleRemoveMemberFromEvent } = useContext(GroupContext);
    const { user } = useContext(AccountContext);
    const navigation = useNavigation();

    const [ eventDetails, setEventDetails ] = useState('');
    const [ eventEnd, setEventEnd ] = useState('');
    const [ eventLimit, setEventLimit ] = useState('');
    const [ eventLocation, setEventLocation ] = useState('');
    const [ eventName, setEventName ]= useState('');
    const [ eventParticipants, setEventParticiapnts ] = useState('');
    const [ eventPicture, setEventPicture ] = useState('');
    const [ eventStart, setEventStart ] = useState('');
    const [ groupName, setGroupName ] = useState('');
    const [ ifMember, setIfMember ] = useState(false);

    useFocusEffect(
        React.useCallback(() =>{
            handleFetchEventData(eventID);
            handleFetchGroupData(groupID);
            handleCheckIfAttending(eventID, user.user.email);
        }, [])
    )

    useEffect(() => {
        setIfMember(ifAttending)
    }, [ifAttending])

    useEffect(() => {
        setEventDetails(currentEvent.EventDetails);
        setEventEnd(currentEvent.EventEnd);
        setEventLimit(currentEvent.EventLimit);
        setEventLocation(currentEvent.EventLocation);
        setEventName(currentEvent.EventName);
        setEventParticiapnts(currentEvent.EventParticipants);
        setEventPicture(currentEvent.EventPicture);
        setEventStart(currentEvent.EventStart);
    },[currentEvent])
   
    useEffect(() => {
        setGroupName(currentGroup.GroupName)
    },[currentGroup])


    return(    
        <View style={styles.container}>

            {
                    eventPicture!=''
                    ?
                        <Image
                            source={{uri: eventPicture}}
                            style={styles.image}
                        />
                    :
                        <Image
                            source={{uri: "https://img.freepik.com/free-vector/groovy-psychedelic-colorful-background_23-2149075813.jpg"}}
                            style={styles.image}
                        />

                }

            <View style={styles.eventContainer}>

                <Text style={styles.eventTitle}>{eventName}</Text>
                <Text style={styles.eventGroupName}>Group: {groupName}</Text>
                <Text style={styles.detailText}>Event Details</Text>
                <Text style={styles.detailInnerText}>{eventDetails}</Text>
                <Text style={styles.locationText}>Event Location</Text>
                <Text style={styles.locationInnerText}>{eventLocation}</Text>
                <Text style={styles.start}>Event Start and End</Text>
                <Text style={styles.startText}>{eventStart} - {eventEnd}</Text>
                <Text style={styles.attending}>Attending: {eventParticipants} </Text>
                <Text style={styles.limit}>Event Limit: {eventLimit}</Text>

            </View>

            {(ifMember === false && eventLimit!=eventParticipants) && 
                <View style={styles.editGroupContainer}>
                    <TouchableOpacity style={styles.editPopUp} onPress={() => {
                        handleAddMemberToEvent(eventID, user.user.email, navigation, groupID, groupName)
                    }}>
                        <Ionicons name='add' size={22} color='green'/>
                        <Text style={styles.editText}>Join Event</Text>
                    </TouchableOpacity>
                </View>
            }
            {(ifMember === false && eventLimit==eventParticipants) && 
                <View style={styles.editGroupContainer}>
                <View style={styles.leavePopUp}>
                    <Text style={styles.leaveText}>Event is Full</Text>
                </View>
                </View>
            }
            {ifMember === 'created' && 
            <View style={styles.editGroupContainer}>
                <TouchableOpacity style={styles.editPopUp} onPress={() => {   
                    navigation.navigate('EditEvent', {    
                        eventName: eventName,
                        eventPic: eventPicture,
                        eventLocation: eventLocation,
                        eventGroup: groupName,
                        groupID: groupID,
                        eventStart: eventStart,
                        eventEnd: eventEnd,
                        eventDetails: eventDetails,  
                        eventCapacity: eventLimit,
                        eventID: eventID
                    })
                }}>
                    <Ionicons name='pencil-outline' size={22} color='green'/>
                    <Text style={styles.editText}>Edit Event</Text>
                </TouchableOpacity>
            </View>
            }
            {ifMember === 'attending' && 
                <View style={styles.editGroupContainer}>
                    <TouchableOpacity style={styles.leavePopUp} onPress={() => {
                        handleRemoveMemberFromEvent(eventID, user.user.email, navigation, groupID)
                    }}>
                        <Ionicons name='remove-outline' size={22} color='darkred'/>
                        <Text style={styles.leaveText}>Leave Event</Text>
                    </TouchableOpacity>
                </View>
            }

            <LinearGradient 
                colors={['rgba(0,230,64,0.6)','transparent']}
                style={styles.circle}
            />

        </View>
    )
}

export default EventPage;

const styles = StyleSheet.create({
    container: {
        flex:1, 
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
    eventContainer: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 80,
        paddingBottom: 30
    },
    image: {
        height: 140,
        width: 140,
        borderRadius: 70,
        position: 'absolute',
        top: 10,
        left: 145
    },
    eventTitle: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 80,
        fontWeight: '500',
        letterSpacing:3
    },
    eventGroupName: {
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: '400',
        letterSpacing: 3,
        width: '90%',
        textAlign: 'center'
    },
    detailText: {
        fontSize: 15,
        letterSpacing: 3,
        fontWeight: '600',
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 5
    },
    detailInnerText: {
        marginLeft: 10
    },
    locationText: {
        marginLeft: 10,
        marginTop: 10,
        fontWeight: '600',
        letterSpacing: 3,
        marginBottom: 5,
        fontSize: 15
    },
    locationInnerText: {
        marginLeft:10
    },
    start: {
        fontSize: 15,
        marginLeft: 10,
        marginTop: 10,
        letterSpacing: 3,
        fontWeight: '600',
        marginBottom: 5
    },
    startText: {
        marginLeft: 10
    },
    attending: {
        fontWeight: '600',
        fontSize: 15,
        marginLeft: 10,
        marginTop: 15,
        letterSpacing: 3
    },
    limit: {
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 3,
        marginLeft: 10,
        marginTop: 10
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
    leavePopUp: {
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
    }

});