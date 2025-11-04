import { jurnalService } from '@/services/jurnalService'
import { CreateJurnalDto } from '@/types/jurnal'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useJurnallar() {
	return useQuery({
		queryKey: ['jurnal'],
		queryFn: jurnalService.getAll,
	})
}

export function useAddJurnal() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: CreateJurnalDto) => jurnalService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['jurnal'] })
		},
	})
}

export const useUpdateJurnal = () => {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: CreateJurnalDto }) =>
			jurnalService.update(id, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['jurnal'] })
		},
	})
}

export function useDeleteJurnal() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => jurnalService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['jurnal'] })
		},
	})
}
