// /screens/camera/index.js

import { connect } from 'react-redux'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

// styles
import { cam } from './../../styles/camera'

class Camera extends Component{
	constructor(props){
		super(props);

		this.state = {}
	}

	render(){
		return (
			<View style={cam.container}>
				<Text>camera screen</Text>
			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_alarm: state._alarm,
	}
}

export default connect(mapStateToProps)(Camera);