// /components/editAlarmTimeModal.js

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

// constants
import { alarmNotificationModel } from './../constants/user'

import { 
	determineNextAlarmDay, 
	sendAlarmNotifications, 
	deleteAlarmNotifications
} from './../constants/alarm'

// styles
import { edit } from './../styles/alarm'

class EditAlarmTime extends Component{
	constructor(props){
		super(props);

		this.ampm = ['am', 'pm'];
		this.hours = [...new Array(12).keys()].map(x => ''+(x+1));
		this.minutes = [...new Array(60).keys()].map(x => x < 10 ? '0'+x : ''+x);

		this.state = {
			hour: props._alarm.hour,
			minute: props._alarm.minute,
			ampm: props._alarm.ampm,
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
		const { repeat_label, repeat } = _alarm;
		const { notifications, hour, minute, ampm } = this.state;

		const nextAlarmDayData = determineNextAlarmDay({ selected_days: repeat, hour, minute, ampm });

		return { 
			..._alarm,
			...this.state,
			...nextAlarmDayData,
		};
	}

	_send = () => {
		const { dispatch, _alarm, _user } = this.props;
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
		const { dispatch, _alarm, close } = this.props;
		const alarmData = this._getAlarmData();

		dispatch( saveAlarmData({ alarmData }) );
		close();
	}

	render(){
		const { close } = this.props;
		const { hour, minute, ampm } = this.state;

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

						<View style={edit.pickerWrapper}>

							<Picker 
								style={edit.picker}
								mode="dropdown"
								selectedValue={ hour }
								onValueChange={ hour => this.setState({ hour }) }>
									{ this.hours.map(x => <Picker.Item key={x} label={x} value={x} />) }
							</Picker>

							<Text style={edit.colon}>:</Text>

							<Picker 
								style={edit.picker}
								mode="dropdown"
								selectedValue={ minute }
								onValueChange={ minute => this.setState({ minute }) }>
									{ this.minutes.map(x => <Picker.Item key={x} label={x} value={x} />) }
							</Picker>

							<Picker 
								style={edit.picker}
								mode="dropdown"
								selectedValue={ ampm }
								onValueChange={ ampm => this.setState({ ampm }) }>
									{ this.ampm.map(x => <Picker.Item key={x} label={x} value={x} />) }
							</Picker>

						</View>

					</View>

			</Modal>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
		_alarm: state._alarm,
	}
}

export default connect(mapStateToProps)(EditAlarmTime);