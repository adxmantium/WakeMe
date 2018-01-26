// /screens/profile/friendItem.js

// libs
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { 
	View, 
	Text, 
	TouchableOpacity 
} from 'react-native'

// styles
import { findf } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

export default ({ onPress, my, ...item }) => {

	const icon = item.sendTo ? 'check-square-o' : 'square-o';
	let name = item.name;

	// if item is a friend request initiated by me, then use friend_name, else it was initiated by friend, so use name
	if( my && my.id === item.fb_user_id ) name = item.friend_name;

	return (

		<TouchableOpacity style={findf.result} onPress={ () => onPress( item ) }>

			<Text style={findf.resultText}>{ name }</Text>
			<Icon name={icon} color={darkTheme.shade3} size={25} />

		</TouchableOpacity>
		
	);	

}