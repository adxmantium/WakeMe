// /components/editModalActionBar.js

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

// styles
import { edit } from './../styles/alarm'

export default ({ close, save }) => (

	<View style={edit.actions}>

		<TouchableOpacity
			style={edit.btn}
			onPress={ close }>
				<Text style={[edit.btnText, edit.btnCancel]}>Cancel</Text>
		</TouchableOpacity>

		<TouchableOpacity 
			style={edit.btn}
			onPress={ save }>
				<Text style={[edit.btnText, edit.btnSave]}>Save</Text>
		</TouchableOpacity>

	</View>

)