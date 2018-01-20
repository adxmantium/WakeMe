// /screens/camera/index.js

import { connect } from 'react-redux'
import Camera from 'react-native-camera'
import React, { Component } from 'react'
import Fab from 'react-native-action-button'
import * as Progress from 'react-native-progress'
import Permissions from 'react-native-permissions'
import ImagePicker from 'react-native-image-picker'
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
import { wake } from './../../styles/waker'
import { darkTheme } from './../../styles/_global'
import { darkThemeObj } from './../../styles/alarm'

// constants
const themeObj = darkThemeObj;
const SIZE = 20
const COLOR = themeObj.menuColor;
const BG_COLOR = themeObj.menuIcon;
const MAX_RECORDING = 5000;
const PROGRESS_INTERVAL = 200;

const _cam = {
	ASPECT: Camera.constants.Aspect.fill,
	CAPTURE_TARGET: Camera.constants.CaptureTarget.disk,
	CAPTURE_QUALITY: Camera.constants.CaptureQuality.high,
}

const PICKER_OPTIONS = {
	title: 'Choose Image/Video from your Library',
	mediaType: 'mixed'
}

class WakeUpCamera extends Component{
	constructor(props){
		super(props);

		this.state = {
			progress: 0,
			type: 'front',
			capture: 'camera',
			isRecording: false,
			activeIcon: 'camera',
			inactiveIcon: 'video-camera',
		};
	}

	componentWillMount(){
		this._checkPermissions();
	}

	componentWillUnmount(){
		this._stopTimer();
	}

	_checkPermissions = () => {
		Permissions.check('microphone')
				   .then(perm => {
				   		// if microphone is not authorized, then request it
				   		// console.log('perm: ', perm);
					   	if( perm !== 'authorized' ){
					   		Permissions.request('microphone')
									   .then(res => {
									   		// console.log('res: ', res)
									   });
					   	}
				   });
	}

	_capture = () => {
		const { mode, capture, isRecording } = this.state;
		const metadata = { mode };

		// if is recording, stop recording
		if( isRecording ){
			this._camera.stopCapture();
			this._stopTimer();
			this.setState({isRecording: false});
			return;
		}

		// if capture mode is video, then start recording
		if( capture === 'video' ){
			this.setState({isRecording: true});
			this._startTimer();
		}

		const { dispatch, navigation, _waker } = this.props;

		// start capture of pic/vid
		this._camera
			.capture({ metadata })
		 	.then(this._imageCaptured)
		 	.catch(err => {});
	}

	_startTimer = () => {
		this._timer = setTimeout(() => {
			this._stopTimer(true);
		}, MAX_RECORDING);

		this._progress = setInterval(() => {
			this.setState({progress: this.state.progress + (PROGRESS_INTERVAL/MAX_RECORDING)});
		}, PROGRESS_INTERVAL);
	}

	_stopTimer = hitTimeLimit => {
		if( hitTimeLimit ) this._camera.stopCapture();

		clearTimeout( this._timer );
		clearInterval( this._progress );

		this.setState({
			progress: 0,
			isRecording: false,
		});
	}

	_toggleCapture = () => {
		let capture = 'camera',
			activeIcon = 'camera',
			inactiveIcon = 'video-camera';

		// if capture is camera, set everything to video, else it's video, so everything will be set for camera
		if( this.state.capture === 'camera' ){
			capture = 'video';
			activeIcon = 'video-camera';
			inactiveIcon = 'camera';
		}

		this.setState({
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

	_imageCaptured = capturedFile => {
		if( !capturedFile.didCancel ){
			const { navigation, dispatch } = this.props;
			dispatch( captured({ capturedFile }) );
			navigation.navigate('Captured');
		}	
	}

	render(){
		const { navigation } = this.props;
		const { capture, type, mode, activeIcon, inactiveIcon, isRecording, progress } = this.state;
		const captureBtnIcon = capture === 'camera' ? capture : (isRecording ? 'stop' : 'play');

		return (
			<View style={cap.container}>

				<Camera
					ref={ cam => { this._camera = cam; } }
					aspect={ _cam.ASPECT }
					style={ cap.preview }
					type={ type }
					audio={true}
					keepAwake={true}
					flashMode={Camera.constants.FlashMode.off}
					onFocusChanged={() => {}}
					onZoomChanged={() => {}}
					defaultTouchToFocus
					mirrorImage={false}
					captureMode={ capture === 'video' ? Camera.constants.CaptureMode.video : Camera.constants.CaptureMode.still }
					captureTarget={ _cam.CAPTURE_TARGET }
					captureQuality={ _cam.CAPTURE_QUALITY }>

						<NavHeader
							bg={{backgroundColor: 'rgba(0,0,0,0.4)'}}
							leftIcon="chevron-left"
							rightIconComponent={<Ionicon name="ios-reverse-camera-outline" size={35} color="#fff" style={cap.headIcon} />}
							leftIconComponent={<Icon name="chevron-left" size={20} color="#fff" />}
							leftPress={ () => navigation.goBack(null) }
							rightPress={ this._toggleCamType } />

						<TouchableOpacity
							style={cap.upload}
							onPress={() => ImagePicker.launchImageLibrary(PICKER_OPTIONS, this._imageCaptured)}>
							<Icon name="upload" size={25} color="#fff" style={cap.uploadIcon} />
						</TouchableOpacity>

						<TouchableOpacity 
							onPress={ this._capture }
							style={cap.captureBtn}>
								<Icon name={captureBtnIcon} size={30} color="#000" />	
						</TouchableOpacity>

						{/* will come back and fix in v2 */}
						{/*<Fab 
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

						</Fab>*/}

						{ capture === 'video' && 
							<View style={wake.progessWrapper}>
								<Progress.Bar 
									progress={ progress }
									width={null}
									color={ darkTheme.shade1 }
									borderWidth={0}
									borderRadius={0} />
							</View>
						}

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