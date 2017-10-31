// /screens/alarm/index.js

import { Fab } from 'native-base'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native'

// components
import Menu from './../menu'
import SetAlarm from './setAlarm'
import AlarmHeader from './header'
import NavHeader from './../../components/navHeader'
import BackgroundImage from './../../components/backgroundImage'

// styles
import { main, darkTheme, darkThemeObj } from './../../styles/alarm'

const theme = darkTheme;

class Alarm extends Component{
	constructor(props){
		super(props);

		this.state = {
			slideUp: false,
			editTime: false,
		}
	}	

	render(){
		const { navigation, _alarm } = this.props;
		const { hour, minute, ampm, enabled, next_alarm_day } = _alarm;
		const { editTime, slideUp } = this.state;

		return (
			<View style={[main.container, theme.bg]}>

				<StatusBar barStyle="light-content" />

				<BackgroundImage />

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

				{ slideUp && <SetAlarm /> }

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