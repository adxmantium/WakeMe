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
import { saveAlarmData } from './../actions/alarm'
import { sendNotificationPromise } from './../actions/user'

// constants
import { alarmNotificationModel } from './../constants/user'

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
		const { dispatch, _alarm, _user } = this.props;
		const alarmData = {..._alarm, ...this.state};

		const alarmNotifications = alarmNotificationModel({ _user, alarmData });

		// if there are alarm notifications, set them
	    if( alarmNotifications && Array.isArray(alarmNotifications) )
	    	this._sendAlarmNotifications({ alarmNotifications, index: 0 });
	}

	_sendAlarmNotifications = ({ alarmNotifications, index }) => {
		if( index === 10 ) return; // just in case

		// if this index of alarmNotifications exists, post to onesignal
		if( alarmNotifications[index] ){
			const promise = sendNotificationPromise( alarmNotifications[index] );

			promise.then(res => {
				this.setState({notifications: [...this.state.notifications, res.data.id]});
				this._sendAlarmNotifications({ alarmNotifications, index: index + 1 }); // recurse
			});

			promise.catch(err => {
				// console.log('err: ', err)
			});
		}else{
			// no more alarm notifications to send
			this._saveAlarm();
		}
	}

	_saveAlarm = () => {
		const { dispatch, _alarm, close } = this.props;
		const alarmData = {..._alarm, ...this.state};

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
								selectedValue={ hour }
								onValueChange={ hour => this.setState({ hour }) }>
									{ this.hours.map(x => <Picker.Item key={x} label={x} value={x} />) }
							</Picker>

							<Text style={edit.colon}>:</Text>

							<Picker 
								style={edit.picker}
								selectedValue={ minute }
								onValueChange={ minute => this.setState({ minute }) }>
									{ this.minutes.map(x => <Picker.Item key={x} label={x} value={x} />) }
							</Picker>

							<Picker 
								style={edit.picker}
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