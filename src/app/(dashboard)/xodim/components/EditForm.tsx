'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useSexlar } from '@/hooks/useSex'
import { useUpdateXodim } from '@/hooks/useXodim'
import { CreateXodimDto, Xodim } from '@/types/xodim'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { xodimSchema, XodimSchema } from './zodXodimSchema'

interface EditFormProps {
	initialData: Xodim
	onClose: () => void
}

export default function EditForm({ initialData, onClose }: EditFormProps) {
	const [form, setForm] = useState(initialData)
	const { data: sexlar = [] } = useSexlar()
	const { mutateAsync, isPending } = useUpdateXodim()

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<XodimSchema>({
		resolver: zodResolver(xodimSchema),
		mode: 'onChange',
		defaultValues: {
			ism: initialData.ism || '',
			familiya: initialData.familiya || '',
			tel: initialData.tel || '',
			tabelRaqam: initialData.tabelRaqam || '',
			jshshir: initialData.jshshir || '',
			email: initialData.email || '',
			sex: initialData.sex?._id || '', // sex obyekt bo'lganligi uchun
		},
	})

	const onSubmit = async (data: CreateXodimDto) => {
		try {
			await mutateAsync({ id: form._id, data: data })
			toast.success('Xodim ma’lumotlari yangilandi ✅')
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
				<Label>Ism</Label>
				<Input placeholder='Ism' {...register('ism')} defaultValue={form.ism} />
				{errors.ism && (
					<p className='text-sm text-red-500'>{errors.ism.message}</p>
				)}
			</div>

			{/* Full name */}
			<div className='space-y-2'>
				<Label>Familiya</Label>
				<Input
					placeholder='Familiya'
					{...register('familiya')}
					defaultValue={form.familiya}
				/>
				{errors.familiya && (
					<p className='text-sm text-red-500'>{errors.familiya.message}</p>
				)}
			</div>

			{/* Phone */}
			<div className='space-y-2'>
				<Label>Telefon raqami</Label>
				<Input
					placeholder='+998 __ ___ __ __'
					{...register('tel')}
					onChange={e => {
						let val = e.target.value.replace(/\D/g, '')
						if (val.startsWith('998')) val = val.slice(3)
						const formatted = `+998 ${val.slice(0, 2)} ${val.slice(
							2,
							5
						)} ${val.slice(5, 7)} ${val.slice(7, 9)}`
						e.target.value = formatted.trim()
					}}
					defaultValue={form.tel}
				/>
			</div>

			{/* Tabel */}
			<div className='space-y-2'>
				<Label>Tabel raqami</Label>
				<Input
					placeholder='Tabel raqami'
					{...register('tabelRaqam')}
					defaultValue={form.tabelRaqam}
				/>
				{errors.tabelRaqam && (
					<p className='text-sm text-red-500'>{errors.tabelRaqam.message}</p>
				)}
			</div>

			{/* Sex select */}
			<div className='space-y-2'>
				<Label>Sex</Label>
				<Select onValueChange={val => setValue('sex', val)}>
					<SelectTrigger className='w-full'>
						<SelectValue
							placeholder='Sex tanlang'
							defaultValue={form.sex.nomi}
						/>
					</SelectTrigger>
					<SelectContent>
						{sexlar.map((sex: any) => (
							<SelectItem key={sex._id} value={sex._id}>
								{sex.nomi} ({sex.joylashuvi})
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.sex && (
					<p className='text-sm text-red-500'>{errors.sex.message}</p>
				)}
			</div>

			{/* JSHSHIR */}
			<div className='space-y-2'>
				<Label>JSHSHIR</Label>
				<Input
					placeholder='14 xonali JSHSHIR'
					{...register('jshshir')}
					defaultValue={form.jshshir}
				/>
				{errors.jshshir && (
					<p className='text-sm text-red-500'>{errors.jshshir.message}</p>
				)}
			</div>

			{/* Email */}
			<div className='space-y-2'>
				<Label>Email (ixtiyoriy)</Label>
				<Input
					placeholder='example@mail.com'
					{...register('email')}
					defaultValue={form.email}
				/>
				{errors.email && (
					<p className='text-sm text-red-500'>{errors.email.message}</p>
				)}
			</div>

			{/* Submit */}
			<Button type='submit' disabled={isPending} className='w-full'>
				{isPending ? 'Yuklanmoqda...' : 'Qo‘shish'}
			</Button>
		</form>
		// <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
		// 	<div>
		// 		<Label>Ism</Label>
		// 		<Input
		// 			value={form.ism}
		// 			onChange={e => setForm({ ...form, ism: e.target.value })}
		// 		/>
		// 	</div>
		// 	<div>
		// 		<Label>Familiya</Label>
		// 		<Input
		// 			value={form.familiya}
		// 			onChange={e => setForm({ ...form, familiya: e.target.value })}
		// 		/>
		// 	</div>
		// 	<div>
		// 		<Label>Telefon</Label>
		// 		<Input
		// 			value={form.tel}
		// 			onChange={e => setForm({ ...form, tel: e.target.value })}
		// 		/>
		// 	</div>

		// 	<Button type='submit' disabled={isPending} className='w-full'>
		// 		{isPending ? 'Saqlanmoqda...' : 'Yangilash'}
		// 	</Button>
		// </form>
	)
}
