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
import { useLokomotivlar } from '@/hooks/useLokomotiv'
import { useSexlar } from '@/hooks/useSex'
import { useAddUzel } from '@/hooks/useUzel'
import { useUzeltypelar } from '@/hooks/useUzeltype'
import { Lokomotiv } from '@/types/lokomotiv'
import { Sex } from '@/types/sex'
import { Uzeltype } from '@/types/uzeltype'
import { toast } from 'sonner'
import { uzelSchema, UzelSchema } from './zodUzelSchema'

interface Props {
	onClose: () => void
}

export function AddUzelForm({ onClose }: Props) {
	const { mutateAsync, isPending } = useAddUzel()
	const { data: lokmotivlar = [] } = useLokomotivlar()
	const { data: sexlar = [] } = useSexlar()
	const { data: uzelturlari = [] } = useUzeltypelar()

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<UzelSchema>({
		resolver: zodResolver(uzelSchema),
		mode: 'onChange',
	})

	const onSubmit = async (data: UzelSchema) => {
		try {
			await mutateAsync(data)
			onClose()
			toast.success('Uzel muvaffaqiyatli qo‘shildi ✅')
		} catch (err) {
			toast.error(`Xatolik yuz berdi ❌  ${err}`)
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4 max-w-lg mx-auto p-4 bg-card rounded-xl shadow-md w-full overflow-y-auto'
		>
			<div className='space-y-2'>
				<Label>Uzel turi</Label>
				<Select onValueChange={val => setValue('uzeltype', val)}>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Uzel turini tanlang' />
					</SelectTrigger>
					<SelectContent>
						{uzelturlari?.map((l: Uzeltype) => (
							<SelectItem key={l._id} value={l._id}>
								{l.nomi}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.uzeltype && (
					<p className='text-sm text-red-500'>{errors.uzeltype.message}</p>
				)}
			</div>

			{/* Full name */}
			<div className='space-y-2'>
				<Label>Uzel Raqami</Label>
				<Input placeholder='Nomi' {...register('raqami')} />
				{errors.raqami && (
					<p className='text-sm text-red-500'>{errors.raqami.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label>Uzel holati</Label>
				<Select onValueChange={val => setValue('holati', val)}>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Uzel holatini tanlang' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Tamirda'>Tamirda</SelectItem>
						<SelectItem value='Jarayonda'>Jarayonda</SelectItem>
						<SelectItem value='Ish holatida'>Ish holatida</SelectItem>
					</SelectContent>
				</Select>
				{errors.holati && (
					<p className='text-sm text-red-500'>{errors.holati.message}</p>
				)}
			</div>
			<div className='space-y-2'>
				<Label>Sex</Label>
				<Select onValueChange={val => setValue('sex', val)}>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Sexni tanlang' />
					</SelectTrigger>
					<SelectContent>
						{sexlar?.map((l: Sex) => (
							<SelectItem key={l._id} value={l._id}>
								{l.nomi}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.sex && (
					<p className='text-sm text-red-500'>{errors.sex.message}</p>
				)}
			</div>
			<div className='space-y-2'>
				<Label>Lokomotiv</Label>
				<Select onValueChange={val => setValue('lokomotiv', val)}>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Lokomotiv tanlang' />
					</SelectTrigger>
					<SelectContent>
						{lokmotivlar?.map((l: Lokomotiv) => (
							<SelectItem key={l._id} value={l._id}>
								{l.nomi}-{l.zavodRaqami}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.lokomotiv && (
					<p className='text-sm text-red-500'>{errors.lokomotiv.message}</p>
				)}
			</div>

			{/* Submit */}
			<Button type='submit' disabled={isPending} className='w-full'>
				{isPending ? 'Yuklanmoqda...' : 'Qo‘shish'}
			</Button>
		</form>
	)
}
