// /screens/alarm/index.js

import { Fab } from 'native-base'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Picker,
  Modal,
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
		const { hour, minute, ampm, enabled } = _alarm;
		const { editTime } = this.state;

		return (
			<View style={al.container}>

				<PushController />

				<AlarmHeader navigation={navigation} />

				<View style={[main.container, theme.bg]}>
					<View>
						<Animatable.Text animation="fadeInUp" style={main.setText}>
							{ enabled ? 'Next time alarm will go off:' : 'Alarm disabled' }
						</Animatable.Text>

						<View style={main.setFor}>
							<Animatable.Text 
								animation="fadeInDown" 
								style={[main.time, theme.color]}>
									{`${hour}:${minute}`}<Text style={main.ampm}>{ampm}</Text>
							</Animatable.Text>
						</View>

						<View style={main.setFor}>
							<Animatable.Text animation="fadeInUp" style={[main.date, theme.color]}>Monday, October 9, 2017</Animatable.Text>
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