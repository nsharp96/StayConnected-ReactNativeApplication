import { NavigationContainer, useFocusEffect, useNavigation } from "@react-navigation/native"
import React, { useContext, useEffect } from "react"
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native"
import AccountContext from "../context/AccountContext";
import GroupContext from "../context/GroupContext";
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {

    const navigation = useNavigation();
    const { user } = useContext(AccountContext);
    const { handleFetchGroups, usersGroups, handleFetchAllEvents, allUserEvents, handleFetchPopularGroups, popularGroups } = useContext(GroupContext);

    useFocusEffect(
        React.useCallback(() => {
            console.log('Home run');
            handleFetchGroups(user);
            handleFetchAllEvents(user.user.email);
            handleFetchPopularGroups();
        }, [])
    )

    // useEffect(() => {
    //     console.log('home run');
    //     handleFetchGroups(user);
    //     handleFetchAllEvents(user.user.email);
    //     handleFetchPopularGroups();
    // }, []);

    return (
        <View style={styles.container}>
            {
                usersGroups.length === 0 && 
                <View style={styles.outergroupContainer}>
                    <Text style={styles.title}>Welcome</Text>
                    <Text style={styles.subtitle}>Why not join some groups?</Text>
                    <Text style={styles.title}>Popular Groups</Text>
                    <View>
                        <FlatList 
                            horizontal
                            data={popularGroups}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) =>
                                <TouchableOpacity  onPress={() => { 
                                        console.log('HERE group id is'+item.GroupID)
                                        navigation.navigate('Groups', {screen: 'JoinGroupPage', params: {groupID: item.GroupID}, initial: false})
                                    } }>
                                    <View style={styles.groupContainer} >
                                            <ImageBackground source={{uri: item.GroupPicture}} style={styles.groupimage} imageStyle={{borderRadius: 10}} >
                                                <View style={styles.groupname}>
                                                    <Text style={styles.groupText}>{item.GroupName}</Text>
                                                </View>
                                            </ImageBackground>
                                    </View>
                                </TouchableOpacity> 
                             }
                        />
                    </View>
                </View>

            }

            {usersGroups.length > 0 && 
                <View style={styles.outergroupContainer}>
                    <View style={styles.row}>
                        <Text style={styles.title}>My Groups</Text>
                    </View>
                    <View>
                        <FlatList
                            horizontal
                            data={usersGroups}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) => 
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Groups', {screen: 'GroupsHome'}),
                                    navigation.navigate('Groups', {screen: 'GroupPage', params: {groupID: item.value}, initial: false })
                                }}>    
                                    <View style={styles.groupContainer}>
                                        <ImageBackground source={{uri: item.GroupPicture}} style={styles.groupimage} imageStyle={{borderRadius: 10}}>
                                            <View style={styles.groupname}>
                                                <Text style={styles.groupText}>{item.GroupName}</Text>
                                            </View>
                                        </ImageBackground>
                                    </View>

                                </TouchableOpacity>
                            }
                        
                        />

                    </View>

                </View>
            }

            {allUserEvents.length > 0 &&
                <View style={styles.eventouterContainer}>
                    <Text style={styles.title}>Upcoming Events</Text>
                    <FlatList
                        data={allUserEvents}
                        renderItem={({item}) => 
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Events');
                                    navigation.navigate('Events', {screen: 'EventPage', params: {eventID: item.EventID, groupID: item.GroupID}, initial: false})
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
            }

            <LinearGradient 
                colors={['rgba(0,230,64,0.6)','transparent']}
                style={styles.circle}
            />
        </View>



    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff'
    },
    outergroupContainer: {
        width: '90%',
        height: 200,
        alignSelf: 'center',
        marginTop: 20,
    },
    row:{
        flexDirection: 'row'
    },
    title: {
        fontSize: 20,
        letterSpacing: 5,
        marginBottom: 20
    },
    groupimage:{
        resizeMode:'cover',
        flex: 1,
        justifyContent: 'flex-end'
    },
    groupContainer:{
        width: 130,
        height: 130,
        borderRadius: 10, 
        marginRight: 15
    },
    groupname: {
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '80%',
        margin: 5,
        borderRadius: 5
    },
    groupText: {
        fontSize: 10,
        color: 'white',
        fontSize: 15,
        padding: 5,
        fontWeight: '600'
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
    eventouterContainer: {
        width: '90%',
        height: 400,
        alignSelf: 'center'
    },
    createdEventInsideContainer: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignSelf: 'center',
        marginBottom: 10,
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
    subtitle: {
        fontSize: 18,
        letterSpacing: 3,
        marginBottom: 20
    }
})