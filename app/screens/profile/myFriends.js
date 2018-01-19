// /screens/profile/myFriends.js

// libs
import { connect } from 'react-redux'
import { Spinner } from 'native-base'
import { RNS3 } from 'react-native-aws3'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
	View,
	Text,
	Alert,
	Image,
	FlatList,
	TouchableOpacity,
} from 'react-native'

// actions
import { sendWaker, updateWaker } from './../../actions/waker'

// components
import FriendItem from './friendItem'
import NavHeader from './../../components/navHeader'

// styles
import { myf } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

// constants
import { resetStackAndNavTo } from './../../constants/user'
import { 
	MIMETYPES,
	S3_OPTIONS, 
	buildFileName,
	modelWakersTable, 
} from './../../constants/waker'

const ALERT_TITLE = "Success!"
const ALERT_MSG = "You have successfully sent your wake up call!"

class MyFriends extends Component{
	constructor(props){
		super(props);
		this.state = {
			sendTo_list: [...props._friends.accepted_list],
			sendTo_list_count: 0,
			saving_waker: false,
		}
	}

	componentWillReceiveProps(np){
		const { last_waker_to_save: this_last } = this.props._waker;
		const { last_waker_to_save: next_last } = np._waker;

		if( next_last ){
			 // turn off spinner when last friend's waker has finished POSTing
			this.setState({saving_waker: false});

			const { navigation } = np;
			const ALERT_ACTIONS = [{
				text: "Sweet, thanks!",
				onPress: () => navigation.dispatch( resetStackAndNavTo(['Alarm']) )
			}];

			Alert.alert(ALERT_TITLE, ALERT_MSG, ALERT_ACTIONS);
		}
	}

	shouldComponentUpdate(np, ns){
		const { sendTo_list_count: this_count, sendTo_list: this_list, saving_waker: this_saving } = this.state;
		const { sendTo_list_count: next_count, sendTo_list: next_list, saving_waker: next_saving } = ns;

		// only update when
		return this_count !== next_count || // sendTo_list_count has changed
			   this_list.length !== next_list.length || // list length changes (GET just finishes returning)
			   this_saving !== next_saving; // saving prop changes
	}

	componentWillUnmount(){
		this.props.dispatch( updateWaker({last_waker_to_save: false}) );
	}

	_addToSendList = friend => {
		const { sendTo_list: oldList } = this.state;

		// update this friends sendTo prop in sendTo_list
		const sendTo_list = oldList.map(item => 
			item.friend_fb_user_id == friend.friend_fb_user_id ? {...item, sendTo: !item.sendTo} : item);

		// get count of !!sendTo friends in list
		const sendTo_list_count = sendTo_list.filter(item => item.sendTo).length;

		this.setState({ sendTo_list, sendTo_list_count });
	}

	_send = () => {
		const { sendTo_list } = this.state;
		const { dispatch, _user, _friends, _camera } = this.props;
		const { capturedFile, wakerMessage } = _camera;	

		// get only the friends that have been selected to sendTo
		const friends = sendTo_list.filter(item => !!item.sendTo);
		let wakerData = null;	

		// required props for s3 file
		let file = null;
		let file_name = '';
		let file_path = '';
		let last_waker_to_save = false;
		let friends_id = '';
		const pathname = capturedFile.path || capturedFile.uri;
		const ext = pathname.split('.')[1].toLowerCase(); // get file extension
		const mime = MIMETYPES[ext]; // get mime type
		const s3File = {
			name: '',
			type: mime,
			uri: capturedFile.uri || capturedFile.path,
		};

		// send waker to each friend
		friends.forEach((to_friend, i) => {	
			// if item is a friend request initiated by me, then use friend_name, else it was initiated by friend, so use name
			friends_id = _user.id === to_friend.fb_user_id ? 'friend_fb_user_id' : 'fb_user_id';

			// build file name - will be used as the waker id
			file_name = buildFileName({ _user, to_friend, friends_id });

			// build s3 file obj to be saved to s3 bucket
			file = {...s3File, name: `${file_name}.${ext}`};

			this.setState({saving_waker: true});

			RNS3.put(file, S3_OPTIONS)
				// .progress(e => console.log(e.loaded / e.total))
				.then(res => {
					file_path = res.body.postResponse.location;

					// get object that models the Waker table in db
					wakerData = modelWakersTable({ _user, to_friend, file_name, file_path, message: wakerMessage });

					// pass a trigger prop to store indicating this friend is the last in arr
					// will use to stop spinner when this friend's POST is done
					if( (i+1) === friends.length ) last_waker_to_save = true;

					dispatch( sendWaker({ wakerData, last_waker_to_save }) );
				})
				.catch(err => {console.log('s3 err: ', err);});
		})	
	}

	render(){
		const { navigation, _user, _waker } = this.props;
		const title = navigation.state.params.title || 'My Friends';
		const { sendTo_list, sendTo_list_count, saving_waker } = this.state;

		return (
			<View style={myf.container}>

				<NavHeader
					title={ title }
					leftIcon="chevron-left"
					rightIconComponent={
						sendTo_list_count && (
							saving_waker ?
							<Spinner color={darkTheme.shade3} style={myf.spinner} />
							:
							<View style={myf.send}>
								<Icon name="paper-plane" size={18} color={darkTheme.shade2} />
								<Text style={myf.count}>({ sendTo_list_count || 0 })</Text>
							</View> )
					}
					rightPress={ this._send }
					leftPress={ () => navigation.goBack(null) } />

				<FlatList
		            data={ sendTo_list || [] }
		            style={ myf.list }
		            initialNumToRender={ 10 }
		            removeClippedSubviews={false}
		            keyExtractor={ (item, index) => item.fb_user_id }
		            ItemSeparatorComponent={ () => <View style={myf.separator} /> }
		            renderItem={ ({ item }) => <FriendItem {...item} onPress={ this._addToSendList } my={_user} /> }
		        />

			</View>
		);
	}
}

const mapStateToProps = (state, props) => ({
	_user: state._user,
	_waker: state._waker,
	_camera: state._camera,
	_friends: state._friends,
})

export default connect(mapStateToProps)(MyFriends);