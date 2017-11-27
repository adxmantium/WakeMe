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

// action
import { acceptFriendship } from './../../actions/friends'

// constants
import { modelFriendsTable, ACCEPTING_FRIENDSHIP } from './../../constants/user'

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

		this.state = {
			captured: false,
			addedFriend: false,
			qrFriend: {}
		}
	}

	componentWillReceiveProps(np, ns){
		const pending = this.props._friends[ACCEPTING_FRIENDSHIP.toLowerCase()];
		const next_pending = np._friends[ACCEPTING_FRIENDSHIP.toLowerCase()];

		console.log('this: ', pending);
		console.log('next: ', next_pending);
		// change state of addedFriend only when this pending is true and next pending is false, meaning the request has returned
		if( pending !== next_pending && pending && !next_pending ){
			this.setState({addedFriend: true});
		}
	}

	_qrCaptured = ({ bounds, data, type }) => {
		console.log('qr data: ', data);

		if( type === 'org.iso.QRCode' ){
			this.setState({captured: true});
			this._addFriend( JSON.parse(data) );
		}
	}

	_addFriend = friend => {
		const { dispatch, _user } = this.props;

		// build data to model Users table in DB
		const addFriendData = modelFriendsTable({ _user, friend });
		console.log('qr add: ', {...addFriendData, friend_request_accepted: true});

		// dispatch( acceptFriendship( {...addFriendData, friend_request_accepted: true} ) );
	}

	render(){
		const { navigation } = this.props;
		const { captured, addedFriend, qrFriend } = this.state;

		return (
			<View style={findf.qrContainer}>

				{ !captured ? 
					<View style={findf.qrFound}>
						{ !addedFriend ? 
							<Text style={findf.qrAdding}>Adding 
								<Text style={findf.qrAddingName}>{qrFriend.name}</Text>
								...
							</Text>
							:
							<View>
								<Text style={findf.qrAddSuccess}>Success!</Text>
								<Text style={[findf.qrAdding, findf.qrMarg]}>You are now friends with</Text>
								<Text style={findf.qrAddingName}>{qrFriend.name}</Text>
							</View>
						}
					</View>
					:
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
						onBarCodeRead={ this._qrCaptured }
						captureMode={ _cam.CAPTURE_MODE }
						captureTarget={ _cam.CAPTURE_TARGET }
						captureQuality={ _cam.CAPTURE_QUALITY }>

							<Text style={findf.qrFiller} />

							<View style={findf.qrMsg}>
								<Text style={findf.qrMsgText}>Scanning for QR Code...</Text>
							</View>

					</Camera>
				}

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
		_friends: state._friends,
	}
}

export default connect(mapStateToProps)(QRCodeScanner);