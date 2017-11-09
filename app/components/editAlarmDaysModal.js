// /components/editAlarmDaysModal.js

import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
  View,
  Text,
  Modal,
  Picker,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

// components
import EditModalActionBar from './editModalActionBar'

// actions
import { saveAlarmData, updateAlarm } from './../actions/alarm'
import { sendNotificationPromise, deleteNotificationPromise } from './../actions/user'

// styles
import { edit } from './../styles/alarm'

// constants
import { alarmNotificationModel } from './../constants/user'

import { 
	DAYS_OF_WEEK, 
	determineNextAlarmDay,
	sendAlarmNotifications, 
	deleteAlarmNotifications,
	determineDaysSelectedType
} from './../constants/alarm'

class EditAlarmDays extends Component{
	constructor(props){
		super(props);

		this.state = {
			repeat: props._alarm.repeat,
			repeat_label: props._alarm.repeat_label,
			notifications: props._alarm.notifications,
		}
	}

	_sendAndSave = () => {
		// delete all existing notifications first, if any
		const { enabled } = this.props._alarm;
		const { notifications } = this.state;

		// only if alarm is already enabled should we delete/save new alarm notifications
		if( enabled ){
			// if we currently have alarms set, delete them first, before saving new alarm settings
			// else just set new alarm
			if( notifications.length > 0 ){
				deleteAlarmNotifications({ 
					index: 0,
					notifications, 
					onDone: () => {
						this.props.dispatch( updateAlarm({notifications: []}) );
						this.setState({notifications: []});
						this._send();
					}
				});

			}else this._send();

		}else this._saveAlarm();
	}

	_getAlarmData = () => {
		const { dispatch, _alarm } = this.props;
		const { repeat_label, repeat: _r, notifications } = this.state;
		const { hour, minute } = _alarm;

		const nextAlarmDayData = determineNextAlarmDay({ selected_days: _r, hour, minute });

		return { 
			..._alarm,
			repeat_label, 
			notifications,
			...nextAlarmDayData,
		};
	}

	_send = () => {
		const { _user } = this.props;
		const alarmData = this._getAlarmData();

		const alarmNotifications = alarmNotificationModel({ _user, alarmData });

		// if there are alarm notifications, set them
	    if( alarmNotifications && Array.isArray(alarmNotifications) )
	    	sendAlarmNotifications({ 
	    		alarmNotifications, 
	    		index: 0,
	    		callback: notif_id => this.setState({notifications: [...this.state.notifications, notif_id]}),
	    		onDone: () => this._saveAlarm(),
	    	});
	}

	_saveAlarm = () => {
		const { dispatch, close } = this.props;
		const { notifications } = this.state;
		const alarmData = this._getAlarmData();

		dispatch( saveAlarmData({ alarmData }) );
		close();
	}

	_daySelected = ({ name, active }) => {
		const repeat = {
			...this.state.repeat,
			[name]: !active,
		}

		const days = [];

		for( const key in repeat ){
			if( repeat[key] ) days.push(key);
		}

		const repeat_label = determineDaysSelectedType(days);

		this.setState({ repeat, repeat_label });
	}

	render(){
		const { close } = this.props;
		const { repeat, repeat_label } = this.state;

		return (
			<Modal
				animationType="slide"
				transparent={true}
				onRequestClose={() => {}}
				visible={true}>

					<View style={edit.modal}>

						<EditModalActionBar
							close={ close }
							save={ this._sendAndSave } />

						<View style={edit.dateWrapper}>
							{ DAYS_OF_WEEK.map(day => <DaySelector 
														key={day.name} 
														{...day} 
														active={ !!repeat[day.name] }
														onPress={ this._daySelected } />) }
						</View>

					</View>

			</Modal>
		);
	}
}

const DaySelector = ({ name, abbr, active, onPress }) => (

	<TouchableOpacity 
		style={[edit.day, active && edit.dayActive]}
		onPress={ () => onPress({ name, active }) }>

			<Text style={[edit.dayText, active && edit.dayTextActive]}>{abbr}</Text>

	</TouchableOpacity>

)

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
		_alarm: state._alarm,
	}
}

export default connect(mapStateToProps)(EditAlarmDays);