// /api/axios.js

// lib
import axios from 'axios'
import ENV from './../../env'

const env = ENV.env;

const userRoute = {
	dev: 'https://3v4nvvp8b7.execute-api.us-west-1.amazonaws.com/dev/wakeme',
	production: 'https://a091iz9y74.execute-api.us-west-1.amazonaws.com/production/wakeme'
}

const wakerRoute = {
	dev: 'https://8bahxebpw9.execute-api.us-west-1.amazonaws.com/dev/wakeme',
	production: 'https://d39z1ijqb5.execute-api.us-west-1.amazonaws.com/production/wakeme',
}

const friendsRoute = {
	dev: 'https://zrcrnfiepl.execute-api.us-west-1.amazonaws.com/dev/wakeme',
	production: 'https://7amej8hgyh.execute-api.us-west-1.amazonaws.com/production/wakeme',
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