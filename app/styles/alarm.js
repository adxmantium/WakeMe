// /styles/alarm.js

import { StyleSheet } from 'react-native'

// import global styles
import * as _g from './_global'

export const al = StyleSheet.create({
	container: {
		flex: 1,
		// ..._g._border(1, 'red'),			
	},
});

export const head = StyleSheet.create({
	container: {
		// ..._g._border(1, 'blue'),
		alignItems: 'center',
		flex: 0.4,
		flexDirection: 'row',
		justifyContent: 'space-between',
		..._g._padding(0, 15, 0, 15),
	},
	name: {
		fontSize: 20,
		fontWeight: '500',
	}
});

export const main = StyleSheet.create({
	container: {
		// ..._g._border(1, 'green'),
		alignItems: 'center',
		flex: 2,
		justifyContent: 'center',
	},
	time: {
		fontSize: 100,
		fontWeight: '200',
	},
	ampm: {
		fontSize: 40,
	},
	date: {
		fontSize: 18,
		fontWeight: '700',
	}
});

export const edit = StyleSheet.create({
	container: {
		// ..._g._border(1, 'black'),
		flex: 1,
	},
	modal: {
		flex: 1,
		// ..._g._border(1, 'blue'),
		backgroundColor: _g.darkTheme.shade3,
		marginTop: '110%',
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		// ..._g._border(1, 'red'),
	},
	btn: {
		..._g._padding(5, 15, 5, 15),
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
		marginBottom: 1,
	},
	label: {
		fontWeight: '700',
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