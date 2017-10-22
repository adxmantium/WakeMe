// /screens/collection/index

// /screens/camera/index.js

import { connect } from 'react-redux'
import React, { Component } from 'react'
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
import { menu, darkTheme, darkThemeObj } from './../../styles/alarm'

// constants
const theme = darkTheme;
const themeObj = darkThemeObj;
const SIZE = 20;
const COLOR = themeObj.menuIcon;
const ALERT_TITLE = "It's not time!"
const ALERT_MSG = "You cannot view these wake up calls until your alarm goes off. It'll give you something to look forward to when you wake up :)"
const ALERT_ACTIONS = [{
	text: "Ok, I can wait. I think..."
}]

const tmp = [
	{name: 'Michelle Clay'},
	{name: 'Michelle Clay'},
	{name: 'Michelle Clay'},
	{name: 'Michelle Clay'},
	{name: 'Michelle Clay'},
	{name: 'Michelle Clay'},
	{name: 'Michelle Clay'},
	{name: 'Michelle Clay'},
	{name: 'Michelle Clay'},
	{name: 'Michelle Clay'},
	{name: 'Michelle Clay'},
	{name: 'Michelle Clay'},
	{name: 'Michelle Clay'},
]

class Collection extends Component{
	constructor(props){
		super(props);

		this.state = {}
	}

	render(){
		const { navigation } = this.props;

		return (
			<View style={coll.container}>

				<NavHeader
					title="Wake Up Calls"
					leftIcon="chevron-left"
					leftPress={ () => navigation.goBack(null) } />

				<FlatList
		            data={ tmp || [] }
		            style={[coll.list, theme.bg]}
		            initialNumToRender={ 10 }
		            removeClippedSubviews={false}
		            keyExtractor={ (item, index) => index }
		            ItemSeparatorComponent={ () => <View style={coll.separator} /> }
		            renderItem={ ({ item }) => <CollectionItem {...item} /> }
		        />

			</View>
		);
	}
}

const CollectionItem = ({ name }) => (
	<TouchableOpacity style={coll.item} onPress={ () => Alert.alert(ALERT_TITLE, ALERT_MSG, ALERT_ACTIONS) }>
		<Icon name="camera" size={20} color="#000" />
		<Text style={[coll.name, theme.color]}>{ name }</Text>
	</TouchableOpacity>
)

const mapStateToProps = (state, props) => {
	return {
		_alarm: state._alarm,
	}
}

export default connect(mapStateToProps)(Collection);
