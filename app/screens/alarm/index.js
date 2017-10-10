// /screens/alarm/index.js

import { Fab } from 'native-base'
import { connect } from 'react-redux'
import React, { Component } from 'react'
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

// styles
import { al, head, main, darkTheme, darkThemeObj } from './../../styles/alarm'

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
		const { hour, minute, ampm } = _alarm;
		const { editTime } = this.state;

		return (
			<View style={al.container}>

				<AlarmHeader navigation={navigation} />

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