// /screens/camera/captured.js

import { connect } from 'react-redux'
import Video from 'react-native-video'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'

// styles
import { capt } from './../../styles/camera'

class Captured extends Component{
	constructor(props){
		super(props);

		this.state = {};
	}

	_onProgress = (x, y) => {
		console.log(x, y);
	}

	render(){
		const { navigation, _camera } = this.props;
		const { capturedFile } = _camera;

		return (
			<View style={capt.container}>

				{ capturedFile.duration ? 
					<Video
						ref={ p => { this._player = p; } }
						source={{uri: capturedFile.path}}
						resizeMode="cover"
						repeat={true}
				    	playInBackground={false}
				    	playWhenInactive={false}
				    	onProgress={ this._onProgress }
				    	style={capt.player} /> 
					: 
					<Image source={{uri: capturedFile.path}} style={capt.file} /> 
				}	

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