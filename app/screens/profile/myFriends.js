// /screens/profile/myFriends.js

// libs
import { connect } from 'react-redux'
import { Spinner } from 'native-base'
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
import { sendWaker } from './../../actions/waker'

// components
import FriendItem from './friendItem'
import NavHeader from './../../components/navHeader'

// styles
import { myf } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

// constants
import { modelWakersTable } from './../../constants/waker'
import { resetStackAndNavTo } from './../../constants/user'
const ALERT_TITLE = "Success!"
const ALERT_MSG = "You have successfully sent your wake up call!"

class MyFriends extends Component{
	constructor(props){
		super(props);
		this.state = {
			sendTo_list: [...props._friends.accepted_friends_list],
			sendTo_list_count: 0,
		}
	}

	componentWillReceiveProps(np){
		const { sending_waker: this_sending } = this.props._waker;
		const { sending_waker: next_sending } = np._waker;

		if( this_sending !== next_sending && !next_sending ){
			const { navigation } = np;
			const ALERT_ACTIONS = [{
				text: "Sweet, thanks!",
				onPress: () => navigation.dispatch( resetStackAndNavTo(['Alarm']) )
			}];

			Alert.alert(ALERT_TITLE, ALERT_MSG, ALERT_ACTIONS);
		}
	}

	shouldComponentUpdate(np, ns){
		const { sendTo_list_count: this_count, sendTo_list: this_list } = this.state;
		const { sendTo_list_count: next_count, sendTo_list: next_list } = ns;

		// only update when a sendTo_list_count has changed
		return this_count !== next_count || this_list.length !== next_list;
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
		const { capturedFileBase64: file } = _camera;

		// get only the friends that have been selected to sendTo
		const friends = sendTo_list.filter(item => !!item.sendTo);

		let wakerData = null;

		// send waker to each friend
		friends.forEach(to_friend => {
			// get object that models the Waker table in db
			wakerData = modelWakersTable({ _user, to_friend, file });
			console.log('data: ', JSON.stringify(wakerData));
			dispatch( sendWaker( wakerData ) );
		})
	}

	render(){
		const { navigation, _waker } = this.props;
		const { sendTo_list, sendTo_list_count } = this.state;
		const title = navigation.state.params.title || 'My Friends';

		return (
			<View style={myf.container}>

				<NavHeader
					title={ title }
					leftIcon="chevron-left"
					rightIconComponent={
						sendTo_list_count && (
							_waker.sending_waker ?
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
		            renderItem={ ({ item }) => <FriendItem {...item} onPress={ this._addToSendList } /> }
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