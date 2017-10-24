// /api/axios.js

// lib
import axios from 'axios'

const userRoute = {
	dev: 'https://3v4nvvp8b7.execute-api.us-west-1.amazonaws.com/dev/wakeme',
	prod: ''
}

const wakerRoute = {
	dev: 'https://mfpjrgr3gh.execute-api.us-west-1.amazonaws.com/dev/wakeme',
	prod: '',
}

const friendsRoute = {
	dev: 'https://zrcrnfiepl.execute-api.us-west-1.amazonaws.com/dev/wakeme',
	prod: '',
}

const user = axios.create({
	baseURL: userRoute.dev,
	headers: {},
})

const waker = axios.create({
	baseURL: wakerRoute.dev,
	headers: {},
})

const friends = axios.create({
	baseURL: friendsRoute.dev,
	headers: {},
})

export default {
	user,
	waker,
	friends,
}