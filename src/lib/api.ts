import { authService } from '@/services/authService'
import axios from 'axios'
import Cookies from 'js-cookie'

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
	// withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

let isRefreshing = false
interface FailedRequest {
	resolve: (token?: string | null) => void
	reject: (error: unknown) => void
}
let failedQueue: FailedRequest[] = []

const processQueue = (error: unknown, token: string | null = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error)
		} else {
			prom.resolve(token)
		}
	})

	failedQueue = []
}

// Har bir requestdan oldin token qo‘shamiz
api.interceptors.request.use(
	config => {
		const token = Cookies.get('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

// ✅ Response interceptor — token eskirganda yangilash
api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		// Agar 401 bo‘lsa va refresh hali ishlamagan bo‘lsa
		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then(token => {
						originalRequest.headers.Authorization = `Bearer ${token}`
						return api(originalRequest)
					})
					.catch(err => Promise.reject(err))
			}

			originalRequest._retry = true
			isRefreshing = true

			try {
				const refreshToken = Cookies.get('refreshToken')
				if (!refreshToken) throw new Error('No refresh token')

				const data = await authService.refreshToken(refreshToken)

				Cookies.set('token', data.accessToken)
				Cookies.set('refreshToken', data.refreshToken)

				api.defaults.headers.Authorization = `Bearer ${data.accessToken}`
				processQueue(null, data.accessToken)

				return api(originalRequest)
			} catch (err) {
				processQueue(err, null)
				Cookies.remove('token')
				Cookies.remove('refreshToken')
				Cookies.remove('user')

				// refresh ham yaroqsiz bo‘lsa login sahifaga yuboramiz
				if (typeof window !== 'undefined') {
					window.location.href = '/login'
				}
				return Promise.reject(err)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)
