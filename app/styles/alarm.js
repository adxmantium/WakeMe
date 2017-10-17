// /styles/alarm.js

import { StyleSheet } from 'react-native'

// import global styles
import * as _g from './_global'

export const head = StyleSheet.create({
	container: {
		// ..._g._border(1, 'white'),
		alignItems: 'flex-end',
		backgroundColor: 'transparent',
		flexDirection: 'row',
		justifyContent: 'space-between',
		..._g._padding(0, 15, 0, 15),
		height: _g.header_height,
		width: '100%',
		position: 'absolute',
		top: 0,
		zIndex: 1,
	},
	name: {
		fontSize: 20,
		fontWeight: '500',
		height: 26,
	},
	title: {
		fontSize: 20,
		fontWeight: '500',
		height: 26,
		color: _g.darkTheme.shade3,
		..._g._padding(1, 0, 0, 0),
	},
	btn: {
		height: 26,
		justifyContent: 'center',
	}
});

export const main = StyleSheet.create({
	container: {
		flex: 1,
		// ..._g._border(1, 'green'),
	},
	innerContainer: {
		// ..._g._border(1, 'red'),
		flex: 1.8,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
	bg: {
		flex: 1,
		width: undefined,
		height: undefined,
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		resizeMode: 'cover',
	},
	time: {
		fontSize: 100,
		fontWeight: '200',
		// ..._g._border(1, 'red'),
	},
	ampm: {
		fontSize: 40,
	},
	date: {
		fontSize: 20,
		fontWeight: '700',
	},
	setText: {
		color: _g.darkTheme.shade3,
		fontSize: 11,
	},	
	editTitle: {
		textAlign: 'center',
		fontWeight: '700',
		backgroundColor: 'transparent',
		color: _g.darkTheme.shade3,
		..._g._padding(10, 0, 10, 0),
		marginRight: 10,
	},
	editBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	editBtnOpen: {
		backgroundColor: _g.darkTheme.shade3,
	},
	chevron: {
		backgroundColor: 'transparent',
	}
});

export const edit = StyleSheet.create({
	container: {
		// ..._g._border(1, 'red'),
		height: 210,
	},
	modal: {
		flex: 1,
		// ..._g._border(1, 'blue'),
		backgroundColor: _g.darkTheme.shade3,
		marginTop: '120%',
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		// ..._g._border(1, 'red'),
	},
	btn: {
		// ..._g._border(1, 'red'),
		..._g._padding(15, 15, 0, 15),
		justifyContent: 'center',
	},
	btnText: {
		color: 'blue',
	},
	btnCancel: {
		color: _g._flatblack,
	},
	btnSave: {
		color: _g.darkTheme.shade5,
		fontWeight: '700',
	},
	pickerWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		flex: 1,
	},
	picker: {
		// ..._g._border(1, 'green'),
		width: 75,
	},
	colon: {
		fontSize: 30,
		width: 20,
		textAlign: 'center',
		..._g._padding(87, 0, 0, 0),
	},
	title: {
		textAlign: 'center',
		fontWeight: '700',
		..._g._padding(10, 0, 10, 0),
	},
	field: {
		// ..._g._border(1, 'black'),
		..._g._padding(10, 10, 10, 10),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	incr: {
		..._g._padding(15, 10, 15, 10),
	},
	label: {
		fontWeight: '700',
	},
	dateWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	day: {
		..._g._border(1, _g.darkTheme.shade5),
		..._g._borderRadius(100),
		width: 45,
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 5,
	},
	dayActive: {
		backgroundColor: _g.darkTheme.shade5,
	},
	dayText: {
		color: _g.darkTheme.shade5,
	},
	dayTextActive: {
		color: _g.darkTheme.shade3,
	}
});

export const menu = StyleSheet.create({
	container: {
		width: 50,
		height: 50,
		position: 'absolute',
		bottom: 5,
		left: '43%',
	},
	items: {

	},
});

export const darkTheme = StyleSheet.create({
	bg: {
		backgroundColor: _g.darkTheme.shade5,
	},
	bg2: {
		backgroundColor: _g.darkTheme.shade4,
	},
	bg3: {
		backgroundColor: _g.darkTheme.shade3,
	},
	color: {
		color: _g.darkTheme.shade3,
	},
	color2: {
		color: _g.darkTheme.shade5,
	}
});

export const darkThemeObj = {
	icon: _g.darkTheme.shade5,
	menuActive: _g.darkTheme.shade5,
	menuInactive: _g.darkTheme.shade6,
	menuIcon: _g.darkTheme.shade3,
}