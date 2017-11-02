// /navigation/index.js

// libs
import { 
	AccessToken, 
	LoginManager, 
	GraphRequest, 
	GraphRequestManager 
} from 'react-native-fbsdk'
import { StackNavigator } from 'react-navigation'

// Navigators
import AlarmScreen from './../screens/alarm'
import CameraScreen from './../screens/camera'
import ProfileScreen from './../screens/profile'
import WakerScreen from './../screens/waker/index'
import EntryScreen from './../screens/entry/index'
import SplashScreen from './../screens/entry/splash'
import CollectionScreen from './../screens/collection'
import CapturedScreen from './../screens/camera/captured'
import MyFriendsScreen from './../screens/profile/myFriends'
import FindFriendsScreen from './../screens/profile/findFriends'

// store
import store from './../reducers/store'

// actions
import { updateUser, getUserInfo } from './../actions/user'

let fbData = {};

const _getGraphRequest = ({ accessToken }) => {
	return new GraphRequest('/me', {
			accessToken,
			parameters: {
				fields: {
					string: 'email,name,first_name,last_name,picture',
				}
			}
		}, 
		_graphRequestCallback
	);
}

const _graphRequestCallback = (error, result) => {
	if( error ){
		// console.log('graph error: ', error);
	}else{
		const userData = {...fbData, ...result};
		store.dispatch( updateUser(userData) ); // save fb data to store
		store.dispatch( getUserInfo(userData) ); // get user/alarm data from db
	}
}

// check fb if user is signed in or not
// if accessToken still active (signed in), then use token to get user's data
AccessToken.getCurrentAccessToken()
           .then(data => {
           		if( data ){
           			fbData = data;

           			// use fb graph api to get users fb profile data
           			new GraphRequestManager()
           	   			.addRequest( _getGraphRequest({...data}) )
           	   			.start();

           		}else store.dispatch( updateUser({userID: false}) );
           });

const StackNavigatorConfig = {}

const Alarm = {
	screen: AlarmScreen,
	navigationOptions: ({ navigation }) => ({
		header: null,
	}),
}

const Camera = {
	screen: CameraScreen,
	navigationOptions: ({ navigation }) => ({
		header: null,
	}),
}

const Captured = {
	screen: CapturedScreen,
	navigationOptions: ({ navigation }) => ({
		header: null,
	}),
}

const Collection = {
	screen: CollectionScreen,
	navigationOptions: ({ navigation }) => ({
		header: null,
	}),
}

const Waker = {
	screen: WakerScreen,
	navigationOptions: ({ navigation }) => ({
		header: null,
		gesturesEnabled: false,
	}),
}

const Entry = {
	screen: EntryScreen,
	navigationOptions: ({ navigation }) => ({
		header: null,
	}),
}

const Splash = {
	screen: SplashScreen,
	navigationOptions: ({ navigation }) => ({
		header: null,
	}),
}

const Profile = {
	screen: ProfileScreen,
	navigationOptions: ({ navigation }) => ({
		header: null,
	}),
}

const FindFriends = {
	screen: FindFriendsScreen,
	navigationOptions: ({ navigation }) => ({
		header: null,
	}),
}

const MyFriends = {
	screen: MyFriendsScreen,
	navigationOptions: ({ navigation }) => ({
		header: null,
	}),
}

export default StackNavigator({
	Splash,
	Entry,
	Alarm,
	Waker,
	Splash,
	Camera,
	Profile,
	Captured,
	MyFriends,
	Collection,
	FindFriends,

}, StackNavigatorConfig);