// /components/pushController.js

// libs
import { connect } from 'react-redux'
import { Platform } from 'react-native'
import React, { Component } from 'react'
import OneSignal from 'react-native-onesignal'

// actions
import { saveAlarmData } from './../actions/alarm'

let count = 0;

class PushController extends Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		OneSignal.addEventListener('received', this._onReceived);
        OneSignal.addEventListener('opened', this._onOpened);
	}

	componentWillUnmount(){
		OneSignal.removeEventListener('received', this._onReceived);
        OneSignal.removeEventListener('opened', this._onOpened);
	}

	_onReceived = data => {
		console.log('notification received: ', data);

		// if( Platform.OS === 'android' ){
		// 	console.log('is android');

		// 	if( notification && notification.isAppInFocus ){
		// 		console.log('user pressed notification');
		// 	}else{
		// 		console.log('user did NOT press notification - alarm should still be playing');
		// 	}

		// }else{
		// 	console.log('is iOS');
		// }
	}

	_onOpened = ({ action, notification }) => {
		console.log('notification opened: ', { action, notification });

		if( Platform.OS === 'android' ){
			OneSignal.clearOneSignalNotifications(); // clear once opened
			// console.log('is android');
			count++;
			console.log('count: ', count);

		}else{
			console.log('is iOS');
		}
	}

	render(){
		return null;
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
		_alarm: state._alarm,
	}
}

export default connect(mapStateToProps)(PushController);