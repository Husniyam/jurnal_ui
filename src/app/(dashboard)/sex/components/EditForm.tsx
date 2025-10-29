'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUpdateSex } from '@/hooks/useSex'
import { CreateSexDto, Sex } from '@/types/sex'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { sexSchema, SexSchema } from './zodSexSchema'

interface EditFormProps {
	initialData: Sex
	onClose: () => void
}

export default function EditForm({ initialData, onClose }: EditFormProps) {
	const { mutateAsync, isPending } = useUpdateSex()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SexSchema>({
		resolver: zodResolver(sexSchema),
		mode: 'onChange',
		defaultValues: {
			nomi: initialData.nomi || '',
			joylashuv: initialData.joylashuv || '',
		},
	})

	const onSubmit = async (data: CreateSexDto) => {
		try {
			await mutateAsync({ id: initialData._id, data: data })
			toast.success('Sex ma’lumotlari yangilandi ✅')
			onClose()
		} catch (err) {
			toast.error('Yangilashda xatolik yuz berdi ❌')
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4 max-w-lg mx-auto p-4 bg-card rounded-xl shadow-md w-full overflow-y-auto'
		>
			{/* Full name */}
			<div className='space-y-2'>
				<Label>Sex nomi</Label>
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
					{...register('joylashuv')}
					defaultValue={initialData.joylashuv}
				/>
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
