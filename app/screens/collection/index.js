// /screens/collection/index

import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native'

// components
import NavHeader from './../../components/navHeader'

// styles
import { coll } from './../../styles/collection'
import { darkTheme, darkThemeObj } from './../../styles/alarm'

// actions
import { getWakers } from './../../actions/waker'

// constants
import { MIMETYPES } from './../../constants/waker'
import { resetStackAndNavTo } from './../../constants/user'

const theme = darkTheme;
const themeObj = darkThemeObj;
const SIZE = 20;
const COLOR = themeObj.menuIcon;
const ALERT_TITLE = "It's not time!"
const ALERT_MSG = "You cannot view these wake up calls until your alarm goes off. It'll give you something to look forward to when you wake up :)"
const ALERT_ACTIONS = [{
	text: "Ok, I can wait. I think..."
}]

class Collection extends PureComponent{
	constructor(props){
		super(props);

		this.state = {}
	}

	componentDidMount(){
		const { dispatch, _user } = this.props;
		dispatch( getWakers(_user.id) ); // fetch wakers when component mounts
	}

	_navAway = () => this.props.navigation.dispatch( resetStackAndNavTo(['Alarm', 'Profile']) );

	render(){
		const { navigation, _waker, _user } = this.props;

		return (
			<View style={coll.container}>

				<NavHeader
					title="Wake Up Calls"
					leftIcon="chevron-left"
					leftPress={ () => navigation.goBack(null) } />

				{ (!_waker.queue || !_waker.queue.length) && 
					<View style={coll.noWakeup}>
						<Text style={coll.noWake}>You currently have 0 Wake Up Calls</Text> 
						<TouchableOpacity style={coll.navAwayBtn} onPress={ this._navAway }>
							<Text style={coll.navAwayText}>Invite your friends</Text> 
						</TouchableOpacity>
						<Text style={coll.noWake}>to the app!</Text> 
					</View>
				}

				<FlatList
		            data={ _waker.queue || [] }
		            style={[coll.list, theme.bg]}
		            initialNumToRender={ 10 }
		            removeClippedSubviews={false}
		            keyExtractor={ (item, index) => item.waker_id || index }
		            ItemSeparatorComponent={ () => <View style={coll.separator} /> }
		            renderItem={ ({ item }) => <CollectionItem {...item} isMe={ _user.id === item.from_fb_user_id } /> }
		        />

			</View>
		);
	}
}

const CollectionItem = ({ from_name, file_path, isMe }) => {
	const ext = file_path.split('__')[1].split('.')[1];
	const icon = MIMETYPES[ext].includes('video') ? 'video-camera' : 'camera';

	return (
		<TouchableOpacity style={coll.item} onPress={ () => Alert.alert(ALERT_TITLE, ALERT_MSG, ALERT_ACTIONS) }>
			<Icon name={icon} size={20} color={themeObj.menuIcon} />
			<Text style={[coll.name, theme.color]}>{ isMe ? 'Myself' : from_name }</Text>
		</TouchableOpacity>
	)
}

const mapStateToProps = (state, props) => ({
	_user: state._user,
	_alarm: state._alarm,
	_waker: state._waker,
})

export default connect(mapStateToProps)(Collection);
