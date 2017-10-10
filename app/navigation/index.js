// /navigation/index.js

// libs
// import { AccessToken } from 'react-native-fbsdk'
import { StackNavigator } from 'react-navigation'

// Navigators
import AlarmScreen from './../screens/alarm'

const StackNavigatorConfig = {}

// Conversation Stack
const Alarm = {
	screen: AlarmScreen,
	path: '/alarm',
	navigationOptions: ({ navigation }) => ({
		header: null,
	}),
}

export default StackNavigator({
  Alarm,

}, StackNavigatorConfig);