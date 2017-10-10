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
			activeIcon: 'camera',
			inactiveIcon: 'video-camera',
			aspect: Camera.constants.Aspect.fill,
		};
	}

	_takePicture = () => {
		const metadata = {};

		//options.location = ... 
		this._camera
			.capture({ metadata })
		 	.then((data) => console.log(data))
		 	.catch(err => console.error(err));
	}

	_toggleCapture = () => {
		let capture = 'camera',
			activeIcon = 'camera',
			inactiveIcon = 'video-camera',
			mode = Camera.constants.CaptureMode.still;

		if( this.state.capture === 'camera' ){
			capture = 'video';
			activeIcon = 'video-camera';
			inactiveIcon = 'camera';
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
		const { capture, type, mode, activeIcon, inactiveIcon } = this.state;

		return (
			<View style={cap.container}>

				<Camera
					ref={ cam => { this._camera = cam; } }
					aspect={ _cam.ASPECT }
					style={ cap.preview }
					type={ type }
					captureMode={ mode }
					captureTarget={ _cam.CAPTURE_TARGET }
					captureQuality={ _cam.CAPTURE_QUALITY }>

						<View style={cap.header}>
							<TouchableOpacity onPress={ () => navigation.goBack(null) }>
								<Icon name="times" size={25} color="#fff" style={[cap.headIcon, cap.close]} />
							</TouchableOpacity>

							<TouchableOpacity onPress={ this._toggleCamType }>
								<Ionicon name="ios-reverse-camera-outline" size={35} color="#fff" style={cap.headIcon} />
							</TouchableOpacity>
						</View>

						<Fab 
							buttonColor="#fff"
							position="center"
							offsetX={30}
							offsetY={30}
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
	}
}

export default connect(mapStateToProps)(WakeUpCamera);