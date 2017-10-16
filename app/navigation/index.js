// /navigation/index.js

// libs
// import { AccessToken } from 'react-native-fbsdk'
import { StackNavigator } from 'react-navigation'

// Navigators
import AlarmScreen from './../screens/alarm'
import CameraScreen from './../screens/camera'
import WakerScreen from './../screens/waker/index'
import EntryScreen from './../screens/entry/index'
import SplashScreen from './../screens/entry/splash'
import CollectionScreen from './../screens/collection'
import CapturedScreen from './../screens/camera/captured'

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

export default StackNavigator({
	Entry,
	Alarm,
	Waker,
	Splash,
	Camera,
	Captured,
	Collection

}, StackNavigatorConfig);