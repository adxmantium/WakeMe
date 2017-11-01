// /api/axios.js

// lib
import axios from 'axios'
import ENV from './../../env'

const env = 'dev';

const userRoute = {
	dev: 'https://3v4nvvp8b7.execute-api.us-west-1.amazonaws.com/dev/wakeme',
	prod: ''
}

const wakerRoute = {
	dev: 'https://8bahxebpw9.execute-api.us-west-1.amazonaws.com/dev/wakeme',
	prod: '',
}

const friendsRoute = {
	dev: 'https://zrcrnfiepl.execute-api.us-west-1.amazonaws.com/dev/wakeme',
	prod: '',
}

const user = axios.create({
	baseURL: userRoute[env],
	headers: {},
})

const waker = axios.create({
	baseURL: wakerRoute[env],
	headers: {},
})

const friends = axios.create({
	baseURL: friendsRoute[env],
	headers: {},
})

const onesignal = axios.create({
	baseURL: ENV.ONESIGNAL_API,
	headers: {
		'content-type': 'application/json',
	    'authorization': 'Basic '+ENV.ONESIGNAL_REST_KEY,
	}
})

export default {
	user,
	waker,
	friends,
	onesignal,
}