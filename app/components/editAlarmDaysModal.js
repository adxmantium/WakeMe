// /components/editAlarmDaysModal.js

import moment from 'moment'
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
import { sendAlarmNotifications, deleteAlarmNotifications } from './../constants/alarm'
import { 
	DAYS_OF_WEEK, 
	determineDaysSelectedType,
	EMPTY_NEXT_ALARM_DAY_LABEL,
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
		const { dispatch, _alarm, close } = this.props;
		const { repeat_label, repeat: _r, notifications } = this.state;

		const repeat = {};

		const today = moment().day( moment().day() );
		let selected_day = null;
		let next_alarm_day = EMPTY_NEXT_ALARM_DAY_LABEL;
		let next_alarm_day_moment = null;

		// get only the days that are true
		for( const day in _r ){
			// if day is selected
			if( _r[day] ){

				repeat[day] = _r[day]; // cache this day
				selected_day = moment().day(day); // turn day into moment
				today_selected_diff = selected_day.diff(today, 'days'); // returns num

				// if selected day has already passed, make this day the next week of this day
				if( today_selected_diff < 0 ){
					selected_day = selected_day.add(1, 'w');
					today_selected_diff = selected_day.diff(today, 'days');
				}

				if( next_alarm_day_moment === null ) next_alarm_day_moment = selected_day;
				else if( today_selected_diff < next_alarm_day_moment.diff(today, 'days') ) next_alarm_day_moment = selected_day;
			}
		}

		// if next_alarm_day_moment is set, format for display
		if( next_alarm_day_moment ) next_alarm_day = next_alarm_day_moment.format('dddd, MMM D, YYYY');

		return { 
			..._alarm,
			repeat,
			repeat_label, 
			notifications,
			next_alarm_day,
			next_alarm_day_moment,
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