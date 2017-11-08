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
        OneSignal.addEventListener('opened', this._onOpened);
		OneSignal.addEventListener('received', this._onReceived);
	}

	componentWillUnmount(){
        OneSignal.removeEventListener('opened', this._onOpened);
		OneSignal.removeEventListener('received', this._onReceived);
	}

	_onReceived = data => {
		console.log('notification received: ', data);
	}

	_onOpened = ({ action, notification }) => {
		console.log('notification opened: ', { action, notification });

		const { navigation } = this.props;

		if( Platform.OS === 'android' ){
			OneSignal.clearOneSignalNotifications(); // clear once opened
			const { notification_type } = notification.payload.additionalData;

			if( notification_type === 'alarm' ){
				navigation.navigate('Waker');
			}

		}else{
			const { navigation } = this.props;
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
