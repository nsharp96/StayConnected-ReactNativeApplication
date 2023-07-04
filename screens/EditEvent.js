import AccountContext from "../context/AccountContext";
import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, TouchableWithoutFeedback, Keyboard, FlatList, SectionList, ScrollView} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import { LinearGradient } from 'expo-linear-gradient';
import GroupContext from "../context/GroupContext";

const EditEvent =({route}) => {

    const [ eventPic, setEventPic ] = useState(route.params.eventPic);
    const [ eventName, setEventName ] = useState(route.params.eventName);
    const [ eventLocation, setEventLocation ] = useState(route.params.eventLocation);
    const [ eventGroup, setEventGroup ] = useState(route.params.eventGroup);
    const [ eventStart, setEventStart ] = useState(route.params.eventStart);
    const [ eventEnd, setEventEnd ] = useState(route.params.eventEnd);
    const [ eventDetails, setEventDetails ] = useState(route.params.eventDetails);
    const [ eventCapacity, setEventCapacity ] = useState(route.params.eventCapacity);
    const [ groupID, setGroupID ] = useState(route.params.groupID);
    const [ eventID, setEventID ] = useState(route.params.eventID);

    const { user } = useContext(AccountContext);
    const { handleEditEvent } = useContext(GroupContext);
    const navigation = useNavigation();

    const pickImage = () => {
        navigation.navigate('GroupImagePicker', {prevScreen: 'EditEvent'});
    }

    useEffect(() => {
        if(route?.params?.image!=undefined)
        {
            setEventPic(route?.params?.image)
            console.log(route?.params?.image)
        }
    },[route])

    const [ isDatePickerOpen, setDatePickerOpen ] = useState(false);
    const showDatePicker = () => {
        setDatePickerOpen(true);
    };
    const hideDatePicker = () => {
        setDatePickerOpen(false);
    }
    const handleConfirm = (date) => {
        const dateformat = date.toLocaleString('en-GB', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'});
        setEventStart(dateformat)
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

    return(
       <View style={styles.container}>
           <ScrollView style={styles.container}>
                <Text style={styles.title}>Edit Event</Text>

                {
                    eventPic === ''
                    ?
                        <Image 
                            style={styles.image}
                            source={{uri: 'https://www.fil.ion.ucl.ac.uk/wp-content/uploads/2019/05/grey-background.jpg' }}
                        />
                    :
                        <Image 
                            style={styles.image}
                            source={{uri: eventPic}}
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
                    value={eventName}
                    onChangeText={text => setEventName(text)}
                    style={styles.inputContainer}
                />

                <Text style={styles.inputHeader}>Event Location</Text>
                <TextInput
                    value={eventLocation}
                    onChangeText={text => setEventLocation(text)}
                    style={styles.inputContainer}
                />

                <Text style={styles.inputHeader}>Event Start</Text>
                <TouchableOpacity onPress={() => showDatePicker()} style={styles.inputContainer}>
                    <Text>{eventStart}</Text>
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
                    value={eventDetails}
                    onChangeText={text => setEventDetails(text)}
                    style={styles.inputContainer}
                    multiline
                />

            <Text style={styles.inputHeader}>Event Capcity</Text>
            <TextInput 
                value={eventCapacity}
                onChangeText={text => setEventCapacity(text)}
                style={styles.inputContainer}
                keyboardType="numeric"
            />

            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                    //check all fields are filled
                    if(eventPic!=''&&eventName!=''&&eventLocation!=''&&eventStart!=''&&eventEnd!=''&&eventDetails!='')
                    {
                        handleEditEvent(eventID, eventPic, eventName, eventLocation, eventStart, eventEnd, eventDetails, eventCapacity, user.user.email, navigation)
                    }
                    else{
                        alert('Make sure all fields are completed.')
                    }
                }}
            >   
                <Text>Submit</Text>
            </TouchableOpacity>
  
           </ScrollView>

           <LinearGradient 
                        colors={['rgba(0,230,64,0.6)','transparent']}
                        style={styles.circle}
            />
           
       </View>
    )

}

export default EditEvent;

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
      circle:{
        marginTop: 500,
        height: 1000,
        width: 1000,
        borderRadius: 500,
        position:'absolute',
        zIndex: -1,
        alignSelf: 'center'
    },

})