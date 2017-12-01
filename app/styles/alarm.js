// /styles/alarm.js

import { StyleSheet, Dimensions, Platform } from 'react-native'

// import global styles
import * as _g from './_global'

const { width: dim_width, height: dim_height } = Dimensions.get('window');
const EDIT_ALARM_CONTAINER_HEIGHT = 210;
const editFieldPadding = 15;

const headStyles = {
	container: {
		alignItems: 'flex-end',
		backgroundColor: 'transparent',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		position: 'absolute',
		top: 0,
		zIndex: 1,
		// ..._g._border(1, 'red'),
	},
	title: {
		height: '100%',
		justifyContent: 'flex-end',
		..._g._padding(0, 10, 0, 10),
		// ..._g._border(1, 'white'),
	},
	titleText: {
		fontSize: 20,
		fontWeight: '500',
		color: _g.darkTheme.shade3,
	},
	btn: {
		height: _g.header_height,
		width: 50,
		alignItems: 'center',
		justifyContent: 'flex-end',
		// ..._g._border(1, 'white'),
	}
};

if( Platform.OS === 'android' ){
	const position = 'center';
	headStyles.title.justifyContent = position;
	headStyles.titleText.fontFamily = _g.androidFontFamily;
	headStyles.btn.justifyContent = position;
}

export const head = StyleSheet.create(headStyles);

const _main = {
	container: {
		flex: 1,
	},
	innerContainer: {
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
		fontWeight: Platform.OS === 'android' ? '100' : '200',
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
		fontSize: 18,
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
};

if( Platform.OS === 'android' ){
	_main.time.fontFamily = _g.androidFontFamily;
	_main.date.fontFamily = _g.androidFontFamily;
}

export const main = StyleSheet.create(_main);

export const edit = StyleSheet.create({
	container: {
		height: EDIT_ALARM_CONTAINER_HEIGHT,
	},
	alarmEditContainer: {
		// ..._g._border(),
		flex: 1,
		justifyContent: 'center',
	},
	modal: {
		flex: 1,
		backgroundColor: _g.darkTheme.shade3,
		marginTop: Platform.OS === 'android' ? (dim_height - (EDIT_ALARM_CONTAINER_HEIGHT+20)) : '120%',
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	btn: {
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
		alignItems: 'center',
		flex: 1,
	},
	picker: {
		width: Platform.OS === 'android' ? 88 : 75,
	},
	colon: {
		fontSize: 30,
		width: 20,
		textAlign: 'center',
		paddingTop: Platform.OS === 'android' ? 0 : 87,
		height: 48,
	},
	title: {
		textAlign: 'center',
		fontWeight: '700',
		..._g._padding(10, 0, 10, 0),
	},
	field: {
		..._g._padding(editFieldPadding, 10, editFieldPadding, 10),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// ..._g._border(),
	},
	incr: {
		..._g._padding(editFieldPadding+5, 10, editFieldPadding+5, 10),
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