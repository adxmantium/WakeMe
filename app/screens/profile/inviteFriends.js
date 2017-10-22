// /screens/profile/inviteFriends.js

// libs
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Communications from 'react-native-communications'
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
					<TouchableOpacity 
						style={{borderWidth: 1, borderColor: 'red'}} 
						onPress={ () => Communications.text('19252164606', 'Hello from WakeMe?') }>
							<Text>Text Me</Text>
					</TouchableOpacity>
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