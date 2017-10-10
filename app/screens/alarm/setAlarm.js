// /screens/alarm/index.js

import { connect } from 'react-redux'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  Modal,
  Picker,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

// components
import EditAlarmTimeModal from './../../components/editAlarmTimeModal'

// styles
import { edit, darkTheme, darkThemeObj } from './../../styles/alarm'

const theme = darkTheme;
const themeObj = darkThemeObj;

class SetAlarm extends Component{
	constructor(props){
		super(props);

		this.state = {
			editTime: false,
		}
	}

	_hourPress = () => {
		this.setState({editTime: true});
	}

	_minutePress = () => {
		this.setState({editTime: true});
	}

	_ampmPress = () => {
		this.setState({editTime: true});
	}

	render(){
		const { hour, minute, ampm } = this.props._alarm;
		const { editTime } = this.state;

		return (
			<ScrollView style={[edit.container, theme.bg3]}>

				<Text style={[edit.title, theme.color2]}>Set Alarm</Text>

				<TouchableOpacity 
					style={[edit.field]}
					onPress={() => this.setState({editTime: true})}>
						<Text style={theme.color2}><Text style={edit.label}>Time</Text>: {`${hour}:${minute} ${ampm}`}</Text>
						<Icon name="chevron-right" size={20} color={darkThemeObj.icon} />
				</TouchableOpacity>

				<TouchableOpacity 
					style={[edit.field]}
					onPress={() => this.setState({editTime: true})}>
						<Text style={theme.color2}><Text style={edit.label}>Repeat</Text>: Everyday</Text>
						<Icon name="chevron-right" size={20} color={darkThemeObj.icon} />
				</TouchableOpacity>

				<TouchableOpacity 
					style={[edit.field]}
					onPress={() => this.setState({editTime: true})}>
						<Text style={theme.color2}><Text style={edit.label}>Sound</Text>: Default</Text>
						<Icon name="chevron-right" size={20} color={darkThemeObj.icon} />
				</TouchableOpacity>

				{ editTime && 
					<EditAlarmTimeModal close={ () => this.setState({editTime: false}) } /> }

			</ScrollView>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_alarm: state._alarm,
	}
}

export default connect(mapStateToProps)(SetAlarm);