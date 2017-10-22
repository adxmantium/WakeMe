// /screens/profile/searchFriends.js

// libs
import { Spinner } from 'native-base'
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

// components
import SearchedFriendItem from './searchedFriendItem'

// actions
import { searchForFriends, addFriend } from './../../actions/user'

// styles
import { findf } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

// constants
import { buildAddFriendData } from './../../constants/user'

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
		const { dispatch } = this.props;
		dispatch( searchForFriends( searched ) );
	}

	_addFriend = friend => {
		console.log('add friend: ', friend);

		const { dispatch, _user } = this.props;
		const addFriendData = buildAddFriendData({ _user, friend });

		dispatch( addFriend( addFriendData ) );
	}

	render(){
		const { navigation, _friends } = this.props;
		const { searched, focused } = this.state;
		const { searchResults } = _friends;

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

				{ _friends.searching_friends && 
					<View style={findf.spinnerWrapper}>
			        	<Spinner color={darkTheme.shade3} />
			        </View>
			    }

				<FlatList
		            data={ searchResults || [] }
		            style={findf.searchResults}
		            initialNumToRender={ 10 }
		            removeClippedSubviews={false}
		            keyExtractor={ (item, index) => item.fb_user_id }
		            ItemSeparatorComponent={ () => <View style={findf.separator} /> }
		            renderItem={ ({ item }) => <SearchedFriendItem {...item} onPress={ this._addFriend } /> }
		        /> 

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_user: state._user,
		_friends: state._friends,
	}
}

export default connect(mapStateToProps)(SearchFriends);