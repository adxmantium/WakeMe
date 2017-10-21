// /screens/profile/searchFriends.js

// libs
import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable'
import {
	View,
	Text,
	Image,
	FlatList,
	TextInput,
	TouchableOpacity,
} from 'react-native'

// styles
import { findf } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

class SearchFriends extends Component{
	constructor(props){
		super(props);
		this.state = {
			searched: '',
			focused: false,
		}
	}

	_search = () => {
		const { searched } = this.state;
		console.log('search for: ', searched);
	}

	render(){
		const { navigation } = this.props;
		const { searched, focused } = this.state;

		return (
			<View style={findf.searchContainer}>

				<View style={findf.searchWrapper}>
					<TextInput
						style={findf.searchInput}
						value={ searched || '' }
						placeholderTextColor="rgba(170, 171, 184, 0.2)"
						placeholder="Search for a friends name..."
						returnKeyType="search"
						clearButtonMode="always"
						keyboardAppearance="dark"
						onFocus={ () => this.setState({focused: true}) }
						onBlur={ () => this.setState({focused: false}) }
						onSubmitEditing={ this._search }
						onChangeText={ text => this.setState({searched: text}) } />

					{ focused && <Animatable.View animation="fadeInRight" style={findf.searchBorder} /> }
				</View>

				<FlatList
		            data={ [] }
		            initialNumToRender={ 10 }
		            removeClippedSubviews={false}
		            keyExtractor={ (item, index) => item.thread_id }
		            ItemSeparatorComponent={ () => <View style={findf.separator} /> }
		            renderItem={ ({ item }) => <View><Text>row 1</Text></View> }
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

export default connect(mapStateToProps)(SearchFriends);