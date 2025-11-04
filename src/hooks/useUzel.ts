import { uzelService } from '@/services/uzelService'
import { CreateUzelDto } from '@/types/uzel'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export function useUzellar() {
	return useQuery({
		queryKey: ['uzel'],
		queryFn: uzelService.getAll,
	})
}
export function useUzellarBytype() {
	const { id } = useParams()
	return useQuery({
		queryKey: ['uzel', id],
		queryFn: () => uzelService.getAllBynomi(id as string),
		enabled: !!id,
	})
}

// export function useUzellarNomi() {
// 	const queryClient = useQueryClient()

// 	return useMutation({
// 		mutationFn: (data: string) => uzelService.getAllBynomi(data),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ['uzel'] })
// 		},
// 	})
// }

export function useAddUzel() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: CreateUzelDto) => uzelService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['uzel'] })
		},
	})
}

export const useUpdateUzel = () => {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: CreateUzelDto }) =>
			uzelService.update(id, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['uzel'] })
		},
	})
}

export function useDeleteUzel() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => uzelService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['uzel'] })
		},
	})
}
