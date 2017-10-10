// /screens/alarm/index.js

import { Fab } from 'native-base'
import { connect } from 'react-redux'
import React, { Component } from 'react'
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
import SetAlarm from './setAlarm'

// styles
import { al, head, main, darkTheme } from './../../styles/alarm'

const theme = darkTheme;

class Alarm extends Component{
	constructor(props){
		super(props);

		this.state = {
			editTime: false,
		}
	}

	render(){
		const { hour, minute, ampm } = this.props._alarm;
		const { editTime } = this.state;

		return (
			<View style={al.container}>

				<View style={[head.container, theme.bg]}>
					<Text style={[head.name, theme.color]}>WakeMe</Text>
				</View>

				<View style={[main.container, theme.bg]}>
					<Text style={[main.time, theme.color]}>{`${hour}:${minute}`}<Text style={main.ampm}>{ampm}</Text></Text>
					<Text style={[main.date, theme.color]}>Monday, October 9, 2017</Text>
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