'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useLokomotivlar } from '@/hooks/useLokomotiv'
import { Lokomotiv } from '@/types/lokomotiv'
import { Search, Settings, SquarePen, Train, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import AddLokomotivModal from './components/AddLokomotivModal'
import DeleteLokomotivModal from './components/DeleteLokomotivModal'
import EditLokomotivModal from './components/EditLokomotivModal'

// 🔹 Ma'lumot turlari
// interface Lokomotiv {
// 	_id: string
// 	nomi: string
// 	zavodRaqami: string
// 	turi: string
// }

interface Uzel {
	id: string
	lokomotivId: string
	status: string // "Ish holatida", "Ta'mirda", "Zaxirada"
}

export default function LokomotivlarPage() {
	// const [lokomotivlar, setLokomotivlar] = useState<Lokomotiv[]>([])
	const [uzellar, setUzel] = useState<Uzel[]>([])
	const [search, setSearch] = useState('')
	const [filterTuri, setFilterTuri] = useState('barchasi')

	const [open, setOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [deleteOpen, setDeleteOpen] = useState(false)
	const [selectedLokomotiv, setSelectedLokomotiv] = useState<Lokomotiv>()
	const { data: lokomotivlar = [] } = useLokomotivlar()
	// const {data: uzellar=[]}=()

	useEffect(() => {
		// 🔹 Fake data (keyin backend bilan ulaymiz)
		// setLokomotivlar([
		// 	{ id: '1', nomi: 'O‘zbekiston-1', zavodRaqami: 'UZ-001', turi: 'Elektr' },
		// 	{ id: '2', nomi: 'O‘zbekiston-2', zavodRaqami: 'UZ-002', turi: 'Dizel' },
		// 	{ id: '3', nomi: 'Toshkent-1', zavodRaqami: 'T-011', turi: 'Elektr' },
		// 	{ id: '4', nomi: 'Samarqand-5', zavodRaqami: 'S-501', turi: 'Dizel' },
		// ])

		setUzel([
			{ id: 'u1', lokomotivId: '1', status: 'Ish holatida' },
			{ id: 'u2', lokomotivId: '1', status: 'Ta’mirda' },
			{ id: 'u3', lokomotivId: '2', status: 'Ish holatida' },
			{ id: 'u4', lokomotivId: '2', status: 'Ish holatida' },
			{ id: 'u5', lokomotivId: '3', status: 'Zaxirada' },
			{ id: 'u6', lokomotivId: '3', status: 'Ish holatida' },
			{ id: 'u7', lokomotivId: '4', status: 'Ish holatida' },
			{ id: 'u8', lokomotivId: '4', status: 'Ta’mirda' },
		])
	}, [])

	// 🔹 Har bir lokomotiv uchun ish holatidagi uzellar soni
	const lokData = useMemo(() => {
		return lokomotivlar.map(lok => {
			const activeUzelCount = uzellar.filter(
				u => u.lokomotivId === lok._id && u.status === 'Ish holatida'
			).length
			return { ...lok, activeUzelCount }
		})
	}, [lokomotivlar, uzellar])

	// 🔹 Qidiruv va filter asosida natijani hisoblash
	const filteredData = useMemo(() => {
		return lokData.filter(lok => {
			const matchesSearch =
				lok.nomi.toLowerCase().includes(search.toLowerCase()) ||
				lok.zavodRaqami.toLowerCase().includes(search.toLowerCase())

			const matchesFilter =
				filterTuri === 'barchasi' ? true : lok.turi === filterTuri

			return matchesSearch && matchesFilter
		})
	}, [lokData, search, filterTuri])

	return (
		<div className='p-6 space-y-6'>
			<h1 className='text-2xl font-semibold tracking-tight'>Lokomotivlar</h1>

			{/* 🔍 Qidiruv va filter */}
			<div className='flex flex-col sm:flex-row gap-4 items-center'>
				<div className='relative w-full sm:w-1/2'>
					<Search className='absolute left-3 top-2.5 w-4 h-4 text-muted-foreground' />
					<Input
						placeholder='Nomi yoki zavod raqami bo‘yicha qidirish...'
						value={search}
						onChange={e => setSearch(e.target.value)}
						className='pl-9'
					/>
				</div>

				<Select value={filterTuri} onValueChange={setFilterTuri}>
					<SelectTrigger className='w-full sm:w-[200px]'>
						<SelectValue placeholder='Turi bo‘yicha filter' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='barchasi'>Barchasi</SelectItem>
						<SelectItem value='Elektr'>Elektr</SelectItem>
						<SelectItem value='Dizel'>Dizel</SelectItem>
					</SelectContent>
				</Select>
				<Button className='cursor-pointer' onClick={() => setOpen(true)}>
					+ Yangi lokomotiv
				</Button>
			</div>

			{/* 🚂 Lokomotiv cardlari */}
			{filteredData.length > 0 ? (
				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
					{filteredData.map(lok => (
						<Card
							key={lok._id}
							className='transition hover:shadow-md hover:-translate-y-1 duration-200'
						>
							<CardHeader>
								<CardTitle className='flex justify-between items-center'>
									<span>
										{lok.nomi}-{lok.zavodRaqami}
									</span>
									<Train className='w-5 h-5 text-muted-foreground' />
								</CardTitle>
								<p className='text-sm text-muted-foreground'>
									{lok.turi} — Yil: <b>{lok.ishlabChiqarilganYil}</b>
								</p>
							</CardHeader>
							<CardContent className='space-y-2'>
								<div className='flex justify-between items-center'>
									<span className='text-sm text-muted-foreground flex items-center gap-1'>
										<Settings className='w-4 h-4' /> Ish holatidagi uzellar:
									</span>
									<span className='font-semibold'>{lok.activeUzelCount}</span>
								</div>
								<div className='flex justify-between items-center'>
									<Button
										className='cursor-pointer'
										onClick={() => {
											setSelectedLokomotiv(lok)
											setEditOpen(true)
										}}
									>
										<SquarePen />
									</Button>
									<Button
										className='cursor-pointer'
										variant='destructive'
										onClick={() => {
											setSelectedLokomotiv(lok)
											setDeleteOpen(true)
										}}
									>
										<Trash2 />
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<p className='text-center text-muted-foreground mt-10'>
					Hech qanday lokomotiv topilmadi 😕
				</p>
			)}

			<AddLokomotivModal open={open} onClose={() => setOpen(false)} />
			<EditLokomotivModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				selectedLokomotiv={selectedLokomotiv}
			/>
			<DeleteLokomotivModal
				open={deleteOpen}
				onClose={() => setDeleteOpen(false)}
				selected={selectedLokomotiv}
			/>
		</div>
	)
}
