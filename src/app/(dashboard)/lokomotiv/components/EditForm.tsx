'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUpdateLokomotiv } from '@/hooks/useLokomotiv'
import { CreateLokomotivDto, Lokomotiv } from '@/types/lokomotiv'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { LokmotivSchema, lokomotivSchema } from './zodLokomotivSchema'

interface EditFormProps {
	initialData: Lokomotiv
	onClose: () => void
}

export default function EditForm({ initialData, onClose }: EditFormProps) {
	const { mutateAsync, isPending } = useUpdateLokomotiv()

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<LokmotivSchema>({
		resolver: zodResolver(lokomotivSchema),
		mode: 'onChange',
		defaultValues: {
			nomi: initialData.nomi || '',
			turi: initialData.turi || '',
			zavodRaqami: initialData.zavodRaqami || '',
			ishlabChiqarilganYil: initialData.ishlabChiqarilganYil || '',
		},
	})

	const onSubmit = async (data: CreateLokomotivDto) => {
		try {
			await mutateAsync({ id: initialData._id, data: data })
			toast.success('Lokomotiv ma’lumotlari yangilandi ✅')
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
				<Label>Seriyasi</Label>
				<Input
					placeholder='Seriyasi'
					{...register('nomi')}
					defaultValue={initialData.nomi}
				/>
				{errors.nomi && (
					<p className='text-sm text-red-500'>{errors.nomi.message}</p>
				)}
			</div>

			{/* Full name */}
			<div className='space-y-2'>
				<Label>Raqami</Label>
				<Input
					placeholder='Raqami'
					{...register('zavodRaqami')}
					defaultValue={initialData.zavodRaqami}
				/>
				{errors.zavodRaqami && (
					<p className='text-sm text-red-500'>{errors.zavodRaqami.message}</p>
				)}
			</div>

			{/* Tabel */}
			<div className='space-y-2'>
				<Label>Lokmotiv turi</Label>
				<Input
					placeholder='Lokmotiv turi'
					{...register('turi')}
					defaultValue={initialData.turi}
				/>
				{errors.turi && (
					<p className='text-sm text-red-500'>{errors.turi.message}</p>
				)}
			</div>

			{/* JSHSHIR */}
			<div className='space-y-2'>
				<Label>Chiqarilgan yili</Label>
				<Input
					placeholder='Chiqarilgan yili'
					{...register('ishlabChiqarilganYil')}
					defaultValue={initialData.ishlabChiqarilganYil}
				/>
				{errors.ishlabChiqarilganYil && (
					<p className='text-sm text-red-500'>
						{errors.ishlabChiqarilganYil.message}
					</p>
				)}
			</div>

			{/* Submit */}
			<Button type='submit' disabled={isPending} className='w-full'>
				{isPending ? 'Yuklanmoqda...' : 'Qo‘shish'}
			</Button>
		</form>
	)
}
