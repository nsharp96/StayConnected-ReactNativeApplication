import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AccountContext from '../context/AccountContext'


const SignUpScreen = () => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [emailTwo, setEmailTwo] = useState('');
    const [password, setPassword] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');

    const navigation = useNavigation();

    const { handleSignUp } = useContext(AccountContext);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView 
            style={styles.container}
            keyboardVerticalOffset={-200}
            behavior='position' 
        >
            <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>

            <View style={styles.greyContainer}>
                <View style={styles.inputContainer}>
                    <Ionicons name='person-outline' size={20} color="green"/>
                    <TextInput 
                        placeholder='Display Name...'
                        value={username}
                        onChangeText={text => setUserName(text)}
                        style={styles.innerInput}
                    />
                </View>
        
                <View style={styles.inputContainer}>
                    <Ionicons name='mail-outline' size={20} color="green"/>
                    <TextInput 
                        placeholder='Email...'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.innerInput}
                    />
                </View>
            
                <View style={styles.inputContainer}>
                    <Ionicons name='mail-outline' size={20} color="green"/>
                    <TextInput 
                        placeholder='Re-enter Email...'
                        value={emailTwo}
                        onChangeText={text => setEmailTwo(text)}
                        style={styles.innerInput}
                    />
                </View>
          
                <View style={styles.inputContainer}>
                    <Ionicons name='lock-closed-outline' size={20} color="green"/>
                    <TextInput 
                        placeholder='Password...'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.innerInput}
                        secureTextEntry
                    />
                </View>
         
                <View style={styles.inputContainer}>
                    <Ionicons name='lock-closed-outline' size={20} color="green"/>
                    <TextInput 
                        placeholder='Re-enter Password...'
                        value={passwordTwo}
                        onChangeText={text => setPasswordTwo(text)}
                        style={styles.innerInput}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity 
                    style={styles.signUpButton}
                    onPress={() => {handleSignUp(username, email, emailTwo, password, passwordTwo)}}
                >
                    <Text>Sign Up</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={styles.createButton}
                onPress={() => {navigation.replace('SignInScreen')} }
            >
                <Text style={styles.text}>Already have an Account? <Text style={styles.boldText}>Log In</Text></Text>
            </TouchableOpacity>

            <LinearGradient 
                    colors={['rgba(0,230,64,0.6)','transparent']}
                    style={styles.circle}
            />
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
     // alignItems: 'center',
     // justifyContent: 'center',
    },
    circle:{
        // top:500,
        // left:-275,
        // right:0,
        // bottom:0, 
        marginTop: 500,
        height: 1000,
        width: 1000,
        borderRadius: 500,
        position:'absolute',
        zIndex: -1,
        alignSelf: 'center'
    },
    stayText:{
        fontWeight: '400',
        fontSize: 30,
        letterSpacing: 8,
        //position: 'absolute',
        top: 75,
        alignSelf: 'center'
    },
    connectedText:{
        color: 'green'
    },
    createButton: {
        alignSelf: 'center',
        marginTop: 30
    },
    text: {
        fontSize: 15
    },
    inputContainer: {
        backgroundColor: 'white',
        padding: 15,
        width: 300,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        flexDirection: 'row',
        marginBottom: 30,
    },
    innerInput:{
        marginLeft: 10,
    },
    greyContainer:{
        backgroundColor: 'rgba(0,0,0, 0.3)',
        padding: 25,
        borderRadius: 10,
        marginTop: 160,
        alignSelf: 'center'
    },
    signUpButton: {
        backgroundColor: 'rgba(240, 240, 240, 0.9)',
        padding: 15,
        width: 150,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        alignItems: 'center',
        alignSelf: 'center'
    },
    boldText:{
        fontWeight: '700'
    }
  });