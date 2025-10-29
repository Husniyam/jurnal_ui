import { sexService } from '@/services/sexService'
import { CreateSexDto } from '@/types/sex'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// export function useSexlar() {
// 	return useQuery({
// 		queryKey: ['sexlar'],
// 		queryFn: async () => {
// 			const { data } = await api.get('/sex')
// 			return data
// 		},
// 	})
// }
export function useSexlar() {
	return useQuery({
		queryKey: ['sex'],
		queryFn: sexService.getAll,
	})
}

export function useAddSex() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: CreateSexDto) => sexService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['sex'] })
		},
	})
}

export const useUpdateSex = () => {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: CreateSexDto }) =>
			sexService.update(id, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['sex'] })
		},
	})
}

export function useDeleteSex() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => sexService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['sex'] })
		},
	})
}
