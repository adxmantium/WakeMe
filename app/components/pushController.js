// /components/pushController.js

// libs
import React, { Component } from 'react'
import OneSignal from 'react-native-onesignal'
import { Platform, AppState, Alert } from 'react-native'

// actions
import { acceptFriendship } from './../actions/friends'
import { saveAlarmData, updateAlarm } from './../actions/alarm'

// constants
import { 
	determineNextAlarmDay,
	sendAlarmNotifications,
	deleteAlarmNotifications,
} from './../constants/alarm'

import { alarmNotificationModel } from './../constants/user'

export default class PushController extends Component{
	constructor(props){
		super(props);

		this.state = {
			notifications: [],
			notification_opened: false,
			notification_received: null,
			appState: AppState.currentState,
		}
	}

	componentWillMount(){
        OneSignal.addEventListener('opened', this._onOpened);
		OneSignal.addEventListener('received', this._onReceived);
		AppState.addEventListener('change', this._appStateChange);
	}

	componentWillUnmount(){
        OneSignal.removeEventListener('opened', this._onOpened);
		OneSignal.removeEventListener('received', this._onReceived);
		AppState.removeEventListener('change', this._appStateChange);
	}

	_appStateChange = nextAppState => {
		const { appState, notification_opened, notification_received } = this.state;

		if ( appState.match(/inactive|background/) && nextAppState === 'active' ){
			const { navigation } = this.props;
			console.log('appState changed');

	    	if( !notification_opened && notification_received ){
	    		navigation.navigate('Waker');

	    		this.setState({
	    			notification_opened: true,
	    			notification_received: null
	    		});
	    	}
	    }

	    this.setState({appState: nextAppState});
	}

	_onReceived = data => {
		console.log('notification received: ', data);
		const { notificationID, additionalData } = data.payload;
		const { notification_type } = additionalData;

		if( notification_type === 'alarm' ){
			this.setState({notification_received: notificationID});
			this._determineNextAlarm({ notificationID });	
		}else if( notification_type === 'friend_request_inquiry' ){
			console.log('friend notification received');
		}
	}

	_onOpened = ({ action, notification }) => {
		console.log('notification opened: ', { action, notification });

		const { dispatch, navigation } = this.props;
		const { notification_type, ...restOf } = notification.payload.additionalData;

		// clear notifications for android - ios done automagically
		if( Platform.OS === 'android' ) OneSignal.clearOneSignalNotifications();

		// if notification type is alarm - start waker
		if( notification_type === 'alarm' ){
			this.setState({notification_opened: true}); // set to open so that the AppState listener doesn't navigate
			navigation.navigate('Waker');

		}else if( notification_type === 'friend_request_inquiry' ){

			// accept friend request only if actionID is 'accept'
			if( action.actionID === 'accept' ){
				const friend = restOf;
				console.log('friend: ', friend);
				this._acceptFriendship( friend );
			}else{
				console.log('no action type');
				this._showRequestAlert( notification.payload );
			}
		}
	}

	_showRequestAlert = ({ title, body, additionalData, ...rest }) => {
		const { notification_type, ...friend } = additionalData;
		const buttons = [
			{text: 'Accept', onPress: () => this._acceptFriendship( friend )},
			{text: 'Not Now'},
		];

		Alert.alert(title, body, buttons);
	}

	_acceptFriendship = friend => {
		this.props.dispatch( acceptFriendship({...friend, friend_request_accepted: true}) );
	}

	_determineNextAlarm = ({ notificationID }) => {
		const { notifications = [] } = this.props._alarm;
		let notificationMinusThisAlarm = [...notifications];

		// if notificationID is in notifications arr, remove it
		if( notifications.includes( notificationID ) ){
			notificationMinusThisAlarm = notifications.filter(noti => noti !== notificationID);
		} 

		// if notifications still has any alarms left after filtering don't do anything
		// only if notifications is empty should we set the next set of alarms
		if( notificationMinusThisAlarm.length === 0 ){
			this._createNewAlarms();	

		}else{
			console.log('there are still alarms set - no need to do anything');
			// update db with new alarm notification list without the alarm notification that was just sent
			const alarmData = {
				...this.props._alarm,
				notifications: notificationMinusThisAlarm,
			};

			this._saveAlarm( alarmData );
		}

		
	}

	_createNewAlarms = () => {
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
    		callback: notif_id => this.setState({notifications: [...this.state.notifications, notif_id]}),
    		onDone: () => {
    			// update alarm notifications with created alarm notifications
    			alarmData.notifications = this.state.notifications;
    			this._saveAlarm( alarmData );
    		},
    	});
	}

	_saveAlarm = alarmData => {
		console.log('new alarm data', alarmData);
		this.props.dispatch( saveAlarmData({ alarmData }) );
	}

	render(){
		return null;
	}
}
