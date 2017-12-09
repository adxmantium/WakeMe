// /screens/alarm/index.js

import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  Modal,
  Switch,
  Picker,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

// actions
import { saveAlarmData, updateAlarm } from './../../actions/alarm'
import { sendNotificationPromise, deleteNotificationPromise } from './../../actions/user'

// components
import EditAlarmTimeModal from './../../components/editAlarmTimeModal'
import EditAlarmDaysModal from './../../components/editAlarmDaysModal'

// styles
import { edit, darkTheme, darkThemeObj } from './../../styles/alarm'

// constants
import { alarmNotificationModel } from './../../constants/user'
import { 
	determineNextAlarmDay, 
	sendAlarmNotifications, 
	deleteAlarmNotifications 
} from './../../constants/alarm'

const theme = darkTheme;
const themeObj = darkThemeObj;

class SetAlarm extends Component{
	constructor(props){
		super(props);

		this.state = {
			editTime: false,
			editDays: false,
			editSound: false,
			notifications: [],
			enabled: props._alarm.enabled,
		}
	}

	_onPress = name => this.setState({[name]: true})	

	_save = enabled => {
		const { dispatch, _alarm } = this.props;
		const alarmData = {..._alarm, enabled};
		const { notifications } = _alarm;

		// delete, if any, and save
		if( notifications.length > 0 ){
			deleteAlarmNotifications({ 
				index: 0, 
				notifications, 
				onDone: () => this._sendOrSave({ enabled, alarmData }),
			});

		}else this._sendOrSave({ enabled, alarmData });
	}

	_sendOrSave = ({ enabled, alarmData }) => {
		if( enabled ){
			// alarm enabled, so create alarm notifications
			this._send( alarmData );
		}else{
			// alarm disabled, so just save the new alarm state to db
			alarmData = {...alarmData, notifications: []};
			this._saveAlarm( alarmData );
		}
	}

	_send = alarmData => {
		const { _user } = this.props;

		const alarmNotifications = alarmNotificationModel({ _user, alarmData });

		// if there are alarm notifications, set them
	    if( alarmNotifications && Array.isArray(alarmNotifications) )
	    	sendAlarmNotifications({ 
	    		alarmNotifications, 
	    		index: 0, 
	    		callback: notif_id => this.setState({notifications: [...this.state.notifications, notif_id]}),
	    		onDone: () => {
	    			// no more alarm notifications to send when here, now save alarm data to db
					alarmData = {...alarmData, notifications: this.state.notifications};
					this._saveAlarm( alarmData );
	    		}
	    	});
	}

	_getAlarmData = () => {
		const { dispatch, _alarm } = this.props;
		const { repeat, hour, minute, ampm } = _alarm;

		const nextAlarmDayData = determineNextAlarmDay({ selected_days: repeat, hour, minute, ampm });

		return nextAlarmDayData.next_alarm_day;
	}

	_saveAlarm = alarmData => {
		alarmData.next_alarm_day = this._getAlarmData();

		this.setState({notifications: []})

		this.props.dispatch( saveAlarmData({ alarmData }) );
	}

	_toggleModalThenSave = enabled => {
		const { toggleModal } = this.props;

		this.setState({ enabled });

		toggleModal && toggleModal(enabled);
		
		this._save(enabled);	
	}

	render(){
		const { dispatch, _alarm } = this.props;
		const { hour, minute, ampm, repeat_label } = _alarm;
		const { editTime, editDays, editSound, enabled } = this.state;

		return (
			<Animatable.View animation="slideInUp" duration={500} style={[edit.container, theme.bg3]}>
				<View style={edit.alarmEditContainer}>

					<View style={[edit.field, edit.enabler]}>
						<Text style={theme.color2}><Text style={edit.label}>{enabled ? 'Enabled' : 'Disabled'}</Text></Text>
						<Switch 
							value={ enabled }
							onTintColor={themeObj.menuActive}
							thumbTintColor={themeObj.menuInactive}
							onValueChange={ this._toggleModalThenSave } />
					</View>

					<TouchableOpacity 
						style={[edit.field, edit.incr, edit.bor]}
						onPress={ () => this._onPress('editTime') }>
							<Text style={theme.color2}><Text style={edit.label}>Time</Text>: {`${hour}:${minute} ${ampm}`}</Text>
							<Icon name="chevron-right" size={20} color={darkThemeObj.icon} />
					</TouchableOpacity>

					<TouchableOpacity 
						style={[edit.field, edit.incr]}
						onPress={ () => this._onPress('editDays') }>
							<Text style={theme.color2}><Text style={edit.label}>Repeat</Text>: { repeat_label }</Text>
							<Icon name="chevron-right" size={20} color={darkThemeObj.icon} />
					</TouchableOpacity>

					{/*<TouchableOpacity 
						style={[edit.field, edit.incr]}
						onPress={ () => this._onPress('editTime') }>
							<Text style={theme.color2}><Text style={edit.label}>Sound</Text>: Default</Text>
							<Icon name="chevron-right" size={20} color={darkThemeObj.icon} />
					</TouchableOpacity>*/}

					{ editTime && 
						<EditAlarmTimeModal close={ () => this.setState({editTime: false}) } /> }

					{ editDays && 
						<EditAlarmDaysModal close={ () => this.setState({editDays: false}) } /> }

				</View>
			</Animatable.View>
		);
	}
}

const mapStateToProps = (state, props) => ({
	_user: state._user,
	_alarm: state._alarm,
})

export default connect(mapStateToProps)(SetAlarm);