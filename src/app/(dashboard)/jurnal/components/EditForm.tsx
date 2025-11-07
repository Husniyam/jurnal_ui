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
import { useUpdateJurnal } from '@/hooks/useJurnal'
import { useUzellar } from '@/hooks/useUzel'
import { useXodimlar } from '@/hooks/useXodim'
import { CreateJurnalDto, Jurnal } from '@/types/jurnal'
import { Uzel } from '@/types/uzel'
import { Xodim } from '@/types/xodim'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { jurnalupdateSchema } from './zodJurnalSchema'

interface EditFormProps {
	initialData: Jurnal
	onClose: () => void
}

export default function EditForm({ initialData, onClose }: EditFormProps) {
	const { mutateAsync, isPending } = useUpdateJurnal()
	const { data: uzellar = [] } = useUzellar()
	const { data: xodimlar = [] } = useXodimlar()

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(jurnalupdateSchema),
		mode: 'onChange',
		defaultValues: {
			lokomotiv: initialData.lokomotiv._id,
			yechilganuzel: initialData.yechilganuzel._id,
			yechganXodim: initialData.yechganXodim._id,
			tamirTuri: initialData.tamirTuri,
			yechilganSana: initialData.yechilganSana,
			status: 'Ish holatida',
		},
	})

	const onSubmit = async (data: CreateJurnalDto) => {
		console.log(data)

		try {
			await mutateAsync({ id: initialData._id, data: data })
			toast.success('Jurnal ma’lumotlari yangilandi ✅')
			onClose()
		} catch (err) {
			toast.error(`Yangilashda xatolik yuz berdi ❌ ${err}`)
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
				<Input
					placeholder={initialData.lokomotiv.nomi}
					// defaultValue={initialData.lokomotiv.nomi}
					disabled
				/>
				{errors.lokomotiv && (
					<p className='text-sm text-red-500'>{errors.lokomotiv.message}</p>
				)}
			</div>

			{/* Full name */}
			<div className='space-y-2'>
				<Label>Yechilgan uzel turi</Label>
				<Input placeholder={initialData.yechilganuzel.uzeltype.nomi} disabled />
				{errors.yechilganuzel && (
					<p className='text-sm text-red-500'>{errors.yechilganuzel.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label>Yechgan xodim</Label>
				<Input placeholder={initialData.yechganXodim.ism} disabled />
				{errors.yechganXodim && (
					<p className='text-sm text-red-500'>{errors.yechganXodim.message}</p>
				)}
			</div>

			{/* Full name */}
			<div className='space-y-2'>
				<Label>Qoyilgan uzel</Label>
				<Select onValueChange={val => setValue('qoyilganuzel', val)}>
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
				{errors.qoyilganuzel && (
					<p className='text-sm text-red-500'>{errors.qoyilganuzel.message}</p>
				)}
			</div>
			<div className='space-y-2'>
				<Label>Qoygan xodim</Label>
				<Select onValueChange={val => setValue('qoyganXodim', val)}>
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
				{errors.qoyganXodim && (
					<p className='text-sm text-red-500'>{errors.qoyganXodim.message}</p>
				)}
			</div>

			<div className='space-y-2'>
				<Label>Qoyilgan sana</Label>
				<Input type='date' {...register('qoyilganSana')} />
				{errors.qoyilganSana && (
					<p className='text-sm text-red-500'>{errors.qoyilganSana.message}</p>
				)}
			</div>

			{/* Submit */}
			<Button
				type='submit'
				onClick={() => console.log('jknkj')}
				disabled={isPending}
				className='w-full cursor-pointer'
			>
				{isPending ? 'Yuklanmoqda...' : 'Qo‘shish'}
			</Button>
		</form>
	)
}
