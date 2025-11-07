'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
// import { xodimSchema, XodimSchema } from "@/schemas/xodim.schema"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAddUzeltype } from '@/hooks/useUzeltype'
import { toast } from 'sonner'
import { uzeltypeSchema, UzeltypeSchema } from './zodUzeltypeSchema'

interface Props {
	onClose: () => void
}

export function AddUzeltypeForm({ onClose }: Props) {
	const { mutateAsync, isPending } = useAddUzeltype()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UzeltypeSchema>({
		resolver: zodResolver(uzeltypeSchema),
		mode: 'onChange',
	})

	const onSubmit = async (data: UzeltypeSchema) => {
		try {
			await mutateAsync(data)
			onClose()
			toast.success('Uzel turi muvaffaqiyatli qo‘shildi ✅')
		} catch (err) {
			toast.error(`Xatolik yuz berdi ❌ ${err}`)
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
				<Input placeholder='Izoh' {...register('description')} />
				{errors.description && (
					<p className='text-sm text-red-500'>{errors.description.message}</p>
				)}
			</div>

			{/* Full name */}
			<div className='space-y-2'>
				<Label>Korik muddati</Label>
				<Input placeholder='Muddat' {...register('korikmuddat')} />
				{errors.korikmuddat && (
					<p className='text-sm text-red-500'>{errors.korikmuddat.message}</p>
				)}
			</div>

			{/* Submit */}
			<Button type='submit' disabled={isPending} className='w-full'>
				{isPending ? 'Yuklanmoqda...' : 'Qo‘shish'}
			</Button>
		</form>
	)
}
