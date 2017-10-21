// /screens/profile/searchFriends.js

// libs
import { connect } from 'react-redux'
import React, { Component } from 'react'
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

class SearchFriends extends Component{
	constructor(props){
		super(props);
	}

	render(){
		const { navigation } = this.props;

		return (
			<View style={findf.container}>

				<View>
					<Text>Search friends name here</Text>
					<View></View>
				</View>

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
	}
}

export default connect(mapStateToProps)(SearchFriends);