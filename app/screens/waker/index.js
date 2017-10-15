// /screens/waker/index.js

// /screens/camera/index.js

import { connect } from 'react-redux'
import Video from 'react-native-video'
import React, { Component } from 'react'
import Fab from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'

// styles
import { wake } from './../../styles/waker'

class Waker extends Component{
	constructor(props){
		super(props);

		this.state = {};
	}

	render(){
		const { navigation, _camera } = this.props;
		const { capturedFile } = _camera;

		return (
			<View style={wake.container}>
				<Text>Waker</Text>
			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_waker: state._waker,
	}
}

export default connect(mapStateToProps)(Waker);