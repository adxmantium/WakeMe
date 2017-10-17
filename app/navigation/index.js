// /navigation/index.js

// libs
import { AccessToken } from 'react-native-fbsdk'
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

// store
import store from './../reducers/store'

// actions
import { updateUser } from './../actions/user'

AccessToken.getCurrentAccessToken()
           .then(data => {
           		if( !!data ) store.dispatch( updateUser({...data}) );
           		else store.dispatch( updateUser({userID: false}) );
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

export default StackNavigator({
	Splash,
	Entry,
	Alarm,
	Waker,
	Splash,
	Camera,
	Profile,
	Captured,
	Collection

}, StackNavigatorConfig);