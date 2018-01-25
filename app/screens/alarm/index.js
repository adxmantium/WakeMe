// /screens/alarm/index.js

import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  Alert,
  StatusBar,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'

// components
import SetAlarm from './setAlarm'
import AlarmHeader from './header'
import InfoModal from './../../components/infoModal'
import NavHeader from './../../components/navHeader'
import PushController from './../../components/pushController'
import BackgroundImage from './../../components/backgroundImage'

// actions
import { saveAlarmData, updateAlarm } from './../../actions/alarm'
import { updateFriends, acceptFriendship } from './../../actions/friends'

// constants
import { tomorrowsMoment } from './../../constants/alarm'

// styles
import { main, darkTheme, darkThemeObj } from './../../styles/alarm'

const theme = darkTheme;
const infoBody = [
	'Do not put your phone in silent mode in order to hear the alarm sound.',
	'Make sure Notifications are enabled so that you can receive your alarm.'
];

class Alarm extends PureComponent{
	constructor(props){
		super(props);

		this.state = {
			slideUp: false,
			editTime: false,
			hideUsageMsg: false,
			openInfoModal: false,
			notification: 0,
			infoActions: [
				{name: 'ok', title: 'Ok, got it!', onPress: () => this.setState({openInfoModal: false})},
				{name: 'dontshow', title: "Got it and don't show this message again.", onPress: this._dontShowMsgAgain}
			]
		}
	}	

	componentWillMount(){
		const { _alarm } = this.props;	

		// check the phones storage if neverShowAppUsageMsg was set, if so, shouldn't show enabled modal
		AsyncStorage.getItem('neverShowAppUsageMsg')
					.then(val => this.setState({hideUsageMsg: val === '1'}));	
	}

	componentWillReceiveProps(np){
		const { outstanding_list: this_list } = this.props._friends;
		const { outstanding_list: next_list} = np._friends;	

		// if there are any in the outstanding list, add count notifications
		if( this_list.length !== next_list.length && next_list.length > this_list.length ){
			this.setState({notification: next_list.length});
		}	
	}

	componentDidUpdate(pp, ps){
		const { _user, _friends } = this.props;
		const { fetched_user_info: this_fetched } = _user;
		const { fetched_user_info: prev_fetched } = pp._user;
		const { receivedFriendRequest: this_rfr } = _friends;
		const { receivedFriendRequest: prev_rfr } = pp._friends;

		// if notification was open while app was inactive, check store if on app open there is a notification trigger that we set in app.js
		const fetchedUserInfoDiff = this_fetched !== prev_fetched && this_fetched;
		const receivedFriendRequestDiff = this_rfr !== prev_rfr && this_rfr;

		if( fetchedUserInfoDiff || receivedFriendRequestDiff ){
			this._checkIfAlarmWentOffWhenAppWasClosed();
		}
	}

	_checkIfAlarmWentOffWhenAppWasClosed = () => {
		const { dispatch, navigation, _alarm, _friends } = this.props;
		
		// check if user has received alarm while app was closed
		if( _alarm.receivedAlarm ){
	        const alarmData = {..._alarm, enabled: false};
	        
	        navigation.navigate('Waker'); // start waker
	        dispatch( updateAlarm({receivedAlarm: false}) ); // reset receivedAlarm
	        dispatch( saveAlarmData({ alarmData }) ); // disable alarm

		}else if( _friends.receivedFriendRequest ){
			// else if user received friend request while app was closed, show request alert
			this._showRequestAlert(_friends.receivedFriendRequestData);

			 // reset receivedFriendRequest
	        dispatch( updateFriends({
	        	receivedFriendRequest: false,
	        	receivedFriendRequestData: null,
	        }) );
		}
	}

	_showRequestAlert = ({ title, body, additionalData, ...rest }) => {
		const { dispatch } = this.props;
		const { notification_type, ...friend } = additionalData;
		const buttons = [
			{text: 'Accept', onPress: () => dispatch( acceptFriendship({...friend, friend_request_accepted: true}) )},
			{text: 'Not Now'},
		];

		Alert.alert(title, body, buttons);
	}

	_dontShowMsgAgain = () => {
		AsyncStorage.setItem('neverShowAppUsageMsg', '1');
		this._toggleModal(false);
	}

	_toggleModal = bool => this.setState({openInfoModal: bool})

	_openCollection = () => {
		const { navigation, _friends } = this.props;

		// if user has friends to send wakers to, allow them to access camera
		if( !_friends.accepted_list || !_friends.accepted_list.length ) this.setState({notification: '!'});
		else navigation.navigate('Collection')
	}

	_openProfile = () => {
		this._clearNotification();
		this.props.navigation.navigate('Profile');
	}

	_openCamera = () => {
		const { navigation, _friends } = this.props;

		// if user has friends to send wakers to, allow them to access camera
		if( !_friends.accepted_list || !_friends.accepted_list.length ) this.setState({notification: '!'});
		else navigation.navigate('Camera');
	}

	_clearNotification = () => this.setState({notification: 0})

	render(){
		const { hour, minute, ampm, enabled, next_alarm_day } = this.props._alarm;
		const { editTime, slideUp, openInfoModal, infoActions, hideUsageMsg, notification } = this.state;

		return (
			<View style={[main.container, theme.bg]}>

				<StatusBar barStyle="light-content" />

				<BackgroundImage />

				{/* <PushController {...this.props} /> */}

				<NavHeader
					title="WakeMe"
					leftIcon="list"
					rightIcon="camera"
					notification={ notification }
					leftPress={ this._openCollection }
					middlePress={ this._openProfile }
					rightPress={ this._openCamera } />

				<View style={main.innerContainer}>
					<Animatable.Text animation="fadeInRight" style={main.setText}>
						{ enabled ? 'Wake me at:' : 'Alarm disabled' }
					</Animatable.Text>

					<View style={main.setFor}>
						<Animatable.Text 
							animation="fadeInRight" 
							style={[main.time, theme.color]}>
								{enabled ? `${hour}:${minute}` : '---'}<Text style={main.ampm}>{ enabled ? ampm : ''}</Text>
						</Animatable.Text>
					</View>

					<View style={main.setFor}>
						{ enabled && 
							<Animatable.Text animation="fadeInRight" style={[main.date, theme.color]}>
								{ enabled ? next_alarm_day : '' }
							</Animatable.Text> 
						}
					</View>
				</View>

				<Animatable.View animation="swing" iterationCount={5}>
					<TouchableOpacity 
						style={[main.editBtn]}
						onPress={ () => this.setState({slideUp: !slideUp}) }>
							<Text style={[main.editTitle,  slideUp && theme.color]}>Set Alarm</Text>
							<Icon 
								name={slideUp ? 'chevron-down' : 'chevron-up'} 
								size={10} 
								style={main.chevron}
								color={darkThemeObj.menuIcon} />
					</TouchableOpacity>
				</Animatable.View>

				{ slideUp && <SetAlarm toggleModal={!hideUsageMsg && this._toggleModal} /> }

				{ openInfoModal && 
					<InfoModal 
						title="For the alarm to work completely..."
						body={ infoBody }
						actions={ infoActions } />
				}

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
		_alarm: state._alarm,
		_friends: state._friends,
	}
}

export default connect(mapStateToProps)(Alarm);