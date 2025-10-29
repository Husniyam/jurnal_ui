import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export const authService = {
	async login(credentials: { tabel: string; password: string }) {
		const res = await axios.post(`${API_URL}/auth/login`, credentials)
		return res.data
	},

	async refreshToken(refreshToken: string) {
		const res = await axios.post(`${API_URL}/auth/refresh`, { refreshToken })
		return res.data // { accessToken, refreshToken }
	},
}
