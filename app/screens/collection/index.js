// /screens/collection/index

// /screens/camera/index.js

import { connect } from 'react-redux'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'

// styles
import { coll } from './../../styles/collection'
import { menu, darkTheme, darkThemeObj } from './../../styles/alarm'

// constants
const theme = darkTheme;
const themeObj = darkThemeObj;
const SIZE = 20;
const COLOR = themeObj.menuIcon;

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

				<View style={[coll.header, theme.bg]}>
					<TouchableOpacity onPress={ () => navigation.goBack(null) }>
						<Icon name="chevron-left" size={20} color={COLOR} />
					</TouchableOpacity>

					<Text style={[coll.title, theme.color]}>My Collection (10)</Text>

					<Icon name="chevron-left" size={20} color="transparent" />
				</View>

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
	<View style={coll.item}>
		<Icon name="camera" size={20} color="#000" />
		<Text style={[coll.name, theme.color]}>{ name }</Text>
	</View>
)

const mapStateToProps = (state, props) => {
	return {
		_alarm: state._alarm,
	}
}

export default connect(mapStateToProps)(Collection);
