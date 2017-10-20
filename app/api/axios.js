// /api/axios.js

// lib
import axios from 'axios'

const userRoute = {
	dev: 'https://3v4nvvp8b7.execute-api.us-west-1.amazonaws.com/dev/wakeme',
	prod: ''
}

const wakeupcallRoute = {
	dev: 'https://mfpjrgr3gh.execute-api.us-west-1.amazonaws.com/dev/wakeme',
	prod: '',
}

const user = axios.create({
	baseURL: userRoute.dev,
	headers: {},
})

const wakeupcall = axios.create({
	baseURL: wakeupcallRoute.dev,
	headers: {},
})

export default {
	user,
	wakeupcall,
}