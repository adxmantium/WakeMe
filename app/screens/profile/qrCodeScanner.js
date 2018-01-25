// /screens/profile/qrCodeScanner.js

// libs
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Camera from 'react-native-camera'
import Permissions from 'react-native-permissions'
import * as Animatable from 'react-native-animatable'
import {
	View,
	Text,
	Image,
	Platform,
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
			qrFriend: {},
			captured: false,
			addPending: false,
			addedFriend: false,
			alreadyFriends: false,
			havePermission: false,
		}
	}

	componentDidMount(){
		// react-native-camera not asking for permission on android for some reason
		if( Platform.OS === 'android' ) this._checkPermissions();
	}

	componentWillReceiveProps(np, ns){
		const pending = this.props._friends[ACCEPTING_FRIENDSHIP.toLowerCase()];
		const next_pending = np._friends[ACCEPTING_FRIENDSHIP.toLowerCase()];

		// change state of addedFriend only when this pending is true and next pending is false, meaning the request has returned
		if( pending !== next_pending && pending && !next_pending ){
			this.setState({
				addedFriend: true, 
				addPending: false,
				alreadyFriends: false,
			});
		}
	}

	_checkPermissions = async () => {
		const permissionNeeded = 'camera';
		const statusNeeded = 'authorized';

		// check camera permission
		const permissionStatus = await Permissions.check(permissionNeeded);

		// if not authorized, request it
		if( permissionStatus !== statusNeeded ){
			const requestResponse = await Permissions.request(permissionNeeded);
			this.setState({havePermission: requestResponse === statusNeeded});
		}
	}

	_qrCaptured = ({ bounds, data, type }) => {
		if( type === 'org.iso.QRCode' ){
			const qrFriend = JSON.parse(data);

			this.setState({ captured: true, qrFriend });
			this._addFriend( qrFriend );
		}
	}

	_addFriend = friend => {
		const { dispatch, _user, _friends } = this.props;

		// check if this person is already a friend
		const friend_found = _friends.friends_list.slice().find(fr => fr.id.includes(friend.fb_user_id));

		if( !friend_found ){
			// if here, this person is not your friend yet
			const addFriendData = modelFriendsTable({ _user, friend });
			dispatch( acceptFriendship( {...addFriendData, friend_request_accepted: true} ) );

		}else if( friend_found.friend_request_accepted ){
			// if here, this person is already your friend
			this.setState({captured: true, alreadyFriends: true});

		}else{
			// if here, friend found, but has not accepted friend request
			this.setState({addPending: true});
			dispatch( acceptFriendship( {...friend_found, friend_request_accepted: true} ) );
		}

	}

	_reset = () => {
		this.setState({
			qrFriend: {},
			captured: false, 
			addPending: false,
			addedFriend: false,
			alreadyFriends: false,
		});
	}

	render(){
		const { navigation } = this.props;
		const { captured, addedFriend, qrFriend, alreadyFriends, addPending, havePermission } = this.state;
		console.log('havePermission: ', havePermission);

		return (
			<View style={findf.qrContainer}>

				{ !!captured &&
					<View style={findf.qrFound}>
						{ (!addedFriend && !alreadyFriends) &&
							<Animatable.Text animation="fadeInRight" style={findf.qrAdding}>Adding 
								<Text style={findf.qrAddingName}> {qrFriend.name}</Text>
								...
							</Animatable.Text>
						}

						{ ((!addedFriend && alreadyFriends) || (addedFriend && !alreadyFriends)) && 
							<Animatable.View animation="fadeInRight">
								<Text style={findf.qrAddSuccess}>{ alreadyFriends ? 'Hey, Silly!' : 'Success!' }</Text>
								<Text style={[findf.qrAdding, findf.qrMarg]}>{ alreadyFriends ? 'You are already friends with' : 'You are now friends with' }</Text>
								<Text style={findf.qrAddingName}>{qrFriend.name}</Text>
							</Animatable.View>
						}

						{ !addPending && 
							<TouchableOpacity 
								style={findf.reset}
								onPress={ this._reset }>
									<Animatable.Text animation="fadeInRight" style={findf.resetText}>Scan another friend</Animatable.Text>
							</TouchableOpacity>
						}
					</View>
				}
				
				{ ((havePermission && Platform.OS === 'android') || (Platform.OS === 'ios')) &&
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