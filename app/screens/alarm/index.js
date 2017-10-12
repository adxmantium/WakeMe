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
  TouchableOpacity,
} from 'react-native'

// components
import Menu from './../menu'
import SetAlarm from './setAlarm'
import AlarmHeader from './header'
import PushController from './../../components/pushController'

// styles
import { al, main, darkTheme, darkThemeObj } from './../../styles/alarm'

const theme = darkTheme;
const themeObj = darkThemeObj;

class Alarm extends Component{
	constructor(props){
		super(props);

		this.state = {
			editTime: false,
		}
	}

	render(){
		const { navigation, _alarm } = this.props;
		const { hour, minute, ampm, enabled, next_alarm_day } = _alarm;
		const { editTime } = this.state;

		return (
			<View style={al.container}>

				<PushController />

				<View style={[main.container, theme.bg]}>

					<Image style={main.bg} source={require('./../../images/wakeme_bg_3.jpg')} />

					<View style={main.innerContainer}>

						<AlarmHeader navigation={navigation} />

						<View style={main.inner}>
							<Animatable.Text animation="fadeInRight" style={main.setText}>
								{ enabled ? 'Next time alarm will go off:' : 'Alarm disabled' }
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
						
					</View>

				</View>

				<SetAlarm />

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