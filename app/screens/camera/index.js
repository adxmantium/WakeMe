// /screens/camera/index.js

import { connect } from 'react-redux'
import Camera from 'react-native-camera'
import React, { Component } from 'react'
import Fab from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicon from 'react-native-vector-icons/Ionicons'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

// components
import NavHeader from './../../components/navHeader'

// actions
import { captured } from './../../actions/camera'
import { add_to_queue } from './../../actions/waker'

// styles
import { cap } from './../../styles/camera'
import { menu, darkThemeObj } from './../../styles/alarm'

// constants
const themeObj = darkThemeObj;
const SIZE = 20
const COLOR = themeObj.menuColor;
const BG_COLOR = themeObj.menuIcon;

const _cam = {
	ASPECT: Camera.constants.Aspect.fill,
	CAPTURE_TARGET: Camera.constants.CaptureTarget.disk,
	CAPTURE_QUALITY: Camera.constants.CaptureQuality.high,
}

class WakeUpCamera extends Component{
	constructor(props){
		super(props);

		this.state = {
			type: 'front',
			capture: 'camera',
			isRecording: false,
			activeIcon: 'camera',
			inactiveIcon: 'video-camera',
			aspect: Camera.constants.Aspect.fill,
		};
	}

	_capture = () => {
		const { mode, capture, isRecording } = this.state;
		const metadata = { mode };

		// if is recording, stop recording
		if( isRecording ){
			this._camera.stopCapture();
			this.setState({isRecording: false});
			return;
		}

		// if capture mode is video, then start recording
		if( capture === 'video' ) this.setState({isRecording: true});

		const { dispatch, navigation, _waker } = this.props;

		// start capture of pic/vid
		this._camera
			.capture({ metadata })
		 	.then(capturedFile => {
		 		console.log('captured file: ', capturedFile);
		 		dispatch( captured({ capturedFile }) );
		 		dispatch( add_to_queue({queue: [..._waker.queue, capturedFile]}) );
		 		navigation.navigate('Captured');
		 	})
		 	.catch(err => console.error(err));
	}

	_toggleCapture = () => {
		let capture = 'camera',
			activeIcon = 'camera',
			inactiveIcon = 'video-camera',
			captureBtn = 'camera',
			mode = Camera.constants.CaptureMode.still;

		if( this.state.capture === 'camera' ){
			capture = 'video';
			activeIcon = 'video-camera';
			inactiveIcon = 'camera';
			captureBtn = 'play';
			mode = Camera.constants.CaptureMode.video;
		}

		this.setState({
			mode,
			capture,
			activeIcon,
			inactiveIcon,
		});
	}

	_toggleCamType = () => {
		let type = 'front';

		if( this.state.type === 'front' ) type = 'back';

		this.setState({ type });
	}

	render(){
		const { navigation } = this.props;
		const { capture, type, mode, activeIcon, inactiveIcon, isRecording } = this.state;
		const captureBtnIcon = capture === 'camera' ? capture : (isRecording ? 'stop' : 'play');

		return (
			<View style={cap.container}>

				<Camera
					ref={ cam => { this._camera = cam; } }
					aspect={ _cam.ASPECT }
					style={ cap.preview }
					type={ type }
					keepAwake={true}
					flashMode={Camera.constants.FlashMode.off}
					onFocusChanged={() => {}}
					onZoomChanged={() => {}}
					defaultTouchToFocus
					mirrorImage={false}
					captureMode={ mode }
					captureTarget={ _cam.CAPTURE_TARGET }
					captureQuality={ _cam.CAPTURE_QUALITY }>

						<NavHeader
							leftIcon="chevron-left"
							rightIconComponent={<Ionicon name="ios-reverse-camera-outline" size={35} color="#fff" style={cap.headIcon} />}
							leftPress={ () => navigation.goBack(null) }
							rightPress={ this._toggleCamType } />

						<TouchableOpacity 
							onPress={ this._capture }
							style={cap.captureBtn}>
								<Icon name={captureBtnIcon} size={30} color="#000" />	
						</TouchableOpacity>

						<Fab 
							buttonColor="#fff"
							position="right"
							offsetX={20}
							offsetY={20}
							icon={ <Icon name={activeIcon} size={SIZE} color={COLOR} /> }>

								<Fab.Item 
									buttonColor={BG_COLOR}
									onPress={ this._toggleCapture }>
										<Icon name={inactiveIcon} size={SIZE} color={COLOR} />
								</Fab.Item>

						</Fab>

				</Camera>

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_alarm: state._alarm,
		_waker: state._waker,
	}
}

export default connect(mapStateToProps)(WakeUpCamera);