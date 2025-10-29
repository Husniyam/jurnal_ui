'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
// import { xodimSchema, XodimSchema } from "@/schemas/xodim.schema"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAddSex } from '@/hooks/useSex'
import { toast } from 'sonner'
import { sexSchema, SexSchema } from './zodSexSchema'

interface Props {
	onClose: () => void
}

export function AddSexForm({ onClose }: Props) {
	const { mutateAsync, isPending } = useAddSex()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SexSchema>({
		resolver: zodResolver(sexSchema),
		mode: 'onChange',
	})

	const onSubmit = async (data: SexSchema) => {
		try {
			await mutateAsync(data)
			onClose()
			toast.success('Sex muvaffaqiyatli qo‘shildi ✅')
		} catch (err: any) {
			toast.error(err.response?.data?.message || 'Xatolik yuz berdi ❌')
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4 max-w-lg mx-auto p-4 bg-card rounded-xl shadow-md w-full overflow-y-auto'
		>
			{/* Full name */}
			<div className='space-y-2'>
				<Label>Nomi</Label>
				<Input placeholder='Nomi' {...register('nomi')} />
				{errors.nomi && (
					<p className='text-sm text-red-500'>{errors.nomi.message}</p>
				)}
			</div>

			{/* Full name */}
			<div className='space-y-2'>
				<Label>Izoh</Label>
				<Input placeholder='Izoh' {...register('joylashuv')} />
				{errors.joylashuv && (
					<p className='text-sm text-red-500'>{errors.joylashuv.message}</p>
				)}
			</div>

			{/* Submit */}
			<Button type='submit' disabled={isPending} className='w-full'>
				{isPending ? 'Yuklanmoqda...' : 'Qo‘shish'}
			</Button>
		</form>
	)
}
