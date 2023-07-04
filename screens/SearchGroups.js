import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useContext, useEffect, useState } from "react"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import GroupContext from "../context/GroupContext";
import { LinearGradient } from 'expo-linear-gradient';


const SearchGroups = ({route}) => {

    const firstResults = route.params.search;
    const [searchGroup, setSearchGroup] = useState(route.params.search);
    const navigation = useNavigation();
    const { handleFetchGroupsBySearch, searchedGroups, handleCheckIfMember } = useContext(GroupContext);

    useEffect( () => {
        handleFetchGroupsBySearch(firstResults);
    }, []);

    useEffect( () => {
        console.log(searchedGroups);
    }, [searchedGroups])


    return(
        <View style={styles.container}>

            <View style={styles.searchContainer}>
                <Ionicons name='search' size={22} color="black"/>
                <TextInput 
                    placeholder="Search for Group..."
                    value={searchGroup}
                    onChangeText={text => setSearchGroup(text)}
                    style={styles.searchText}
                    returnKeyType="search"
                    onSubmitEditing={()=> {navigation.pop(), navigation.navigate('SearchGroups', {search: searchGroup})}}
                />
            </View>
            <Text style={styles.resultText}>Results for: <Text style={styles.firstResultText}>{firstResults}</Text></Text>

            {
                searchedGroups.length===0 &&
                <Text style={styles.noResultText}> No Results Found</Text>
            }

            {
                searchedGroups.length>0&&
                <FlatList
                    data={searchedGroups}
                    renderItem={({item}) => 
                    <TouchableOpacity
                    onPress={ async() => { 
                        let member = await handleCheckIfMember(item.GroupID)
                        if(member===true){
                            navigation.navigate('GroupPage', {groupID: item.GroupID, member: true})
                        }
                        else if(member===false){
                            navigation.navigate('JoinGroupPage', {groupID: item.GroupID, member:false})
                        }}}
                    >
                        <View style={styles.itemContainer}>
                            <Image
                                source={{uri: item.GroupPicture}} 
                                style={styles.groupImage}
                            />
                            <View>
                                <Text style={styles.itemNameText}>{item.GroupName}</Text>
                                <Text style={styles.memberText}>Members: {item.GroupMembers}</Text>
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

export default SearchGroups;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        height: '100%'
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
        alignSelf: 'center'
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
    itemContainer: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '90%',
        height: 100,
        borderRadius: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 15
    },
    groupImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        margin: 10
    },
    itemNameText: {
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 2,
        width: '90%',
        margin: 10,
        maxHeight: 50
    },
    memberText: {
        fontSize: 15,
        marginLeft: 10
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

})