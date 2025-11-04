import { api } from '@/lib/api'
import { CreateJurnalDto, Jurnal } from '@/types/jurnal'

export const jurnalService = {
	async getAll(): Promise<Jurnal[]> {
		const res = await api.get('/jurnal')
		return res.data
	},

	async create(data: CreateJurnalDto): Promise<CreateJurnalDto> {
		const res = await api.post('/jurnal', data)
		return res.data
	},

	async update(id: string, payload: CreateJurnalDto) {
		const { data } = await api.patch(`/jurnal/${id}`, payload)
		return data
	},

	async delete(id: string) {
		await api.delete(`/jurnal/${id}`)
	},
}
