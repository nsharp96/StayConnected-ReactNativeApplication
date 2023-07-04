import { NavigationContainer, useNavigation } from "@react-navigation/native"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const FriendsHome = () => {

    return (
        <View style={styles.container}>
            {/* <ScreenHeader /> */}
            <Text>Friends Home</Text>
        </View>
    )
}
;
export default FriendsHome;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})