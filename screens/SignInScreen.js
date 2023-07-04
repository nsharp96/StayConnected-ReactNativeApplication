import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import AccountContext from '../context/AccountContext'
import { auth } from '../config/firebase'

const SignInScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const { handleLogin } = useContext(AccountContext);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView 
                    behavior='position' 
                    style={styles.container}
                >
                <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>

                <View style={styles.containerForInputs}>

                    <View style={styles.inputContainer}>
                        <Ionicons name='mail-outline' size={20} color="green"/>
                        <TextInput 
                            placeholder='Email...'
                            value={email}
                            onChangeText={text => {setEmail(text)}}
                            style={styles.innerInput}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name='lock-closed-outline' size={20} color="green"/>
                        <TextInput 
                            placeholder='Password...'
                            value={password}
                            onChangeText={text => {setPassword(text)}}
                            style={styles.innerInput}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity 
                        style={styles.signInButton}
                        onPress={() => {
                            handleLogin(email, password)
                        }}
                    >
                        <Text>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.createButton}
                    onPress={() => {navigation.replace('SignUpScreen')} }
                    >
                        <Text style={styles.text}>Don't have an account? <Text style={styles.boldText}>Sign Up</Text></Text>
                     </TouchableOpacity>

                </View>
                
               
                
                <LinearGradient 
                        colors={['rgba(0,230,64,0.6)','transparent']}
                        style={styles.circle}
                />
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
       
    )
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      height: '100%'
    //   justifyContent: 'center',
    },
    circle:{
        
        right:0,
        bottom:0,
        height: 1000,
        width: 1000,
        borderRadius: 500,
        position:'absolute',
        zIndex: -1,
        ...Platform.select({
            ios: {
                top: 500,
                left:-320,

            },
            android: {
                top: 450,
                right: -320
          
            }
        })
    },
    stayText:{
        fontWeight: '400',
        fontSize: 30,
        letterSpacing: 8,
        position: 'absolute',
        top: 200,
        alignSelf: 'center'
    },
    connectedText:{
        color: 'green'
    },
    loginButton:{
        width: 250,
        alignItems: 'center',
        padding: 15,
        margin: 10,
        borderRadius: 20,
    },
    buttonText:{
        fontSize: 17,
        letterSpacing:2,
    },
    inputContainer: {
        backgroundColor: 'white',
        marginBottom: 30,
        width: 350,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        flexDirection: 'row',
        ...Platform.select({
            ios: {
                padding: 20,
                
            },
            android: {
                padding: 15,
            }
        })
    },
    innerInput:{
        marginLeft: 10,
    },
    signInButton: {
        backgroundColor: 'rgba(240, 240, 240, 0.9)',
        padding: 15,
        width: 150,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        marginBottom: 20,
        alignItems: 'center'
    },
    createButton:{
        alignSelf: 'center',
        ...Platform.select({
            ios:{
                marginTop: 40
            }, 
            android: {
                marginTop: 5
            }
        })
    },
    text:{ 
        fontSize: 15,
    },
    containerForInputs:{
        alignItems: 'center',
        ...Platform.select({
            ios: {
                marginTop: 570,
                
            },
            android: {
                marginTop: 520,
          
            }
        })
    },
    boldText:{
        fontWeight: '700'
    }
  });