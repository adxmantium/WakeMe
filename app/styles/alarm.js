// /styles/alarm.js

import { StyleSheet } from 'react-native'

// import global styles
import * as _g from './_global'

export const al = StyleSheet.create({
	container: {
		flex: 1,
		..._g._border(1, 'red'),			
	},
});

export const head = StyleSheet.create({
	container: {
		..._g._border(1, 'blue'),			
		alignItems: 'center',
		flex: 0.3,
		justifyContent: 'flex-end',
	},
	name: {
		fontSize: 20,
		fontWeight: '500',
	}
});

export const main = StyleSheet.create({
	container: {
		..._g._border(1, 'green'),			
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
		..._g._border(1, 'black'),
		flex: 1,
	},
	modal: {
		flex: 1,
		..._g._border(1, 'blue'),
		backgroundColor: 'rgba(255,255,255,0.9)',
		marginTop: 400,
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		..._g._border(1, 'red'),
	},
	btn: {
		..._g._padding(5, 15, 5, 15),
		justifyContent: 'center',
	},
	btnText: {
		color: 'blue',
	},
	pickerWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		flex: 1,
	},
	picker: {
		..._g._border(1, 'green'),
		width: 75,
	},
	colon: {
		fontSize: 30,
		width: 20,
		textAlign: 'center',
		..._g._padding(87, 0, 0, 0),
	}
});