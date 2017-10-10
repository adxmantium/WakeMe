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

// components
import EditAlarmTimeModal from './../../components/editAlarmTimeModal'

// styles
import { edit } from './../../styles/alarm'

class SetAlarm extends Component{
	constructor(props){
		super(props);

		this.state = {
			editTime: false,
		}
	}

	render(){
		const { editTime } = this.state;

		return (
			<ScrollView style={edit.container}>

				<TouchableOpacity onPress={() => this.setState({editTime: true})}>
					<Text>12:00 - edit</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.setState({editTime: true})}>
					<Text>Repeat: Everyday</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.setState({editTime: true})}>
					<Text>Sound: Default</Text>
				</TouchableOpacity>

				{ editTime && 
					<EditAlarmTimeModal close={ () => this.setState({editTime: false}) } /> }

			</ScrollView>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
	}
}

export default connect(mapStateToProps)(SetAlarm);