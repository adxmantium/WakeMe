// /styles/collection.js

import { StyleSheet, Platform } from 'react-native'

// import global styles
import * as _g from './_global'

const _wake = {
	container: {
		flex: 1,
	},
	header: {
		position: 'absolute',
		width: '100%',
		zIndex: 2,
	},
	innerHeader: {
		..._g._padding(40, 15, 10, 15),
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	pagination: {
		color: _g.white,
		backgroundColor: 'transparent',
		marginBottom: 5,
	},
	player: {
		flex: 1,
	},
	file: {
		flex: 1,
	},
	progessWrapper: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
	},
	start: {
		backgroundColor: _g.darkTheme.shade5,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	startText: {
		color: _g.darkTheme.shade1,
		fontSize: 40,
		fontWeight: '200',
		textAlign: 'center',
	},
	timeText: {
		color: _g.darkTheme.shade2,
		fontSize: 100,
	},
	ampm: {
		fontSize: 50,
	},
	nav: {
		backgroundColor: 'transparent',
		zIndex: 2,
	},
	navBtn: {
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		..._g._padding(5, 10, 7, 10),
		..._g._border(3, _g.darkTheme.shade2),
	},
	pos1: {
		position: 'absolute',
		bottom: 20,
		right: 20,
	},
	navTitle: {
		color: _g.darkTheme.shade2,
		fontWeight: '400',
		fontSize: 30,
		marginRight: 10,
	},
	navIcon: {
		color: _g.darkTheme.shade2,
	},
	loader: {
		position: 'absolute',
		zIndex: 0,
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		zIndex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(170, 171, 184, 0.7)',
	},
	from: {
		color: _g.darkTheme.shade2,
		fontSize: 14,
	},
	fromWho: {
		color: _g.darkTheme.shade2,
		fontSize: 28,
	},
	msg: {
		padding: 15,
		backgroundColor: 'rgba(0,0,0,0.2)',
	},
	msgText: {
		fontWeight: '100',
	},
	showMsg: {
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomRightRadius: 5,
		backgroundColor: 'rgba(0,0,0,0.2)',
	}
};

if( Platform.OS === 'android' ){
	_wake.startText.fontFamily = _g.androidFontFamily;
	_wake.from.fontFamily = _g.androidFontFamily;
	_wake.fromWho.fontFamily = _g.androidFontFamily;
	_wake.navTitle.fontFamily = _g.androidFontFamily;
}

export const wake = StyleSheet.create(_wake);