// /screens/profile/allFriends.js

// libs
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view'
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'

// actions
import { getAllFriends } from './../../actions/friends'

// components
import PendingFriends from './pendingFriends'
import AcceptedFriends from './acceptedFriends'
import OutstandingFriends from './outstandingFriends'
import NavHeader from './../../components/navHeader'

// styles
import { findf } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

class FindFriends extends Component{
	constructor(props){
		super(props);
		this.state = {
			index: 0,
		    routes: [
		    	{ key: 'AcceptedFriends', icon: 'check' },
		    	{ key: 'PendingFriends', icon: 'minus' },
		    	{ key: 'OutstandingFriends', icon: 'plus' },
		    ],
		}
	}

	componentWillMount(){
		// fetch friends every time this is mounted
		const { dispatch, _user } = this.props;
		const { userID } = _user;
		const isFollowUp = true;

		dispatch( getAllFriends({ userID }) ); // fetches my pending friend requests
	}

	render(){
		const { navigation } = this.props;

		return (
			<View style={findf.container}>

				<NavHeader
					title="All Friends"
					leftIcon="chevron-left"
					leftPress={() => navigation.goBack(null)} />

				<TabViewAnimated
			        style={findf.tabbar}
			        navigationState={ this.state }
			        renderScene={ SceneMap({ AcceptedFriends, PendingFriends, OutstandingFriends }) }
			        renderHeader={ props => 
			        	<TabBar 
			        		{...props} 
			        		style={findf.tab}
			        		indicatorStyle={findf.tabIndicator}
			        		renderIcon={({ route }) => 
			        			<Icon name={route.icon} size={20} color="#fff" />
			        		} 
			        	/> 
			        }
			        onIndexChange={ index => this.setState({ index }) }
			    />

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
	}
}

export default connect(mapStateToProps)(FindFriends);