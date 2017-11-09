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
import { allf } from './../../styles/profile'
import { darkTheme } from './../../styles/_global'

export default ({ onPress, friend_name, ...item }) => {

	return (

		<View style={allf.item}>
			<Text style={allf.itemName}>{ friend_name }</Text>

			{ onPress && 
				<TouchableOpacity style={allf.acceptBtn}>
					<Icon name="plus" size={20} color={darkTheme.shade3} />			
				</TouchableOpacity> 
			}
		</View>
		
	);	

}