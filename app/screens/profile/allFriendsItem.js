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

export default ({ onPress, name, ...item }) => {

	return (

		<View style={allf.item}>
			<Text style={allf.itemName}>{ name }</Text>

			{ onPress && 
				<TouchableOpacity style={allf.acceptBtn}>
					<Icon name="plus" size={20} color={darkTheme.shade3} />			
				</TouchableOpacity> 
			}
		</View>
		
	);	

}