// /screens/collection/index

// /screens/camera/index.js

import { connect } from 'react-redux'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

// styles
import { coll } from './../../styles/collection'

class Collection extends Component{
	constructor(props){
		super(props);

		this.state = {}
	}

	render(){
		return (
			<View style={coll.container}>
				<Text>Collection screen</Text>
			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_alarm: state._alarm,
	}
}

export default connect(mapStateToProps)(Collection);
