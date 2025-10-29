import { api } from '@/lib/api'
import { CreateLokomotivDto, Lokomotiv } from '@/types/lokomotiv'

export const lokomotivService = {
	async getAll(): Promise<Lokomotiv[]> {
		const res = await api.get('/lokomotiv')
		return res.data
	},

	async create(data: CreateLokomotivDto): Promise<Lokomotiv> {
		console.log(data)

		const res = await api.post('/lokomotiv', data)
		return res.data
	},

	async update(id: string, payload: CreateLokomotivDto) {
		const { data } = await api.patch(`/lokomotiv/${id}`, payload)
		return data
	},

	async delete(id: string) {
		await api.delete(`/lokomotiv/${id}`)
	},
}
