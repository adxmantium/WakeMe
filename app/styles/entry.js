// /styles/entry.js

import { StyleSheet } from 'react-native'

// import global styles
import * as _g from './_global'

export const entry = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		..._g._border(1, 'red'),
	},
	login: {
		backgroundColor: _g.fbBlue,
		..._g._padding(15, 40, 15, 40),
		..._g._borderRadius(5),
		flexDirection: 'row',
		alignItems: 'center',
	},
	loginText: {
		color: _g.white,
		textAlign: 'center',
		fontSize: 22,
		marginLeft: 10,
	},
	title: {
		backgroundColor: 'transparent',
		color: _g.darkTheme.shade3,
		fontSize: 40,
	},
	directions: {
		fontSize: 20,
		backgroundColor: 'transparent',
		color: _g.darkTheme.shade3,
		width: 300,
	},
	loader: {
		// ..._g._border(1, 'red'),
		height: 30,
		marginLeft: 10,
	}
});