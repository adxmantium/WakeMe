// /components/pushController.js

// libs
import React, { Component } from 'react'
import OneSignal from 'react-native-onesignal'
import { AppState, Platform } from 'react-native'

// actions
import { acceptFriendship } from './../actions/friends'
import { saveAlarmData, updateAlarm } from './../actions/alarm'

// constants
import { determineNextAlarmDay } from './../constants/alarm'
import { alarmNotificationModel } from './../constants/user'
import { sendNotificationPromise, deleteAlarmNotifications } from './../actions/user'

export default class PushController extends Component{
	constructor(props){
		super(props);

		this.state = {
			appState: AppState.currentState,
		}
	}

	componentWillMount(){
        OneSignal.addEventListener('opened', this._onOpened);
		OneSignal.addEventListener('received', this._onReceived);
	}

	componentWillUnmount(){
        OneSignal.removeEventListener('opened', this._onOpened);
		OneSignal.removeEventListener('received', this._onReceived);
	}

	componentWillUpdate(){
		console.log('AppState here: ', AppState);
		if( AppState.currentState !== this.state.appState ){
			const { navigation, _alarm } = this.props;

			console.log(' ----- app state has changed! ----- ');
			console.log('AppState: ', AppState);
			console.log('appState: ', this.state.appState);

			if( _alarm.triggered ){
				console.log('alarm triggered! open waker');
			}
		}
	}

	_onReceived = data => {
		console.log('notification received: ', data);
		console.log('app state: ', AppState);

		const { dispatch, navigation, _user, _alarm } = this.props;
		const { repeat: selected_days, hour, minute } = _alarm;
		const { notificationID } = data.payload;

		if( !data.isAppInFocus ){
			navigation.navigate('Waker');
		}

		// after 1 min, determine next alarm day and create next alarm
		setTimeout(() => {
			this._sendNextAlarm({ notificationID }); 
		}, 60000);
	}

	_onOpened = ({ action, notification }) => {
		console.log('notification opened: ', { action, notification });

		const { dispatch, navigation } = this.props;
		const { notification_type, ...restOf } = notification.payload.additionalData;

		// clear notifications for android - ios done automagically
		if( Platform.OS === 'android' ) OneSignal.clearOneSignalNotifications();

		// if notification type is alarm - start waker
		if( notification_type === 'alarm' ){
			navigation.navigate('Waker');

		}else if( notification_type === 'friend_request_inquiry' ){

			// accept friend request only if actionID is 'accept'
			if( action.actionID === 'accept' ){
				const friend = restOf;
				console.log('friend: ', friend);
				// dispatch( acceptFriendship({...friend, friend_request_accepted: true}) );
			}
		}
	}

	_sendNextAlarm = ({ notificationID }) => {
		const { notifications = [] } = _alarm;
		let notificationMinusThisAlarm = [...notifications];

		// if notificationID is in notifications arr, remove it
		if( notifications.includes( notificationID ) ){
			notificationMinusThisAlarm = notifications.filter(noti => noti !== notificationID);
		} 

		// if notifications still has any alarms left after filtering don't do anything
		// only if notifications is empty should we set the next set of alarms
		if( notificationMinusThisAlarm.length === 0 ){
			console.log('no alarm left, set new ones');
			this._sendNewAlarms();	
		}else{
			console.log('there are still alarms set - no need to do anything');
		}

		
	}

	_sendNewAlarms = () => {
		const { _user, _alarm } = this.props;
		const { repeat: selected_days, hour, minute, ampm } = _alarm;

		const nextDay = determineNextAlarmDay({ selected_days, hour, minute, ampm });

		const alarmData = {
			..._alarm,
			...nextDay,
		};

		const alarmNotifications = alarmNotificationModel({ _user, alarmData });

    	sendAlarmNotifications({ 
    		alarmNotifications, 
    		index: 0,
    		onDone: () => console.log('sent next alarm!'),
    	});
	}

	render(){
		return null;
	}
}
