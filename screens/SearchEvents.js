import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import GroupContext from "../context/GroupContext";
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient';


const SearchEvents = ({route}) => {

    const firstResults = route.params.search;
    const [ searchEvent, setSearchEvent ] = useState(route.params.search);
    const navigation = useNavigation();
    const { handleFetchEventsBySearch, searchedEvents } = useContext(GroupContext);
  

    useEffect(()=> {
        handleFetchEventsBySearch(firstResults);
    },[]);

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
                    onSubmitEditing={()=> {navigation.pop(), navigation.navigate('SearchEvents', {search: searchEvent})}}
                />
            </View>

            <Text style={styles.resultText}>Results for: <Text style={styles.firstResultText}>{firstResults}</Text></Text>

            {
                searchedEvents.length === 0 && <Text style={styles.noResultText}> No Results Found</Text>
            }

            
            {
                searchedEvents.length>0&&
                <FlatList
                    data={searchedEvents}
                    renderItem={({item}) => 
            
                            <TouchableOpacity
                            style={styles.eventWidth}
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
            }

            <LinearGradient 
                    colors={['rgba(0,230,64,0.6)','transparent']}
                    style={styles.circle}
            />

        </View>

    )
    
}

export default SearchEvents;

const styles = StyleSheet.create({
        container:{
        flex: 1,
        backgroundColor: '#fff',
        height: '100%'
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
        alignItems: 'center',
        alignSelf: 'center',
    },
    searchText: {
            marginLeft: 10,
    },
    resultText: {
        fontSize: 20,
        fontWeight: '600',
        margin: 25,
        //alignSelf:'center'
    },
    firstResultText:
    {
        fontWeight: '400',
        letterSpacing: 2
    },
    noResultText: {
        alignSelf: 'center',
        fontWeight: '500',
        fontSize: 30,
        letterSpacing: 2
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
    ownEventContainer: { 
        width: '90%',
        marginBottom: 150,
        height: '90%',
        alignSelf: 'center'
    },
    eventWidth: {
        width: '90%',
        alignSelf: 'center'
    }
})