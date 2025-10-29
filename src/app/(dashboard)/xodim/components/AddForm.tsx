'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
// import { xodimSchema, XodimSchema } from "@/schemas/xodim.schema"
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
import { useAddXodim } from '@/hooks/useXodim' // post qilish uchun
import { toast } from 'sonner'
import { xodimSchema, XodimSchema } from './zodXodimSchema'

interface Props {
	onClose: () => void
}

export function AddXodimForm({ onClose }: Props) {
	const { data: sexlar = [] } = useSexlar()

	const { mutateAsync, isPending } = useAddXodim()

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<XodimSchema>({
		resolver: zodResolver(xodimSchema),
		mode: 'onChange',
	})

	const onSubmit = async (data: XodimSchema) => {
		try {
			await mutateAsync(data)
			onClose()
			toast.success('Xodim muvaffaqiyatli qo‘shildi ✅')
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
				<Label>Ism</Label>
				<Input placeholder='Ism' {...register('ism')} />
				{errors.ism && (
					<p className='text-sm text-red-500'>{errors.ism.message}</p>
				)}
			</div>

			{/* Full name */}
			<div className='space-y-2'>
				<Label>Familiya</Label>
				<Input placeholder='Familiya' {...register('familiya')} />
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
				/>
			</div>

			{/* Tabel */}
			<div className='space-y-2'>
				<Label>Tabel raqami</Label>
				<Input placeholder='Tabel raqami' {...register('tabelRaqam')} />
				{errors.tabelRaqam && (
					<p className='text-sm text-red-500'>{errors.tabelRaqam.message}</p>
				)}
			</div>

			{/* Sex select */}
			<div className='space-y-2'>
				<Label>Sex</Label>
				<Select onValueChange={val => setValue('sex', val)}>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Sex tanlang' />
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
				<Input placeholder='14 xonali JSHSHIR' {...register('jshshir')} />
				{errors.jshshir && (
					<p className='text-sm text-red-500'>{errors.jshshir.message}</p>
				)}
			</div>

			{/* Email */}
			<div className='space-y-2'>
				<Label>Email (ixtiyoriy)</Label>
				<Input placeholder='example@mail.com' {...register('email')} />
				{errors.email && (
					<p className='text-sm text-red-500'>{errors.email.message}</p>
				)}
			</div>

			{/* Submit */}
			<Button type='submit' disabled={isPending} className='w-full'>
				{isPending ? 'Yuklanmoqda...' : 'Qo‘shish'}
			</Button>
		</form>
	)
}
