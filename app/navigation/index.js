// /navigation/index.js

// libs
// import { AccessToken } from 'react-native-fbsdk'
import { StackNavigator } from 'react-navigation'

// Navigators
import AlarmScreen from './../screens/alarm'
import CameraScreen from './../screens/camera'
import CollectionScreen from './../screens/collection'

const StackNavigatorConfig = {}

const Alarm = {
	screen: AlarmScreen,
	path: '/alarm',
	navigationOptions: ({ navigation }) => ({
		header: null,
	}),
}

const Camera = {
	screen: CameraScreen,
	path: '/camera',
	navigationOptions: ({ navigation }) => ({
		header: null,
	}),
}

const Collection = {
	screen: CollectionScreen,
	path: '/collection',
	navigationOptions: ({ navigation }) => ({
		header: null,
	}),
}

export default StackNavigator({
  Alarm,
  Camera,
  Collection

}, StackNavigatorConfig);