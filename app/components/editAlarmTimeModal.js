// /components/editAlarmTimeModal.js

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

class EditAlarmTime extends Component{
	constructor(props){
		super(props);

		this.ampm = ['am', 'pm'];
		this.hours = [...new Array(12).keys()].map(x => ''+(x+1));
		this.minutes = [...new Array(60).keys()].map(x => x < 10 ? '0'+x : ''+x);

		this.state = {
			hour: props._alarm.hour,
			minute: props._alarm.minute,
			ampm: props._alarm.ampm,
		}
	}

	_save = () => {
		const { dispatch, close } = this.props;

		dispatch( saveAlarm({...this.state}) );
		close();
	}

	render(){
		const { open, close } = this.props;
		const { hour, minute, ampm } = this.state;

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

						<View style={edit.pickerWrapper}>

							<Picker 
								style={edit.picker}
								selectedValue={ hour }
								onValueChange={ hour => this.setState({ hour }) }>
									{ this.hours.map(x => <Picker.Item key={x} label={x} value={x} />) }
							</Picker>

							<Text style={edit.colon}>:</Text>

							<Picker 
								style={edit.picker}
								selectedValue={ minute }
								onValueChange={ minute => this.setState({ minute }) }>
									{ this.minutes.map(x => <Picker.Item key={x} label={x} value={x} />) }
							</Picker>

							<Picker 
								style={edit.picker}
								selectedValue={ ampm }
								onValueChange={ ampm => this.setState({ ampm }) }>
									{ this.ampm.map(x => <Picker.Item key={x} label={x} value={x} />) }
							</Picker>

						</View>

					</View>

			</Modal>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
		_alarm: state._alarm,
	}
}

export default connect(mapStateToProps)(EditAlarmTime);