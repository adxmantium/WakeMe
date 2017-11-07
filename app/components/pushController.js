// /components/pushController.js

// libs
import { Platform } from 'react-native'
import React, { Component } from 'react'
import OneSignal from 'react-native-onesignal'

// actions
import { saveAlarmData } from './../actions/alarm'

export default class PushController extends Component{
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
	}

	_onOpened = ({ action, notification }) => {
		console.log('notification opened: ', { action, notification });

		if( Platform.OS === 'android' ){
			OneSignal.clearOneSignalNotifications(); // clear once opened
			console.log('is android');

		}else{
			const { navigation } = this.props;
			console.log('navigation: ', navigation);
			const { notification_type } = notification.payload.rawPayload.custom.a;

			console.log('type: ', notification_type);
			if( notification_type === 'alarm' ){
				navigation.navigate('Waker');
			}
		}
	}

	render(){
		return null;
	}
}
