// /screens/camera/index.js

import { connect } from 'react-redux'
import React, { Component } from 'react'
import Fab from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicon from 'react-native-vector-icons/Ionicons'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

// styles
import { capt } from './../../styles/camera'
import { menu, darkThemeObj } from './../../styles/alarm'

// constants
const themeObj = darkThemeObj;
const SIZE = 20
const COLOR = themeObj.menuColor;
const BG_COLOR = themeObj.menuIcon;

class Captured extends Component{
	constructor(props){
		super(props);

		this.state = {};
	}

	render(){
		const { navigation, _camera } = this.props;
		const { capturedFile } = _camera;

		return (
			<View style={capt.container}>

				<Image source={{uri: capturedFile.path}} style={capt.file} />

				<View style={capt.header}>
					<TouchableOpacity onPress={ () => navigation.goBack(null) }>
						<Icon name="times" size={20} color="#fff" />
					</TouchableOpacity>

					<Text>in captured</Text>
				</View>

				<View style={capt.actions}>
					<View style={capt.action}>
						<Text style={capt.label}>Discard</Text>
						<TouchableOpacity onPress={ () => navigation.goBack(null) } style={[capt.btn]}>
							<Icon name="times" size={30} color="#fff" />
						</TouchableOpacity>
					</View>

					<View style={capt.action}>
						<Text style={capt.label}>Send</Text>
						<TouchableOpacity onPress={ () => {} } style={[capt.btn, capt.send]}>
							<Icon name="check" size={30} color="#fff" />
						</TouchableOpacity>
					</View>
				</View>

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_camera: state._camera,
	}
}

export default connect(mapStateToProps)(Captured);