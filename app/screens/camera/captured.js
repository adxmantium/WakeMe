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

		this.state = {
			mute: false,
		};
	}

	_send = () => {
		this._mute(true);
		this.props.navigation.navigate('MyFriends', {title: 'Send to...'});
	}

	_isVideo = () => {
		const { capturedFile } = this.props._camera;
		let isVideo = false;

		if( Platform.OS === 'android' ){
			const ext = capturedFile.path.split('.')[1];
			const mime = MIMETYPES[ext];
			isVideo = mime.includes('video'); // is video if mimetype contains video
		}else{
			isVideo = capturedFile.uri && capturedFile.fileName.toLowerCase().includes('mov');
		}

		return isVideo;
	}

	_mute = forceTo => {
		this.setState({mute: typeof forceTo != 'undefined' ? forceTo : !this.state.mute});
	}

	render(){
		const { navigation, _camera } = this.props;
		const { mute } = this.state;
		const { capturedFile } = _camera;
		const { uri, path } = capturedFile;
		const isVideo = this._isVideo();

		return (
			<View style={capt.container}>	

				{ isVideo ? 
					<Video
						ref={ p => { this._player = p; } }
						source={{uri: path || uri}}
						resizeMode="contain"
						repeat={true}
						volume={1.0}
						muted={mute}
				    	playInBackground={false}
				    	playWhenInactive={false}
				    	onProgress={ this._onProgress }
				    	style={capt.player} /> 
					: 
					<Image source={{uri: path || uri}} style={capt.file} /> 
				}	

				<View style={capt.actions}>
					<View style={capt.action}>
						<Text style={capt.label}>Discard</Text>
						<TouchableOpacity onPress={ () => navigation.goBack(null) } style={[capt.btn]}>
							<Icon name="times" size={30} color="#fff" />
						</TouchableOpacity>
					</View>

					{ isVideo && 
						<View style={capt.action}>
							<Text style={capt.label}>{mute ? 'Off' : 'On'}</Text>
							<TouchableOpacity 
								style={[capt.btn, capt.mute]}
								onPress={ () => this._mute() }>
									<Icon name={mute ? 'volume-off' : 'volume-up'} color="#fff" size={30} style={capt.muteIcon} />
							</TouchableOpacity> 
						</View>
					}

					<View style={capt.action}>
						<Text style={capt.label}>Send</Text>
						<TouchableOpacity onPress={ this._send } style={[capt.btn, capt.send]}>
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