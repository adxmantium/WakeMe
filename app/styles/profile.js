// /styles/entry.js

import { StyleSheet } from 'react-native'

// import global styles
import * as _g from './_global'

export const pro = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: _g.darkTheme.shade5,
		..._g._border(1, 'red'),
	},
});