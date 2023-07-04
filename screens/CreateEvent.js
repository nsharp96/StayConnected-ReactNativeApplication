import { NavigationContainer, useNavigation } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ImageBackground, FlatList, Image, ScrollView } from "react-native"
import AccountContext from "../context/AccountContext"
import Ionicons from '@expo/vector-icons/Ionicons'
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import { LinearGradient } from 'expo-linear-gradient';
import GroupContext from "../context/GroupContext"

const CreateEvent = ({route}) => {

    const { user } = useContext(AccountContext);
    const navigation = useNavigation();
    const { handleFetchGroups, usersGroups, handleCreateEvent } = useContext(GroupContext);
    const [ eventPicture, setEventPicture ] = useState('');
    const [ eventName, setEventName ] = useState('');
    const [ eventLocation, setEventLocation ] = useState('');
    const [ eventDate, setEventDate ] = useState('');
    const [ eventEnd, setEventEnd ] = useState('');
    const [ eventDetails, setEventDetails ] = useState('');
    const [ eventLimit, setEventLimit ] = useState('');

    const [ open, setOpen ] = useState(false);
    const [ value, setValue ] = useState('');
    const [ events, setEvents ] = useState(usersGroups);

    const [ isDatePickerOpen, setDatePickerOpen ] = useState(false);
    const showDatePicker = () => {
        setDatePickerOpen(true);
    };
    const hideDatePicker = () => {
        setDatePickerOpen(false);
    }
    const handleConfirm = (date) => {
        const dateformat = date.toLocaleString('en-GB', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'});
        setEventDate(dateformat)
        hideDatePicker();
    }

    const [ isEventEndDatePickerOpen, setEventEndDatePickerOpen ] = useState(false);
    const showEventEndDatePicker = () => {
        setEventEndDatePickerOpen(true);
    };
    const hideEventEndDatePicker = () => {
        setEventEndDatePickerOpen(false);
    }
    const handleEventEndConfirm = (date) => {
        const dateformat = date.toLocaleString('en-GB', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'});
        setEventEnd(dateformat)
        hideEventEndDatePicker();
    }

    const pickImage = () => {
        navigation.navigate('GroupImagePicker', {prevScreen: 'CreateEvent'})
        
    }

    useEffect(() => {
        handleFetchGroups(user)
    }, [])

    useEffect(() => {
        if(route?.params?.image!=undefined)
        {
            setEventPicture(route?.params?.image)
        }
    },[route])

    useEffect(() => {
        setEvents(usersGroups);
    },[usersGroups])


    return(
        <View style={styles.container}>
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Create Event</Text>

            {
                eventPicture === ''
                ?
                    <Image
                        style={styles.image}
                        source={{uri: 'https://www.fil.ion.ucl.ac.uk/wp-content/uploads/2019/05/grey-background.jpg'}} 
                    />
                :
                    <Image 
                        style={styles.image}
                        source={{uri: eventPicture}}
                    />
            }

            <TouchableOpacity
                style={styles.addImageButton}
                onPress={() => pickImage()}
            >
                <Ionicons name='add' size={30} color='green'/>
            </TouchableOpacity>

            <Text style={styles.inputHeader}>Event Name</Text>
            <TextInput
                placeholder="Event Name..."
                value={eventName}
                onChangeText={text => setEventName(text)}
                style={styles.inputContainer}
            />

            <Text style={styles.inputHeader}>Event Location</Text>
            <TextInput
                placeholder="Event Location..."
                value={eventLocation}
                onChangeText={text => setEventLocation(text)}
                style={styles.inputContainer}
            />

            <Text style={styles.inputHeader}>Event Group</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={events}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setEvents}
                containerStyle={styles.dropdownContainer}
                listMode="SCROLLVIEW"
                placeholder="Select Group.."
                
            />

            <Text style={styles.inputHeader}>Event Start</Text>
            <TouchableOpacity onPress={() => showDatePicker()} style={styles.inputContainer}>
                <Text>{eventDate}</Text>
                <DateTimePicker
                    isVisible={isDatePickerOpen}
                    mode='datetime'
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </TouchableOpacity>

            <Text style={styles.inputHeader}>Event End</Text>
            <TouchableOpacity onPress={() => showEventEndDatePicker()} style={styles.inputContainer}>
                <Text>{eventEnd}</Text>
                <DateTimePicker
                        isVisible={isEventEndDatePickerOpen}
                        mode='datetime'
                        onConfirm={handleEventEndConfirm}
                        onCancel={hideEventEndDatePicker}
                />
            </TouchableOpacity>

            <Text style={styles.inputHeader}>Event Details</Text>
            <TextInput
                placeholder="Event Details..."
                value={eventDetails}
                onChangeText={text => setEventDetails(text)}
                style={styles.inputContainer}
                multiline
            />

            <Text style={styles.inputHeader}>Event Capcity</Text>
            <TextInput 
                placeholder="Event Capcity..."
                value={eventLimit}
                onChangeText={text => setEventLimit(text)}
                style={styles.inputContainer}
                keyboardType="numeric"
            />

            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                    //check all fields are filled
                    if(eventPicture!=''&&eventName!=''&&eventLocation!=''&&eventDate!=''&&eventEnd!=''&&eventDetails!=''&&value!='')
                    {
                        handleCreateEvent(navigation, user.user.email, value, eventPicture, eventName, eventLocation, eventDate, eventEnd, eventDetails, eventLimit)
                    }
                    else{
                        alert('Make sure all fields are completed.')
                    }
                }}
            >
                <Text>Create Event</Text>
            </TouchableOpacity>


        </ScrollView>
        <LinearGradient 
                        colors={['rgba(0,230,64,0.6)','transparent']}
                        style={styles.circle}
        />
        </View>
    )
}

export default CreateEvent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
    title: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 20,
        letterSpacing: 5
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 70,
        alignSelf: 'center',
        marginTop: 30,
    },
    addImageButton : {
        backgroundColor: '#b3feac',
        height: 40,
        width: 40,
        borderRadius: 20,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 180,
        left: 230,
        paddingLeft: 3
    },
    inputHeader: {
        fontSize: 17,
        marginLeft: 25,
        marginTop: 15,
        letterSpacing: 4,
        fontWeight: '600' 
    },
    inputContainer: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
        paddingTop: 10,
        paddingLeft: 15,
        paddingBottom: 10,
        paddingRight: 10,
        borderRadius: 10,
        maxHeight: 80,
    },
    dropdownContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 10
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
        marginTop: 30,
        marginBottom: 30
      },

})