// /styles/entry.js

import { StyleSheet } from 'react-native'

// import global styles
import * as _g from './_global'

export const pro = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		backgroundColor: _g.darkTheme.shade5,
		..._g._padding(100, 0, 0, 0),
	},
	main: {
		alignItems: 'center',
	},
	profilePic: {
		width: 50,
		height: 50,
		overflow: 'hidden',
		..._g._borderRadius(5),
	},
	pic: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	name: {
		color: _g.darkTheme.shade3,
		fontSize: 20,
		marginTop: 10,
	},
	label: {
		color: _g.darkTheme.shade3,
		textAlign: 'center',
		fontSize: 18,
		marginBottom: 5,
	},
	links: {
		// ..._g._border(1, 'white'),
	},
	link: {
		..._g._padding(10),
		backgroundColor: 'transparent',
		alignItems: 'center',
	},
	linkText: {
		color: _g.darkTheme.shade2,
		fontSize: 18,
		fontWeight: '400',
	},
	signoutWrapper: {
		// ..._g._border(1, 'red'),
	},
	signout: {
		backgroundColor: 'transparent',
		..._g._padding(10),
		alignItems: 'center',
		justifyContent: 'center',
	},
	signoutText: {
		color: _g.darkTheme.shade3,
	},
	qrCode: {
		alignItems: 'center',
		..._g._padding(0, 60, 0, 60),
	},
	qrText: {
		color: _g.darkTheme.shade3,
		textAlign: 'center',
		marginBottom: 10,
	}
});

export const findf = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		backgroundColor: _g.darkTheme.shade5,
		..._g._padding(100, 0, 0, 0),
	},
	tabbar: {
		backgroundColor: 'transparent',
		flex: 1,
	},
	tab: {
		backgroundColor: 'transparent',
	},
	tabIndicator: {
		backgroundColor: _g.darkTheme.shade2,
	},
	qrContainer: {
		flex: 1,
	},
	qrScanner: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	qrMsg: {
		backgroundColor: 'transparent',
	},
	qrMsgText: {
		color: _g.white,
	},
	searchContainer: {
		flex: 1,
		..._g._padding(20),
	},
	searchInput: {
		// ..._g._border(1, 'red'),
		..._g._padding(5, 10, 5, 10),
		color: _g.darkTheme.shade3,
	},
	searchBorder: {
		borderTopColor: _g.darkTheme.shade2,
		borderTopWidth: 1,
		height: 2,
	},
	separator: {
		..._g._border(1, _g.darkTheme.shade3),
	},
	spinnerWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
	}
});