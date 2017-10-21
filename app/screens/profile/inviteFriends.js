// /screens/profile/inviteFriends.js

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

class InviteFriends extends Component{
	constructor(props){
		super(props);
	}

	render(){
		const { navigation } = this.props;

		return (
			<View style={findf.container}>

				<View>
					<Text>Open contacts here</Text>
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

export default connect(mapStateToProps)(InviteFriends);