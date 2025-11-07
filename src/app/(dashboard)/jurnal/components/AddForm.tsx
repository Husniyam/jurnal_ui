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
import { useAddJurnal } from '@/hooks/useJurnal'
import { useLokomotivlar } from '@/hooks/useLokomotiv'
import { useUzellar } from '@/hooks/useUzel'
import { useXodimlar } from '@/hooks/useXodim'
import { Lokomotiv } from '@/types/lokomotiv'
import { Uzel } from '@/types/uzel'
import { Xodim } from '@/types/xodim'
import { toast } from 'sonner'
import { jurnalcreateSchema, JurnalcreateSchema } from './zodJurnalSchema'

interface Props {
	onClose: () => void
}

export function AddForm({ onClose }: Props) {
	const { mutateAsync, isPending } = useAddJurnal()
	const { data: lokmotivlar = [] } = useLokomotivlar()
	const { data: uzellar = [] } = useUzellar()
	const { data: xodimlar = [] } = useXodimlar()

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(jurnalcreateSchema),
		mode: 'onChange',
		defaultValues: {
			status: 'Tamirda',
		},
	})

	const onSubmit = async (data: JurnalcreateSchema) => {
		console.log(data)

		try {
			await mutateAsync(data)
			onClose()
			toast.success('Jurnal ishi muvaffaqiyatli qo‘shildi ✅')
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

			{/* Full name */}
			<div className='space-y-2'>
				<Label>Yechilgan uzel</Label>
				<Select onValueChange={val => setValue('yechilganuzel', val)}>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Uzel tanlang' />
					</SelectTrigger>
					<SelectContent>
						{uzellar?.map((u: Uzel) => (
							<SelectItem key={u._id} value={u._id}>
								{u.uzeltype.nomi} {u.raqami}{' '}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.yechilganuzel && (
					<p className='text-sm text-red-500'>{errors.yechilganuzel.message}</p>
				)}
			</div>
			<div className='space-y-2'>
				<Label>Yechgan xodim</Label>
				<Select onValueChange={val => setValue('yechganXodim', val)}>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Xodimni tanlang' />
					</SelectTrigger>
					<SelectContent>
						{xodimlar?.map((u: Xodim) => (
							<SelectItem key={u._id} value={u._id}>
								{u.ism} {u.familiya} {u.tabelRaqam}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.yechilganuzel && (
					<p className='text-sm text-red-500'>{errors.yechilganuzel.message}</p>
				)}
			</div>

			{/* Full name */}
			<div className='space-y-2'>
				<Label>Ta’mir turi</Label>
				<Select onValueChange={val => setValue('tamirTuri', val)}>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Ta’mir turi' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='TXK-2'>TXK-2</SelectItem>
						<SelectItem value='TXK-3'>TXK-3</SelectItem>
						<SelectItem value='JT-1'>JT-3</SelectItem>
						<SelectItem value='kapital'>Kapital</SelectItem>
					</SelectContent>
				</Select>
				{errors.tamirTuri && (
					<p className='text-sm text-red-500'>{errors.tamirTuri.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label>Sana</Label>
				<Input type='date' {...register('yechilganSana')} />
				{errors.yechilganSana && (
					<p className='text-sm text-red-500'>{errors.yechilganSana.message}</p>
				)}
			</div>

			{/* Submit */}
			<Button
				type='submit'
				disabled={isPending}
				className='w-full cursor-pointer'
			>
				{isPending ? 'Yuklanmoqda...' : 'Qo‘shish'}
			</Button>
		</form>
	)
}
