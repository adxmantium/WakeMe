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
import { saveAlarmData } from './../../actions/alarm'

// components
import EditAlarmTimeModal from './../../components/editAlarmTimeModal'
import EditAlarmDaysModal from './../../components/editAlarmDaysModal'

// styles
import { edit, darkTheme, darkThemeObj } from './../../styles/alarm'

const theme = darkTheme;
const themeObj = darkThemeObj;

class SetAlarm extends Component{
	constructor(props){
		super(props);

		this.state = {
			editTime: false,
			editDays: false,
			editSound: false,
		}
	}

	_onPress = name => this.setState({[name]: true})

	_save = enabled => {
		const { dispatch, _alarm } = this.props;
		const alarmData = {..._alarm, enabled};

		dispatch( saveAlarmData({ alarmData }) );
	}

	render(){
		const { dispatch, _alarm } = this.props;
		const { hour, minute, ampm, repeat_label, enabled } = _alarm;
		const { editTime, editDays, editSound } = this.state;

		return (
			<Animatable.View animation="slideInUp" duration={500} style={[edit.container, theme.bg3]}>
				<ScrollView>

					<View style={[edit.field, edit.enabler]}>
						<Text style={theme.color2}><Text style={edit.label}>{enabled ? 'Enabled' : 'Disabled'}</Text></Text>
						<Switch 
							value={ enabled }
							onTintColor={themeObj.menuActive}
							onValueChange={ this._save } />
					</View>

					<TouchableOpacity 
						style={[edit.field, edit.incr]}
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

					<TouchableOpacity 
						style={[edit.field, edit.incr]}
						onPress={ () => this._onPress('editTime') }>
							<Text style={theme.color2}><Text style={edit.label}>Sound</Text>: Default</Text>
							<Icon name="chevron-right" size={20} color={darkThemeObj.icon} />
					</TouchableOpacity>

					{ editTime && 
						<EditAlarmTimeModal close={ () => this.setState({editTime: false}) } /> }

					{ editDays && 
						<EditAlarmDaysModal close={ () => this.setState({editDays: false}) } /> }

				</ScrollView>
			</Animatable.View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_alarm: state._alarm,
	}
}

export default connect(mapStateToProps)(SetAlarm);