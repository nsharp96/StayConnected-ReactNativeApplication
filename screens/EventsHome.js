import { NavigationContainer, useNavigation, useFocusEffect } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, Image } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons'
import GroupContext from "../context/GroupContext";
import AccountContext from "../context/AccountContext";
import DropDownPicker from "react-native-dropdown-picker";
import EditProfile from "./EditProfile";

const EventsHome = () => {

    const [ searchEvent, setSearchEvent ] = useState('');
    const {  handleFetchAllCreatedEventsAndAttending, createdEvents, attendingEvents, allUserEvents, handleFetchAllEvents } = useContext(GroupContext);
    const { user } = useContext(AccountContext);
    const navigation = useNavigation();
    const [ displayedEvents, setDisplayedEvents ] = useState();

    const [ open, setOpen ] = useState(false);
    const [ value, setValue ] = useState('');
    const [ filter, setFilter ] = useState([
        {label: 'All', value: 'All'},
        {label: 'Created', value: 'Created'},
        {label:'Attending', value: 'Attending'}
    ])

    useFocusEffect(
        React.useCallback(() => {
            handleFetchAllEvents(user.user.email);
           
        }, [])
    )

    useEffect(() => {
        setDisplayedEvents(allUserEvents);
    },[allUserEvents])

    useEffect(() => {
        console.log('value: '+value)
        if(value==='All'){
            setDisplayedEvents(allUserEvents)
        }
        else if(value==='Created')
        {
            setDisplayedEvents(createdEvents)
        }
        else if(value ==='Attending')
        {
            setDisplayedEvents(attendingEvents)
        }
    }, [value])



    return (
        <View style={styles.container}>
            
            <View style={styles.searchContainer}>
                <Ionicons name='search' size={22} color="black"/>
                <TextInput 
                    placeholder="Search for Event..."
                    value={searchEvent}
                    onChangeText={text => setSearchEvent(text)}
                    style={styles.searchText}  
                    returnKeyType="search"
                    onSubmitEditing={()=> {navigation.navigate('SearchEvents', {search: searchEvent})}}
                />
            </View>

            <View style={styles.topButtons}> 
                <DropDownPicker
                    open={open}
                    value={value}
                    items={filter}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setFilter}
                    containerStyle={styles.dropDownStyle}
                    placeholder="Filter by..."
                    listMode="SCROLLVIEW"
                    dropDownDirection="BOTTOM"
                />

                <TouchableOpacity
                    style={styles.createEventContainer}
                    onPress={() => {navigation.navigate('CreateEvent')}}
                >
                    <Ionicons name='add' size={22} color='darkgreen' />
                    <Text style={styles.createEventText}>Create Event</Text>
                </TouchableOpacity>

            </View>

           

            <View style={styles.ownEventContainer}>
                <FlatList
                    data={displayedEvents}
                    renderItem={({item}) => 
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('EventPage',{eventID: item.EventID, groupID: item.GroupID})
                        }}
                    >
                        <View style={styles.createdEventInsideContainer}>
                            <View style={styles.createdEventRowContainer}>
                                <View>
                                    <Image
                                        source={{uri: item.EventPicture}}
                                        style={styles.eventPicture} 
                                    />
                                </View>
                                <View style={styles.eventTextContainer}>
                                    <Text style={styles.eventTitle}>{item.EventName}</Text>
                                    <Text><Text style={styles.bold}>Location:</Text> {item.EventLocation}</Text>
                                    <Text style={styles.timeText}><Text style={styles.bold}>Time: </Text>{item.EventStart}</Text>
                                    <Text><Text style={styles.bold}>Group:</Text> {item.GroupName}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                }
                
                />
            </View>

            <LinearGradient 
                        colors={['rgba(0,230,64,0.6)','transparent']}
                        style={styles.circle}
            />
        </View>


    )
}

export default EventsHome

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        height: '100%',
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
    searchContainer: {
        width: '90%',
        minHeight: 50,
        height: '6%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginTop: 20,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchText: {
        marginLeft: 10,
        width: '100%',
        height: '100%'
    },
    createEventText:{
        color: 'darkgreen',
        marginTop: 3
    },
    createEventContainer:{
        flexDirection: 'row',
        backgroundColor: '#b3feac',
        borderRadius: 10,
        padding: 10,
        marginTop: 15,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        marginBottom: 15,
        marginRight: 15
    },
    ownEventContainer: { 
        width: '90%',
        marginBottom: 150,
        height: '90%'
    },
    ownEventText: {
        fontSize: 20,
        letterSpacing: 5, 
        marginLeft: 15
    },
    groupEventsContainer: {
        backgroundColor: 'pink',
        height: '45%',
        marginTop: '5%',
        width: '90%'
    },
    groupEventTitle: {
        fontSize: 20,
        letterSpacing: 5,
        marginLeft: 15
    },
    createdEventInsideContainer: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignSelf: 'center',
        margin: 10,
        padding: 5,
        borderRadius: 5,
    },
    createdEventRowContainer: {
        flexDirection: 'row',
        margin: 5
    },
    eventPicture: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    eventTextContainer: {
        width: '70%',
        marginLeft: 10
    },
    eventTitle: {
        fontWeight: '600',
        fontSize: 18,
        letterSpacing: 2,
        marginBottom: 5
    },
    bold: {
        fontWeight: '600'
    },
    editButton: {
        backgroundColor: '#b3feac',
        textAlign: 'center',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        padding: 6,
        borderRadius: 10,
    },
    editText: {
        color: 'darkgreen',
        fontWeight: '400',
        letterSpacing: 2,
        alignSelf: 'center'
    },
    viewButton: {
        backgroundColor: 'white',
        borderRadius: 15,
        textAlign: 'center',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        padding: 6,
        borderRadius: 10,
    },
    viewText: {
        fontWeight: '400',
        letterSpacing: 2,
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginLeft: 10
    },
    topButtons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        zIndex: 1000
    },
    dropDownStyle: {
        width: '40%',
        marginTop: 15, 
        marginLeft: 20,
        zIndex: 1000
    }
})