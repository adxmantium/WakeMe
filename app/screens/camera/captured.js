// /screens/camera/captured.js

import { connect } from 'react-redux'
import Video from 'react-native-video'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native'

// actions
import { saveWakeupCall } from './../../actions/camera'

// styles
import { capt } from './../../styles/camera'

// constants
import { MIMETYPES } from './../../constants/waker'

class Captured extends Component{
	constructor(props){
		super(props);

		this.state = {};
	}

	_send = () => {
		const { navigation, dispatch } = this.props;
		dispatch( saveWakeupCall() );
	}

	_isVideo = () => {
		const { capturedFile } = this.props._camera;
		let isVideo = false;

		if( Platform.OS === 'android' ){
			const ext = capturedFile.path.split('.')[1];
			const mime = MIMETYPES[ext];
			isVideo = mime.includes('video'); // is video if mimetype contains video
		}else{
			isVideo = !!capturedFile.duration;
		}

		return isVideo;
	}

	render(){
		const { navigation, _camera } = this.props;
		const { capturedFile } = _camera;

		return (
			<View style={capt.container}>

				{ this._isVideo() ? 
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
						<TouchableOpacity onPress={ () => navigation.navigate('MyFriends', {title: 'Send to...'}) } style={[capt.btn, capt.send]}>
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