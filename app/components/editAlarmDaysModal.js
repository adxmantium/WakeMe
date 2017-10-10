// /components/editAlarmDaysModal.js

// /screens/alarm/index.js

import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
  View,
  Text,
  Modal,
  Picker,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

// actions
import { saveAlarm } from './../actions/alarm'

// styles
import { edit } from './../styles/alarm'

// constants
import { 
	DAYS_OF_WEEK, 
	determineDaysSelectedType,
} from './../constants/alarm'

class EditAlarmDays extends Component{
	constructor(props){
		super(props);

		this.state = {
			repeat: props._alarm.repeat,
			repeat_label: props._alarm.repeat,
		}
	}

	_save = () => {
		const { dispatch, close } = this.props;

		dispatch( saveAlarm({...this.state}) );
		close();
	}

	_daySelected = ({ name, active }) => {
		const repeat = {
			...this.state.repeat,
			[name]: !active,
		}

		const days = [];

		for( const key in repeat ){
			if( repeat[key] ) days.push(key);
		}

		const repeat_label = determineDaysSelectedType(days);

		this.setState({ repeat, repeat_label });
	}

	render(){
		const { close } = this.props;
		const { repeat, repeat_label } = this.state;

		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={true}>

					<View style={edit.modal}>

						<View style={edit.actions}>

							<TouchableOpacity
								style={edit.btn}
								onPress={ close }>
									<Text style={[edit.btnText, edit.btnCancel]}>Cancel</Text>
							</TouchableOpacity>

							<TouchableOpacity 
								style={edit.btn}
								onPress={ this._save }>
									<Text style={[edit.btnText, edit.btnSave]}>Save</Text>
							</TouchableOpacity>

						</View>

						<View style={edit.dateWrapper}>
							{ DAYS_OF_WEEK.map(day => <DaySelector 
														key={day.name} 
														{...day} 
														active={ !!repeat[day.name] }
														onPress={ this._daySelected } />) }
						</View>

					</View>

			</Modal>
		);
	}
}

const DaySelector = ({ name, abbr, active, onPress }) => (

	<TouchableOpacity 
		style={[edit.day, active && edit.dayActive]}
		onPress={ () => onPress({ name, active }) }>

			<Text style={[edit.dayText, active && edit.dayTextActive]}>{abbr}</Text>

	</TouchableOpacity>

)

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
		_alarm: state._alarm,
	}
}

export default connect(mapStateToProps)(EditAlarmDays);