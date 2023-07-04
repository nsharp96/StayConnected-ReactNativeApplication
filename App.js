import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './screens/SignUpScreen'
import SignIn from './screens/SignInScreen';
import AccountContext, { AccountContextProvider } from './context/AccountContext'
import Home from './screens/Home';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import GroupsHome from './screens/GroupsHome';
import EventsHome from './screens/EventsHome';
import FriendsHome from './screens/FriendsHome';
import CreateGroup from './screens/CreateGroups';
import { GroupContextProvider } from './context/GroupContext';
import GroupPage from './screens/GroupPage';
import GroupImagePicker from './screens/GroupImagePicker';
import JoinGroupPage from './screens/JoinGroupPage';
import SearchGroups from './screens/SearchGroups';
import EditGroup from './screens/EditGroup';
import CreateEvent from './screens/CreateEvent';
import EventPage from './screens/EventPage';
import EditEvent from './screens/EditEvent';
import SearchEvents from './screens/SearchEvents';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;
  switch (route.name) {
    case 'Home':
      iconName = 'home-outline';
      break;
    case 'Groups':
      iconName = 'people-outline';
      break;
    case 'Events':
        iconName = 'calendar-outline';
        break;
    case 'Friends':
        iconName = 'happy-outline';
        break;
    default:
      break;
  }
  return <Ionicons name={iconName} color={color} size={24} />
};

const AuthStack = () => {

  return (
    <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="SignInScreen" component={SignIn}/>
          <Stack.Screen options={{headerShown: false}} name="SignUpScreen" component={SignUpScreen}/>
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <GroupContextProvider>
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen  
            options = {({navigation}) => ({
              headerTitle: props => <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>,
              headerRight: () => 
                <TouchableOpacity
                  onPress={
                    ()=>{navigation.replace('Profile')}}
                >
                   <Ionicons name='person' size={20} color="black"/>
                 </TouchableOpacity>
            })}
            name="HomeStack" 
            component={Home}
      />
      <Stack.Screen
        options = {({navigation}) => ({
          headerTitle: props => <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>,
          headerLeft: () =>
            <TouchableOpacity
              onPress={
                ()=>{navigation.replace('HomeStack')}}
            >
              <Ionicons name='chevron-back-outline' size={20} color="black"/>
            </TouchableOpacity>
        })}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen 
        options = {({navigation}) => ({
          headerTitle: props => <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>,
            headerTitleAlign: 'center',
          headerLeft: () =>
            <TouchableOpacity
              onPress={
                ()=>{navigation.replace('Profile')}}
            >
              <Ionicons name='chevron-back-outline' size={20} color="black"/>
            </TouchableOpacity>
        })}
        name="EditProfile"
        component={EditProfile}
      />
    </Stack.Navigator>
    </GroupContextProvider>
  )
}

