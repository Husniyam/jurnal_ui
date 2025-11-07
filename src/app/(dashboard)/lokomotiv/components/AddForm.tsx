'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
// import { xodimSchema, XodimSchema } from "@/schemas/xodim.schema"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAddLokomotiv } from '@/hooks/useLokomotiv'
import { toast } from 'sonner'
import { LokmotivSchema, lokomotivSchema } from './zodLokomotivSchema'

interface Props {
	onClose: () => void
}

export function AddLokomotivForm({ onClose }: Props) {
	const { mutateAsync, isPending } = useAddLokomotiv()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LokmotivSchema>({
		resolver: zodResolver(lokomotivSchema),
		mode: 'onChange',
	})

	const onSubmit = async (data: LokmotivSchema) => {
		try {
			await mutateAsync(data)
			onClose()
			toast.success('Lokomotiv muvaffaqiyatli qo‘shildi ✅')
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
				<Input placeholder='Lokomotiv nomi' {...register('nomi')} />
				{errors.nomi && (
					<p className='text-sm text-red-500'>{errors.nomi.message}</p>
				)}
			</div>

			{/* Full name */}
			<div className='space-y-2'>
				<Label>Raqami</Label>
				<Input placeholder='Lokomotiv raqami' {...register('zavodRaqami')} />
				{errors.zavodRaqami && (
					<p className='text-sm text-red-500'>{errors.zavodRaqami.message}</p>
				)}
			</div>

			{/* Tabel */}
			<div className='space-y-2'>
				<Label>Lokomotiv turi</Label>
				<Input placeholder='Lokomotiv turi' {...register('turi')} />
				{errors.turi && (
					<p className='text-sm text-red-500'>{errors.turi.message}</p>
				)}
			</div>

			{/* Tabel */}
			<div className='space-y-2'>
				<Label>Ishlab chiqarilgan yili</Label>
				<Input
					type='number'
					placeholder='Chiqarilgan yili'
					{...register('ishlabChiqarilganYil')}
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
