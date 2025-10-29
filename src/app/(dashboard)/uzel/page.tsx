'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useUzeltypelar } from '@/hooks/useUzeltype'
import { Uzeltypewith } from '@/types/uzeltype'
import { Search, SquarePen, Trash2, Wrench } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import AddUzeltypeModal from './components/AddUzeltypeModal'
import DeleteUzeltypeModal from './components/DeleteUzeltypeModal'
import EditUzeltypeModal from './components/EditUzeltypeModal'

// 🔹 Turlar
interface UzelType {
	id: string
	nomi: string
	description: string
	tamirdavri: number // oy hisobida
}

interface Uzel {
	id: string
	nomi: string
	raqami: string
	holati: string
	sex: string
	lokomotiv: string
	sana: string // oxirgi ta’mir sanasi
}

export default function UzellarPage() {
	const router = useRouter()
	const [uzelTypes, setUzelTypes] = useState<UzelType[]>([])
	const [uzellar, setUzel] = useState<Uzel[]>([])
	const [search, setSearch] = useState('')
	const { data: uzeltypelar = [] } = useUzeltypelar()
	const [open, setOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [deleteOpen, setDeleteOpen] = useState(false)
	const [selectedUzeltype, setSelectedUzeltype] = useState<Uzeltypewith>()

	useEffect(() => {
		// 🔹 Fake ma’lumotlar (keyin backenddan olinadi)
		setUzelTypes([
			{
				id: '1',
				nomi: 'Nasos',
				description: 'Suv nasosi tizimi',
				tamirdavri: 6,
			},
			{
				id: '2',
				nomi: 'Generator',
				description: 'Elektr energiya tizimi',
				tamirdavri: 12,
			},
			{
				id: '3',
				nomi: 'Kompressor',
				description: 'Bosim ushlab turuvchi tizim',
				tamirdavri: 3,
			},
			{
				id: '4',
				nomi: 'Transformator',
				description: 'Kuchlanishni o‘zgartiruvchi tizim',
				tamirdavri: 9,
			},
		])

		setUzel([
			{
				id: 'u1',
				nomi: 'Nasos',
				raqami: 'N-01',
				holati: 'Ish holatida',
				sex: 'Sex-1',
				lokomotiv: 'Lok-1',
				sana: '2025-02-10',
			},
			{
				id: 'u2',
				nomi: 'Nasos',
				raqami: 'N-02',
				holati: 'Ta’mirda',
				sex: 'Sex-1',
				lokomotiv: '',
				sana: '2025-07-20',
			},
			{
				id: 'u3',
				nomi: 'Generator',
				raqami: 'G-01',
				holati: 'Ish holatida',
				sex: '',
				lokomotiv: 'Lok-3',
				sana: '2024-11-10',
			},
			{
				id: 'u4',
				nomi: 'Kompressor',
				raqami: 'K-01',
				holati: 'Zaxirada',
				sex: 'Sex-3',
				lokomotiv: '',
				sana: '2025-09-01',
			},
			{
				id: 'u5',
				nomi: 'Kompressor',
				raqami: 'K-02',
				holati: 'Ish holatida',
				sex: 'Sex-2',
				lokomotiv: 'Lok-2',
				sana: '2025-04-10',
			},
		])
	}, [])

	// 🔹 Har bir tur uchun ta’mir statistikasi
	const data = useMemo(() => {
		const today = new Date()

		return uzelTypes.map(type => {
			const related = uzellar.filter(u => u.nomi === type.nomi)

			let blue = 0 // 7 kundan ko‘p qolgani
			let yellow = 0 // 7 kundan kam qolgani
			let red = 0 // muddati o‘tgan

			related.forEach(u => {
				const lastRepair = new Date(u.sana)
				const tamirDavriDays = type.tamirdavri * 30
				const diffDays = Math.floor(
					(today.getTime() - lastRepair.getTime()) / (1000 * 60 * 60 * 24)
				)
				const remaining = tamirDavriDays - diffDays

				if (remaining > 7) blue++
				else if (remaining > 0 && remaining <= 7) yellow++
				else if (remaining <= 0) red++
			})

			return {
				...type,
				total: related.length,
				blue,
				yellow,
				red,
			}
		})
	}, [uzelTypes, uzellar])

	// 🔹 Qidiruv bo‘yicha filtr
	const filtered = useMemo(() => {
		if (!search.trim()) return data
		return data.filter(item =>
			item.nomi.toLowerCase().includes(search.toLowerCase())
		)
	}, [data, search])

	return (
		<div className='p-6 space-y-6'>
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
				<h1 className='text-2xl font-semibold tracking-tight'>Uzel turlari</h1>
				<div className='flex space-x-1'>
					<div className='relative w-full sm:w-64'>
						<Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							placeholder='Uzel turi bo‘yicha qidirish...'
							value={search}
							onChange={e => setSearch(e.target.value)}
							className='pl-8'
						/>
					</div>
					<Button className='cursor-pointer' onClick={() => setOpen(true)}>
						+ Yangi uzel turi
					</Button>
				</div>
			</div>

			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{uzeltypelar.length > 0 ? (
					uzeltypelar.map(item => (
						<Card
							key={item._id}
							className=' transition hover:shadow-md hover:-translate-y-1 duration-200'
						>
							<CardHeader>
								<CardTitle className='flex justify-between items-center'>
									<span>{item.nomi}</span>
									<Wrench
										className='w-5 h-5 text-muted-foreground cursor-pointer'
										onClick={() => router.push(`/uzel/${item.nomi}`)}
									/>
								</CardTitle>
								<p className='text-sm text-muted-foreground'>
									{item.description}
								</p>
							</CardHeader>

							<CardContent className='space-y-3'>
								<p className='text-sm text-muted-foreground'>
									Ta’mir davri: <b>{item.korikmuddat} oy</b>
								</p>

								<div className='flex justify-between items-center'>
									<span className='text-sm'>Umumiy uzellar:</span>
									<span className='font-semibold'>{item.uzellarsoni}</span>
								</div>

								<div className='flex justify-between gap-2'>
									<span>
										{' '}
										Yaxshi-
										<Badge className='bg-blue-500 text-white hover:bg-blue-600'>
											{item.tamiriyaxshi} ta
										</Badge>
									</span>
									<span>
										Oz qoldi-
										<Badge className='bg-yellow-400 text-black hover:bg-yellow-500'>
											{item.tamirgaozqoldisoni} ta
										</Badge>
									</span>
									<span>
										Vaqt otgan-
										<Badge className='bg-red-500 text-white hover:bg-red-600'>
											{item.tamirdavriotgansoni} ta
										</Badge>
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<Button
										className='cursor-pointer'
										onClick={() => {
											setSelectedUzeltype(item)
											setEditOpen(true)
										}}
									>
										<SquarePen />
									</Button>
									<Button
										className='cursor-pointer'
										variant='destructive'
										onClick={() => {
											setSelectedUzeltype(item)
											setDeleteOpen(true)
										}}
									>
										<Trash2 />
									</Button>
								</div>
							</CardContent>
						</Card>
					))
				) : (
					<p className='text-center text-muted-foreground col-span-full'>
						Hech qanday natija topilmadi 😕
					</p>
				)}
			</div>
			<AddUzeltypeModal open={open} onClose={() => setOpen(false)} />
			<EditUzeltypeModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				selectedUzeltype={selectedUzeltype}
			/>
			<DeleteUzeltypeModal
				open={deleteOpen}
				onClose={() => setDeleteOpen(false)}
				selected={selectedUzeltype}
			/>
		</div>
	)
}

// 'use client'

// import { Badge } from '@/components/ui/badge'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Wrench } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { useEffect, useMemo, useState } from 'react'

// // 🔹 Turlar
// interface UzelType {
// 	id: string
// 	nomi: string
// 	description: string
// 	tamirdavri: number // oy hisobida
// }

// interface Uzel {
// 	id: string
// 	nomi: string
// 	raqami: string
// 	holati: string
// 	sex: string
// 	lokomotiv: string
// 	sana: string // oxirgi ta’mir sanasi
// }

// export default function UzellarPage() {
// 	const router = useRouter()
// 	const [uzelTypes, setUzelTypes] = useState<UzelType[]>([])
// 	const [uzellar, setUzel] = useState<Uzel[]>([])

// 	useEffect(() => {
// 		// 🔹 Fake ma’lumotlar (keyin Firestore bilan ulaymiz)
// 		setUzelTypes([
// 			{
// 				id: '1',
// 				nomi: 'Nasos',
// 				description: 'Suv nasosi tizimi',
// 				tamirdavri: 6,
// 			},
// 			{
// 				id: '2',
// 				nomi: 'Generator',
// 				description: 'Elektr energiya tizimi',
// 				tamirdavri: 12,
// 			},
// 			{
// 				id: '3',
// 				nomi: 'Kompressor',
// 				description: 'Bosim ushlab turuvchi tizim',
// 				tamirdavri: 3,
// 			},
// 		])

// 		setUzel([
// 			{
// 				id: 'u1',
// 				nomi: 'Nasos',
// 				raqami: 'N-01',
// 				holati: 'Ish holatida',
// 				sex: 'Sex-1',
// 				lokomotiv: 'Lok-1',
// 				sana: '2025-02-10',
// 			},
// 			{
// 				id: 'u2',
// 				nomi: 'Nasos',
// 				raqami: 'N-02',
// 				holati: 'Ta’mirda',
// 				sex: 'Sex-1',
// 				lokomotiv: '',
// 				sana: '2025-07-20',
// 			},
// 			{
// 				id: 'u3',
// 				nomi: 'Generator',
// 				raqami: 'G-01',
// 				holati: 'Ish holatida',
// 				sex: '',
// 				lokomotiv: 'Lok-3',
// 				sana: '2024-11-10',
// 			},
// 			{
// 				id: 'u4',
// 				nomi: 'Kompressor',
// 				raqami: 'K-01',
// 				holati: 'Zaxirada',
// 				sex: 'Sex-3',
// 				lokomotiv: '',
// 				sana: '2025-09-01',
// 			},
// 			{
// 				id: 'u5',
// 				nomi: 'Kompressor',
// 				raqami: 'K-02',
// 				holati: 'Ish holatida',
// 				sex: 'Sex-2',
// 				lokomotiv: 'Lok-2',
// 				sana: '2025-04-10',
// 			},
// 		])
// 	}, [])

// 	// 🔹 Har bir tur uchun ta’mir statistikasi
// 	const data = useMemo(() => {
// 		const today = new Date()

// 		return uzelTypes.map(type => {
// 			const related = uzellar.filter(u => u.nomi === type.nomi)

// 			let blue = 0 // 7 kundan ko‘p qolgani
// 			let yellow = 0 // 7 kundan kam qolgani
// 			let red = 0 // muddati o‘tgan

// 			related.forEach(u => {
// 				const lastRepair = new Date(u.sana)
// 				const tamirDavriDays = type.tamirdavri * 30
// 				const diffDays = Math.floor(
// 					(today.getTime() - lastRepair.getTime()) / (1000 * 60 * 60 * 24)
// 				)
// 				const remaining = tamirDavriDays - diffDays

// 				if (remaining > 7) blue++
// 				else if (remaining > 0 && remaining <= 7) yellow++
// 				else if (remaining <= 0) red++
// 			})

// 			return {
// 				...type,
// 				total: related.length,
// 				blue,
// 				yellow,
// 				red,
// 			}
// 		})
// 	}, [uzelTypes, uzellar])

// 	return (
// 		<div className='p-6 space-y-6'>
// 			<h1 className='text-2xl font-semibold tracking-tight'>Uzel turlari</h1>

// 			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
// 				{data.map(item => (
// 					<Card
// 						key={item.id}
// 						onClick={() => router.push(`/uzellar/${item.id}`)}
// 						className='cursor-pointer transition hover:shadow-md hover:-translate-y-1 duration-200'
// 					>
// 						<CardHeader>
// 							<CardTitle className='flex justify-between items-center'>
// 								<span>{item.nomi}</span>
// 								<Wrench className='w-5 h-5 text-muted-foreground' />
// 							</CardTitle>
// 							<p className='text-sm text-muted-foreground'>
// 								{item.description}
// 							</p>
// 						</CardHeader>

// 						<CardContent className='space-y-3'>
// 							<p className='text-sm text-muted-foreground'>
// 								Ta’mir davri: <b>{item.tamirdavri} oy</b>
// 							</p>

// 							<div className='flex justify-between items-center'>
// 								<span className='text-sm'>Umumiy uzellar:</span>
// 								<span className='font-semibold'>{item.total}</span>
// 							</div>

// 							<div className='flex justify-between gap-2'>
// 								<Badge className='bg-blue-500 text-white hover:bg-blue-600'>
// 									{item.blue} ta
// 								</Badge>
// 								<Badge className='bg-yellow-400 text-black hover:bg-yellow-500'>
// 									{item.yellow} ta
// 								</Badge>
// 								<Badge className='bg-red-500 text-white hover:bg-red-600'>
// 									{item.red} ta
// 								</Badge>
// 							</div>
// 						</CardContent>
// 					</Card>
// 				))}
// 			</div>
// 		</div>
// 	)
// }
