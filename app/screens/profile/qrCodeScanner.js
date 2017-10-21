// /screens/profile/qrCodeScanner.js

// libs
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Camera from 'react-native-camera'
import {
	View,
	Text,
	Image,
	FlatList,
	TouchableOpacity,
} from 'react-native'

// styles
import { findf } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

// constants
const _cam = {
	ASPECT: Camera.constants.Aspect.fill,
	CAPTURE_MODE: Camera.constants.CaptureMode.video,
	CAPTURE_TARGET: Camera.constants.CaptureTarget.disk,
	CAPTURE_QUALITY: Camera.constants.CaptureQuality.high,
	type: 'back',
}

class QRCodeScanner extends Component{
	constructor(props){
		super(props);
	}

	_qrCaptured = (data) => {
		console.log('qr data: ', data);
	}

	render(){
		const { navigation } = this.props;

		return (
			<View style={findf.container}>

				<Camera
					ref={ cam => { this._camera = cam; } }
					style={findf.qrScanner}
					aspect={ _cam.ASPECT }
					type={ _cam.type }
					keepAwake={true}
					flashMode={Camera.constants.FlashMode.off}
					onFocusChanged={() => {}}
					onZoomChanged={() => {}}
					defaultTouchToFocus
					mirrorImage={false}
					onBarCodeRead={ this._qrCapture }
					barCodeTypes={['qr']}
					captureMode={ _cam.CAPTURE_MODE }
					captureTarget={ _cam.CAPTURE_TARGET }
					captureQuality={ _cam.CAPTURE_QUALITY }>

						<View style={findf.qrMsg}>
							<Text>Scanning for QR Code...</Text>
						</View>

				</Camera>

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
	}
}

export default connect(mapStateToProps)(QRCodeScanner);