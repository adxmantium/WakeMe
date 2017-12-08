// /screens/profile/findFriends.js

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

// components
import SearchFriends from './searchFriends'
import InviteFriends from './inviteFriends'
import QRCodeScanner from './qrCodeScanner'
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
		    	{ key: 'QRCodeScanner', icon: 'qrcode' },
		    	{ key: 'SearchFriends', icon: 'search' },
		    	// { key: 'InviteFriends', icon: 'address-book-o' },
		    ],
		}
	}

	render(){
		const { navigation } = this.props;

		return (
			<View style={findf.container}>

				<NavHeader
					title="Find Friends"
					leftIcon="chevron-left"
					leftPress={() => navigation.goBack(null)} />

				<TabViewAnimated
			        style={findf.tabbar}
			        navigationState={ this.state }
			        renderScene={ SceneMap({ SearchFriends, InviteFriends, QRCodeScanner }) }
			        renderHeader={ props => 
			        	<TabBar 
			        		{...props} 
			        		style={findf.tab}
			        		indicatorStyle={findf.tabIndicator}
			        		renderIcon={({route}) => 
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