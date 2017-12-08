// /styles/entry.js

import { StyleSheet } from 'react-native'

// import global styles
import * as _g from './_global'

export const entry = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: _g.darkTheme.shade5,
		..._g._padding(100, 40, 100, 40),
	},
	login: {
		backgroundColor: _g.fbBlue,
		..._g._padding(10, 0, 10, 0),
		..._g._borderRadius(5),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	loginText: {
		color: _g.white,
		fontSize: 18,
		marginLeft: 10,
	},
	title: {
		backgroundColor: 'transparent',
		color: _g.white,
		fontSize: 40,
	},
	directions: {
		fontSize: 16,
		marginTop: 20,
		backgroundColor: 'transparent',
		color: _g.darkTheme.shade3,
		textAlign: 'center',
	},
	loader: {
		height: 30,
		marginLeft: 10,
	},
	actions: {
		width: '100%'
	}
});

export const info = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.8)',
		padding: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerContainer: {
		padding: 25,
		borderRadius: 3,
		..._g._border(1, _g.darkTheme.shade3),
		backgroundColor: 'rgba(0,0,0,0.75)',
	},
	title: {
		fontSize: 25,
		color: _g.darkTheme.shade3,
	},
	body: {
		color: _g.darkTheme.shade3,
		marginTop: 20,
		fontSize: 18,
	},
	actions: {
		alignItems: 'flex-start',
	},
	action: {
		marginTop: 20,
	},
	ok: {
		..._g._border(1, _g.darkTheme.shade2),
		borderRadius: 3,
		..._g._padding(5, 10, 5, 10),
	},
	dontshow: {
		fontSize: 14,
		color: _g.darkTheme.shade1,
	},
	actionTxt: {
		color: _g.darkTheme.shade2,
		fontSize: 20,
	},
	close: {
		alignItems: 'flex-end',
	}
});