const GroupStack = ({navigation}) => {
  return (

      <GroupContextProvider>
        <Stack.Navigator
          initialRouteName={'GroupsHome'}
          screenOptions={{
            headerTitleAlign: 'center'
          }}
        >
          <Stack.Screen 
            options = {({navigation}) => ({
              headerTitle: props => <Text style={styles.stayText}>Groups</Text>,
              headerRight: () => 
                <TouchableOpacity
                  onPress={
                    ()=>{navigation.replace('Profile')}}
                >
                  <Ionicons name='person' size={20} color="black"/>
                </TouchableOpacity>
            })}
            name="GroupsHome" 
            component={GroupsHome}
          />
          <Stack.Screen
            options = {({navigation}) => ({
              headerTitle: props => <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>,
              headerLeft: () =>
                <TouchableOpacity
                  onPress={
                    ()=>{navigation.replace('GroupsHome')}}
                >
                  <Ionicons name='chevron-back-outline' size={20} color="black"/>
                </TouchableOpacity>
            })}
            name="Profile"
            component={Profile}
          />
          <Stack.Screen 
            options = {({navigation}) => ({
              headerTitle: props => <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>,
                headerTitleAlign: 'center',
              headerLeft: () =>
                <TouchableOpacity
                  onPress={
                    ()=>{navigation.replace('Profile')}}
                >
                  <Ionicons name='chevron-back-outline' size={20} color="black"/>
                </TouchableOpacity>
            })}
            name="EditProfile"
            component={EditProfile}
          />
          <Stack.Screen 
            options = {({navigation}) => ({
              headerTitle: props => <Text style={styles.stayText}>Groups</Text>,
              headerRight: () => 
                <TouchableOpacity
                  onPress={
                    ()=>{navigation.replace('Profile')}}
                >
                  <Ionicons name='person' size={20} color="black"/>
                </TouchableOpacity>
            })}
            name="CreateGroup" 
            component={CreateGroup}
          />
          <Stack.Screen 
            options = {({navigation}) => ({
              headerTitle: props => <Text style={styles.stayText}>Groups</Text>,
              headerRight: () => 
                <TouchableOpacity
                  onPress={
                    ()=>{navigation.replace('Profile')}}
                >
                  <Ionicons name='person' size={20} color="black"/>
                </TouchableOpacity>
            })}
            name="GroupPage" 
            component={GroupPage}
          />
           <Stack.Screen 
            options = {({navigation}) => ({
              headerTitle: props => <Text style={styles.stayText}>Groups</Text>,
              headerRight: () => 
                <TouchableOpacity
                  onPress={
                    ()=>{navigation.replace('Profile')}}
                >
                  <Ionicons name='person' size={20} color="black"/>
                </TouchableOpacity>
            })}
            name="GroupImagePicker" 
            component={GroupImagePicker}
          />
          <Stack.Screen 
            options = {({navigation}) => ({
              headerTitle: props => <Text style={styles.stayText}>Groups</Text>,
              headerRight: () => 
                <TouchableOpacity
                  onPress={
                    ()=>{navigation.replace('Profile')}}
                >
                  <Ionicons name='person' size={20} color="black"/>
                </TouchableOpacity>
            })}
            name="JoinGroupPage" 
            component={JoinGroupPage}
          />
          <Stack.Screen
           options = {({navigation}) => ({
            headerTitle: props => <Text style={styles.stayText}>Groups</Text>,
            headerRight: () => 
              <TouchableOpacity
                onPress={
                  ()=>{navigation.replace('Profile')}}
              >
                <Ionicons name='person' size={20} color="black"/>
              </TouchableOpacity>
            })}
            name="SearchGroups" 
            component={SearchGroups}
          />
          <Stack.Screen 
            options={({navigation}) => ({
              headerTitle: props => <Text style={styles.stayText}>Groups</Text>,
              headerRight: () => 
                <TouchableOpacity
                  onPress={() => {navigation.replace('Profile')}}
                >
                  <Ionicons name='person' size={20} color="black"/>
                </TouchableOpacity>
            })}
            name="EditGroup"
            component={EditGroup}
          />
        </Stack.Navigator>
      </GroupContextProvider>

  )
}

const EventsStack = () => {
  return (
    <GroupContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen 
          options = {({navigation}) => ({
            headerTitle: props => <Text style={styles.stayText}>Events</Text>,
            headerRight: () => 
              <TouchableOpacity
                onPress={
                  ()=>{navigation.replace('Profile')}}
              >
                <Ionicons name='person' size={20} color="black"/>
              </TouchableOpacity>
          })}
          name="EventsHome" 
          component={EventsHome}
        />
        <Stack.Screen
          options = {({navigation}) => ({
            headerTitle: props => <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>,
            headerLeft: () =>
              <TouchableOpacity
                onPress={
                  ()=>{navigation.replace('EventsHome')}}
              >
                <Ionicons name='chevron-back-outline' size={20} color="black"/>
              </TouchableOpacity>
          })}
          name="Profile"
          component={Profile}
        />
        <Stack.Screen 
          options = {({navigation}) => ({
            headerTitle: props => <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>,
              headerTitleAlign: 'center',
            headerLeft: () =>
              <TouchableOpacity
                onPress={
                  ()=>{navigation.replace('Profile')}}
              >
                <Ionicons name='chevron-back-outline' size={20} color="black"/>
              </TouchableOpacity>
          })}
          name="EditProfile"
          component={EditProfile}
        />
        <Stack.Screen 
          options = {({navigation}) => ({
            headerTitle: props => <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>,
              headerTitleAlign: 'center',
            headerLeft: () =>
              <TouchableOpacity
                onPress={
                  ()=>{navigation.replace('Profile')}}
              >
                <Ionicons name='chevron-back-outline' size={20} color="black"/>
              </TouchableOpacity>
          })}
          name="CreateEvent"
          component={CreateEvent}
        />
        <Stack.Screen 
          options = {({navigation}) => ({
            headerTitle: props => <Text style={styles.stayText}>Groups</Text>,
            headerRight: () => 
              <TouchableOpacity
                onPress={
                  ()=>{navigation.replace('Profile')}}
              >
                <Ionicons name='person' size={20} color="black"/>
              </TouchableOpacity>
          })}
          name="GroupImagePicker" 
          component={GroupImagePicker}
        />
        <Stack.Screen 
          options = {({navigation}) => ({
            headerTitle: props => <Text style={styles.stayText}>Groups</Text>,
            headerRight: () => 
              <TouchableOpacity
                onPress={
                  ()=>{navigation.replace('Profile')}}
              >
                <Ionicons name='person' size={20} color="black"/>
              </TouchableOpacity>
          })}
          name="EventPage" 
          component={EventPage}
        />
        <Stack.Screen 
          options = {({navigation}) => ({
            headerTitle: props => <Text style={styles.stayText}>Groups</Text>,
            headerRight: () => 
              <TouchableOpacity
                onPress={
                  ()=>{navigation.replace('Profile')}}
              >
                <Ionicons name='person' size={20} color="black"/>
              </TouchableOpacity>
          })}
          name="EditEvent" 
          component={EditEvent}
        />
        <Stack.Screen 
          options = {({navigation}) => ({
            headerTitle: props => <Text style={styles.stayText}>Groups</Text>,
            headerRight: () => 
              <TouchableOpacity
                onPress={
                  ()=>{navigation.replace('Profile')}}
              >
                <Ionicons name='person' size={20} color="black"/>
              </TouchableOpacity>
          })}
          name="SearchEvents" 
          component={SearchEvents}
        />
      </Stack.Navigator>
    </GroupContextProvider>
  )
}

const FriendsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen 
        options = {({navigation}) => ({
          headerTitle: props => <Text style={styles.stayText}>Friends</Text>,
          headerRight: () => 
            <TouchableOpacity
              onPress={
                ()=>{navigation.replace('Profile')}}
            >
              <Ionicons name='person' size={20} color="black"/>
            </TouchableOpacity>
        })}
        name="FriendsHome" 
        component={FriendsHome}
      />
      <Stack.Screen
        options = {({navigation}) => ({
          headerTitle: props => <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>,
          headerLeft: () =>
            <TouchableOpacity
              onPress={
                ()=>{navigation.replace('FriendsHome')}}
            >
              <Ionicons name='chevron-back-outline' size={20} color="black"/>
            </TouchableOpacity>
        })}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen 
        options = {({navigation}) => ({
          headerTitle: props => <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>,
            headerTitleAlign: 'center',
          headerLeft: () =>
            <TouchableOpacity
              onPress={
                ()=>{navigation.replace('Profile')}}
            >
              <Ionicons name='chevron-back-outline' size={20} color="black"/>
            </TouchableOpacity>
        })}
        name="EditProfile"
        component={EditProfile}
      />
    </Stack.Navigator>
  )
}

const AppStack = () => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => screenOptions(route, color),
        tabBarInactiveTintColor: 'grey',
        tabBarActiveTintColor: '#234F1E'
      })}
    >
      <Tabs.Screen  
        options = {({navigation}) => ({
        headerTitle: props => <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>,
        headerShown: false
        })}
        name="Home" 
        component={HomeStack}
      />
      <Tabs.Screen  
        options = {({navigation}) => ({
          headerTitle: props => <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>,
          headerShown: false
        })}
        listeners={({navigation}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Groups', { screen: 'GroupsHome'});
          }
        })}
        name="Groups" 
        component={GroupStack}
      />
      <Tabs.Screen  
        options = {({navigation}) => ({
          headerTitle: props => <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>,
          headerShown: false
        })}
        name="Events" 
        component={EventsStack}
      />
      <Tabs.Screen  
        options = {({navigation}) => ({
          headerTitle: props => <Text style={styles.stayText}>Stay<Text style={styles.connectedText}>Connected</Text></Text>,
          headerShown: false
        })}
        name="Friends" 
        component={FriendsStack}
      />
    </Tabs.Navigator>
  );
};

const AuthFlow = () => {
  const {isLoggedIn} = useContext(AccountContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
} 

export default function App() {
  return (
    <AccountContextProvider>
      <AuthFlow />
    </AccountContextProvider>
        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stayText:{
    fontWeight: '400',
    fontSize: 20,
    letterSpacing: 5,
  },
  connectedText:{
      color: 'green'
  },
});
