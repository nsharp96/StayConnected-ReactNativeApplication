import { useContext, useState } from "react"
import GroupContext from "../context/GroupContext"
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, TouchableWithoutFeedback, Keyboard, FlatList, SectionList, ScrollView} from "react-native"
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';



const GroupImagePicker = ({route}) => {

    const { groupCategory } = useContext(GroupContext);
    const [toggle, setToggle] = useState(false);
    const[currentImage, setCurrentImage] = useState('');
    const navigation = useNavigation();
    const prevScreen = route.params.prevScreen;


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            setCurrentImage(item.URL), 
            setToggle(true)
            }}>
                <Image 
            source={{uri: item.URL}}
            style={styles.images}
            />
        </TouchableOpacity>
        
      );

    return (
        <View>
            {toggle===true &&
            <View style={styles.popUp}>
                <View style={styles.innerContainer}>
                    <Text style={styles.checktext}>Are you sure you want to select this image? </Text>
                    <Image
                    source={{uri: currentImage}}
                    style={styles.checkimages} 
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.checkButton} onPress={() => {
                            navigation.navigate(prevScreen, {image: currentImage})
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
            
            <Text style={styles.title}>Pick a Image</Text>
            <View style={styles.sectionContainer}>
                <SectionList
                sections={groupCategory}
                keyExtractor={(item, index) => item + index}
                renderItem={({item})=>{return null}}
                renderSectionHeader={({ section: { title, data } }) => (
                    <View style={styles.catContainer}>
                        <Text style={styles.catTitle}>{title}</Text>
                        <FlatList
                            style={styles.listContainer}
                            data={data}
                            horizontal
                            renderItem={renderItem}
                        />
                    </View>
                )}
                />
                
            </View>
            
        </View>
        
    )
}

export default GroupImagePicker;

const styles = StyleSheet.create({
    catContainer: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '90%',
        alignSelf: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    images: {
        width: 150,
        height: 150,
        margin: 10,
        borderRadius: 10
    },
    title: {
        fontSize: 25,
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: '600',
        letterSpacing: 3, 
        marginBottom: 20
    },
    catTitle: {
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 3,
        margin: 5
    },
    listContainer: {
    },
    sectionContainer: {
        height: '90%',
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
        height: '50%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    checktext: {
        fontSize: 15,
        fontWeight: '400',
        letterSpacing: 2,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    checkimages: {
        width: 150,
        height: 150,
        margin: 10,
        borderRadius: 10,
        alignSelf: 'center'
    },
    buttonContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
        marginTop: 30

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
    }

})