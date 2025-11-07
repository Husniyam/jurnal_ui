'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUpdateUzeltype } from '@/hooks/useUzeltype'
import { UzeltypeDto, Uzeltypewith } from '@/types/uzeltype'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { uzeltypeSchema, UzeltypeSchema } from './zodUzeltypeSchema'

interface EditFormProps {
	initialData: Uzeltypewith
	onClose: () => void
}

export default function EditForm({ initialData, onClose }: EditFormProps) {
	const { mutateAsync, isPending } = useUpdateUzeltype()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UzeltypeSchema>({
		resolver: zodResolver(uzeltypeSchema),
		mode: 'onChange',
		defaultValues: {
			nomi: initialData.nomi || '',
			description: initialData.description || '',
			korikmuddat: initialData.korikmuddat || '',
		},
	})

	const onSubmit = async (data: UzeltypeDto) => {
		try {
			await mutateAsync({ id: initialData._id, data: data })
			toast.success('Uzel turi ma’lumotlari yangilandi ✅')
			onClose()
		} catch (err) {
			toast.error(`Yangilashda xatolik yuz berdi ❌  ${err}`)
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4 max-w-lg mx-auto p-4 bg-card rounded-xl shadow-md w-full overflow-y-auto'
		>
			{/* Full name */}
			<div className='space-y-2'>
				<Label>Uzel turi nomi</Label>
				<Input
					placeholder='nomi'
					{...register('nomi')}
					defaultValue={initialData.nomi}
				/>
				{errors.nomi && (
					<p className='text-sm text-red-500'>{errors.nomi.message}</p>
				)}
			</div>

			{/* Full name */}
			<div className='space-y-2'>
				<Label>Izoh</Label>
				<Input
					placeholder='Izoh'
					{...register('description')}
					defaultValue={initialData.description}
				/>
				{errors.description && (
					<p className='text-sm text-red-500'>{errors.description.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label>Tamir Davri</Label>
				<Input
					placeholder='Muddat'
					{...register('korikmuddat')}
					defaultValue={initialData.korikmuddat}
				/>
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
