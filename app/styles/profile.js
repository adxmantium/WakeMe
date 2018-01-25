// /styles/entry.js

import { StyleSheet, Platform } from 'react-native'

// import global styles
import * as _g from './_global'

export const pro = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		backgroundColor: _g.darkTheme.shade5,
		..._g._padding(80, 0, 0, 0),
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
		borderRadius: Platform.OS === 'android' ? 1 : 0,
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
	outReq: {
		fontWeight: '800',
	},
	signout: {
		backgroundColor: 'transparent',
		..._g._padding(20),
		alignItems: 'center',
		justifyContent: 'center',
	},
	signoutText: {
		color: _g.darkTheme.shade3,
	},
	qrCode: {
		alignItems: 'center',
	},
	qrText: {
		color: _g.darkTheme.shade3,
		textAlign: 'center',
		..._g._margin(0, 70, 10, 70),
	},
	qrBg: {
		backgroundColor: _g.darkTheme.shade3,
		padding: 10,
		borderRadius: 5,
	}
});

const paddTop = Platform.OS === 'android' ? 60 : 100;

export const findf = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		backgroundColor: _g.darkTheme.shade5,
		..._g._padding(paddTop, 0, 0, 0),
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
	},
	searchWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		..._g._padding(30, 50, 10, 50),
	},
	searchWrapperEmpty: {
		flex: 1,
	},
	searchInnerWrapper: {
		width: '100%',
	},
	searchInput: {
		padding: 10,
		borderRadius: 3,
		textAlign: 'center',
		color: _g.darkTheme.shade3,
		backgroundColor: '#292c56',
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
	},
	searchResults: {
		..._g._padding(10, 0, 0, 0),
	},
	result: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		..._g._padding(10, 20, 10, 20),
	},
	resultText: {
		color: _g.darkTheme.shade3,
		fontSize: 18,
	},
	resultAdd: {
		height: 45,
		width: 40,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	qrFound: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	qrAdding: {
		color: _g.darkTheme.shade3,
		fontSize: 18,
		textAlign: 'center',
	},
	qrAddingName: {
		color: _g.darkTheme.shade3,
		fontSize: 24,
		fontWeight: Platform.OS === 'ios' ? '600' : '200',
		textAlign: 'center',
	},
	qrAddSuccess: {
		fontSize: 30,
		color: _g.darkTheme.shade3,
		textAlign: 'center',
	},
	qrMarg: {
		..._g._margin(20, 0, 20, 0),
	},
	reset: {
		..._g._padding(10, 50, 10, 50),
		marginTop: 20,
	},
	resetText: {
		color: _g.darkTheme.shade2,
		fontSize: 16,
	}
});

export const myf = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: _g.darkTheme.shade5,
		..._g._padding(80, 0, 0, 0),
	},
	list: {
		// ..._g._border(1, 'red'),
	},
	send: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	count: {
		color: _g.darkTheme.shade2,
		fontSize: 14,
		marginLeft: 3,
	},
	spinner: {
		height: 20,
	}
});

export const allf = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: _g.darkTheme.shade5,
		..._g._padding(20),
	},
	title: {
		color: _g.darkTheme.shade3,
		fontSize: 20,
		textAlign: 'center',
	},
	list: {
		borderTopWidth: 1,
		borderTopColor: _g.darkTheme.shade3,
		marginTop: 20,
		paddingTop: 20,
	},
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		..._g._border(1, _g.darkTheme.shade5),
	},
	itemName: {
		color: _g.darkTheme.shade3,
		fontSize: 18,
		..._g._border(1, _g.darkTheme.shade5),
	},
	separator: {
		..._g._border(1, _g.darkTheme.shade5),
	},
	acceptBtn: {
		..._g._border(1, _g.darkTheme.shade5),
		width: 40,
		height: 40,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	empty: {
		color: _g.darkTheme.shade3,
		textAlign: 'center',
		marginTop: 50,
	}
});