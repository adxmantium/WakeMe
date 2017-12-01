// /screens/alarm/index.js

import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
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

// styles
import { main, darkTheme, darkThemeObj } from './../../styles/alarm'

const theme = darkTheme;
const infoBody = [
	'Do not close the app after you enable your alarm.',
	'Do not put your phone in silent mode in order to hear the alarm sound.',
];

class Alarm extends PureComponent{
	constructor(props){
		super(props);

		this.state = {
			slideUp: false,
			editTime: false,
			hideUsageMsg: false,
			openInfoModal: false,
			infoActions: [
				{name: 'ok', title: 'Ok, got it!', onPress: () => this.setState({openInfoModal: false})},
				{name: 'dontshow', title: "Got it and don't show this message again.", onPress: this._dontShowMsgAgain}
			]
		}
	}	

	componentWillMount(){
		console.log('mounted');		

		AsyncStorage.getItem('neverShowAppUsageMsg')
					.then(val => this.setState({hideUsageMsg: val === '1'}));
	}

	_dontShowMsgAgain = () => {
		AsyncStorage.setItem('neverShowAppUsageMsg', '1');
		this._toggleModal(false);
	}

	_toggleModal = bool => {
		this.setState({openInfoModal: bool});
	}

	render(){
		const { navigation, _alarm } = this.props;
		const { hour, minute, ampm, enabled, next_alarm_day } = _alarm;
		const { editTime, slideUp, openInfoModal, infoActions, hideUsageMsg } = this.state;

		return (
			<View style={[main.container, theme.bg]}>

				<StatusBar barStyle="light-content" />

				<BackgroundImage />

				<PushController {...this.props} />

				<NavHeader
					title="WakeMe"
					leftIcon="list"
					rightIcon="camera"
					leftPress={() => navigation.navigate('Collection')}
					middlePress={() => navigation.navigate('Profile')}
					rightPress={() => navigation.navigate('Camera')} />

				<View style={main.innerContainer}>
					<Animatable.Text animation="fadeInRight" style={main.setText}>
						{ enabled ? 'Wake me at:' : 'Alarm disabled' }
					</Animatable.Text>

					<View style={main.setFor}>
						<Animatable.Text 
							animation="fadeInRight" 
							style={[main.time, theme.color]}>
								{`${hour}:${minute}`}<Text style={main.ampm}>{ampm}</Text>
						</Animatable.Text>
					</View>

					<View style={main.setFor}>
						<Animatable.Text animation="fadeInRight" style={[main.date, theme.color]}>{ next_alarm_day }</Animatable.Text>
					</View>
				</View>

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
	}
}

export default connect(mapStateToProps)(Alarm);