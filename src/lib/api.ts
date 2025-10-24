import axios from 'axios'
import Cookies from 'js-cookie'

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
	},
})

// Har bir requestdan oldin token qo‘shamiz
api.interceptors.request.use(config => {
	const token = Cookies.get('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})
