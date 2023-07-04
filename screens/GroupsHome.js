import { NavigationContainer, useFocusEffect, useNavigation } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ImageBackground, FlatList } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import GroupContext from "../context/GroupContext";
import AccountContext from "../context/AccountContext";
import { LinearGradient } from 'expo-linear-gradient';


const GroupsHome = () => {

    const [searchGroup, setSearchGroup] = useState('');
    const navigation = useNavigation();
    const { handleFetchPopularGroups, handleFetchUsersGroups, managedGroups, joinedGroups, popularGroups, setManagedGroups, setJoinedGroups, handleCheckIfMember } = useContext(GroupContext);
    const { user } = useContext(AccountContext);

    useEffect( () => {
        let joined = handleFetchUsersGroups(user.user.email);
        console.log("groupshome "+ joined); 
        handleFetchPopularGroups();
        console.log("popualar list "+popularGroups);
        console.log('Managed '+managedGroups);    
        console.log('Joined '+joinedGroups);
    },[]);


    return (
        <View style={styles.container}>   

            <View style={styles.searchContainer}>
                <Ionicons name='search' size={22} color="black" style={styles.searchIcon}/>
                <TextInput 
                    placeholder="Search for Group..."
                    value={searchGroup}
                    onChangeText={text => setSearchGroup(text)}
                    style={styles.searchText}
                    returnKeyType="search"
                    onSubmitEditing={()=> {navigation.navigate('SearchGroups', {search: searchGroup})}}
                />
            </View>

            <TouchableOpacity 
                style={styles.createButtonContainer}
                onPress={() => {navigation.navigate('CreateGroup')}}
            >
                <Ionicons name='add' size={22} color='darkgreen'/>
                <Text style={styles.createButtonText}>Create Group</Text>
            </TouchableOpacity>

            <View style={styles.greyContainer}>
                <Text style={styles.sectionText}>Managed Groups</Text>

                

                <View style={styles.managedContainer}>

                    <FlatList
                        horizontal
                        data={managedGroups}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) =>
                        <TouchableOpacity onPress={ async() => { 
                            let member = await handleCheckIfMember(item.GroupID)
                            if(member===true){
                                navigation.navigate('GroupPage', {groupID: item.GroupID})
                            }
                            else if(member===false){
                                navigation.navigate('JoinGroupPage', {groupID: item.GroupID})
                            }
                            //navigation.navigate('GroupPage', {groupID: item.GroupID}) 
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

            <View style={styles.greyContainer}>
                <Text style={styles.sectionText}>Joined Groups</Text>

                <View style={styles.popularConatainer}>

                    <FlatList
                        horizontal
                        data={joinedGroups}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) =>
                        <TouchableOpacity  onPress={ async() => { 
                            let member = await handleCheckIfMember(item.GroupID)
                            if(member===true){
                                navigation.navigate('GroupPage', {groupID: item.GroupID})
                            }
                            else if(member===false){
                                navigation.navigate('JoinGroupPage', {groupID: item.GroupID})
                            }
                            //navigation.navigate('GroupPage', {groupID: item.GroupID}) 
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

            <View style={styles.greyContainer}>
                <Text style={styles.sectionText}>Popular Groups</Text>

                <View style={styles.popularConatainer}>

                    <FlatList
                        horizontal
                        data={popularGroups}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) =>
                        <TouchableOpacity  onPress={ async() => { 
                            let member = await handleCheckIfMember(item.GroupID)
                            if(member===true){
                                navigation.navigate('GroupPage', {groupID: item.GroupID})
                            }
                            else if(member===false){
                                navigation.navigate('JoinGroupPage', {groupID: item.GroupID})
                            }
                            //navigation.navigate('GroupPage', {groupID: item.GroupID}) 
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

            <LinearGradient 
                    colors={['rgba(0,230,64,0.6)','transparent']}
                    style={styles.circle}
            />
            
        </View>
    )
}

export default GroupsHome;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        height: '100%'
    },
    searchContainer: {
        width: '90%',
        minHeight: 50,
        height: '6%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginTop: 20,
        borderRadius: 10,
        //padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchText: {
        marginLeft: 10,
        width: '100%',
        height: '100%'
    },
    createButtonText:{
        color: 'darkgreen',
        marginTop: 3
    },
    createButtonContainer:{
        flexDirection: 'row',
        backgroundColor: '#b3feac',
        borderRadius: 10,
        padding: 10,
        marginTop: 15,
        marginLeft: '60%',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        marginBottom: 15
    },
    greyContainer: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '90%',
        height: '23%', 
        marginBottom: 30,
        borderRadius: 10
    },
    sectionText: {
        marginTop: 15,
        marginLeft: 15,
        fontSize: 20,
        letterSpacing: 5
    },
    groupContainer:{
        width: 110,
        height: 110,
        borderRadius: 10, 
        marginRight: 15
    },
    managedContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around'
    },
    groupText: {
        fontSize: 10,
        color: 'white',
        fontSize: 15,
        padding: 5,
        fontWeight: '600'
    },
    groupimage:{
        resizeMode:'cover',
        flex: 1,
        justifyContent: 'flex-end'
    },
    groupname: {
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '80%',
        margin: 5,
        borderRadius: 5
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
    popularConatainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around' 
    },
    searchIcon: {
        marginLeft: 10
    }
})