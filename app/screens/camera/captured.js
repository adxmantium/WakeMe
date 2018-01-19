// /screens/camera/captured.js

import { connect } from 'react-redux'
import Video from 'react-native-video'
import React, { Component } from 'react'
import Fab from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  Image,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'

// actions
import { captured } from './../../actions/camera'

// styles
import { capt } from './../../styles/camera'

// constants
import { MIMETYPES } from './../../constants/waker'

class Captured extends Component{
	constructor(props){
		super(props);

		this.state = {
			mute: false,
			msgOpen: false,
			msgVal: '',
			msgSet: '',
		};
	}	

	// return true/false if capturedFile is vid or not
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

	// toggles video volume
	_mute = forceTo => this.setState({mute: typeof forceTo != 'undefined' ? forceTo : !this.state.mute});

	// saves message locally and shows message preview
	_setMessage = () => this.setState({msgOpen: false, msgSet: this.state.msgVal});

	// navs back to prev screen
	_onPressDiscard = () => this.props.navigation.goBack(null);

	// toggle/clears message field
	_onPressMessage = () => this.setState({msgOpen: !this.state.msgVal, msgSet: false, msgVal: ''});

	// toggles volume
	_onPressVolume = () => this._mute();

	// saves message to store and navs to next screen
	_onPressSend = () => {
		const { navigation, dispatch } = this.props;

		this._mute(true); // mute vid just before sending

		dispatch( captured({wakerMessage: this.state.msgVal}) );
		navigation.navigate('MyFriends', {title: 'Send to...'});
	}

	render(){
		const { navigation, _camera } = this.props;
		const { mute, msgOpen, msgVal, msgSet } = this.state;
		const { capturedFile } = _camera;
		const { uri, path } = capturedFile;
		const isVideo = this._isVideo();

		return (
			<View style={capt.container}>	

				<View style={capt.actions} />

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

				{ !!(msgVal && msgSet) && 
					<TouchableHighlight style={capt.msgSet} onPress={() => this.setState({msgOpen: true, msgSet: false})}>
						<Text style={capt.msgVal}>{ msgVal }</Text>
					</TouchableHighlight>
				}

				<View style={capt.actions}>
					{ msgOpen && 
						<View style={capt.msgInputContainer}>
							<TextInput 
								style={capt.msgInput}
								autoCorrect={true}
								autoFocus={true}
								maxLength={100}
								clearButtonMode="while-editing"
								returnKeyType="done"
								placeholder="Enter waker message here..."
								placeholderTextColor="rgba(0,0,0,0.3)"
								onChangeText={ val => this.setState({msgVal: val}) }
								onSubmitEditing={ this._setMessage }
								value={ msgVal } />
						</View>
					}
				</View>

				<View style={{flex:1}}>
					<Fab 
						offsetX={10}
						offsetY={10}
						spacing={15}
						btnOutRange="rgba(46, 156, 202, 0.5)"
						buttonColor="rgba(46, 156, 202,1)">

							<Fab.Item buttonColor='#AAABB8' title="Discard" onPress={ this._onPressDiscard }>
								<Icon name="trash" style={capt.fabBtn} />
							</Fab.Item>

							<Fab.Item buttonColor={msgVal ? '#29648A' : '#AAABB8'} title={`${msgVal ? 'Remove' : 'Add'} Message`} onPress={ this._onPressMessage }>
								<Icon name="commenting" style={capt.fabBtn} />
							</Fab.Item>

							<Fab.Item buttonColor='#AAABB8' title={mute ? 'Off' : 'On'} onPress={ this._onPressVolume }>
								<Icon name={mute ? 'volume-off' : 'volume-up'} style={capt.fabBtn} />
							</Fab.Item>

							<Fab.Item buttonColor='#AAABB8' title="Send" onPress={ this._onPressSend }>
								<Icon name="paper-plane" style={capt.fabBtn} />
							</Fab.Item>

					</Fab>
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