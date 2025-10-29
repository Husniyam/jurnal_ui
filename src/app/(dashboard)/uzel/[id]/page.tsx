'use client'

import { Badge } from '@/components/ui/badge'
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

// --- TYPES ---
interface Uzel {
	id: string
	nomi: string
	raqami: string
	holati: string
	sexId?: string
	lokomotivId?: string
	sana: string // oxirgi ta’mir sanasi
	tamirDavri: number // oy hisobida
}

interface Sex {
	id: string
	nomi: string
}

interface Lokomotiv {
	id: string
	nomi: string
	zavodRaqami: string
}

// --- KOMPONENT ---
export default function UzelPage() {
	const [uzellar, setUzellar] = useState<Uzel[]>([])
	const [filtered, setFiltered] = useState<Uzel[]>([])
	const [sexlar, setSexlar] = useState<Sex[]>([])
	const [lokomotivlar, setLokomotivlar] = useState<Lokomotiv[]>([])
	const [search, setSearch] = useState('')
	const [holatFilter, setHolatFilter] = useState('')

	// --- FAKE DATA ---
	useEffect(() => {
		const uzelData: Uzel[] = [
			{
				id: '1',
				nomi: 'Generator',
				raqami: 'U001',
				holati: 'ish holatida',
				lokomotivId: 'L1',
				sana: '2025-09-15',
				tamirDavri: 2,
			},
			{
				id: '2',
				nomi: 'Kompresor',
				raqami: 'U002',
				holati: 'sexda',
				sexId: 'S1',
				sana: '2025-08-20',
				tamirDavri: 1,
			},
			{
				id: '3',
				nomi: 'Transformator',
				raqami: 'U003',
				holati: 'ish holatida',
				lokomotivId: 'L2',
				sana: '2025-10-01',
				tamirDavri: 3,
			},
		]

		const sexData: Sex[] = [
			{ id: 'S1', nomi: '1-seksiya' },
			{ id: 'S2', nomi: '2-seksiya' },
		]

		const lokoData: Lokomotiv[] = [
			{ id: 'L1', nomi: 'TE33A', zavodRaqami: 'Z123' },
			{ id: 'L2', nomi: 'UZTE16M', zavodRaqami: 'Z456' },
		]

		setUzellar(uzelData)
		setFiltered(uzelData)
		setSexlar(sexData)
		setLokomotivlar(lokoData)
	}, [])

	// --- FILTERS ---
	useEffect(() => {
		let result = uzellar.filter(
			u =>
				u.nomi.toLowerCase().includes(search.toLowerCase()) ||
				u.raqami.toLowerCase().includes(search.toLowerCase())
		)
		if (holatFilter) {
			holatFilter !== 'barchasi'
				? (result = result.filter(u => u.holati === holatFilter))
				: (result = result)
		}
		setFiltered(result)
	}, [search, holatFilter, uzellar])

	// --- JOY FUNKSIYASI ---
	const getJoy = (uzel: Uzel) => {
		if (uzel.holati === 'ish holatida' && uzel.lokomotivId) {
			const loko = lokomotivlar.find(l => l.id === uzel.lokomotivId)
			return loko ? `${loko.nomi} (${loko.zavodRaqami})` : '—'
		} else if (uzel.sexId) {
			const sex = sexlar.find(s => s.id === uzel.sexId)
			return sex ? sex.nomi : '—'
		}
		return '—'
	}

	// --- QOLGAN KUNLAR HISOBI ---
	const getQolganKun = (uzel: Uzel) => {
		const oxirgiTamir = new Date(uzel.sana)
		const bugun = new Date()
		const tamirMuddat = uzel.tamirDavri * 30 // oy → kun
		const farq = Math.floor(
			(bugun.getTime() - oxirgiTamir.getTime()) / (1000 * 60 * 60 * 24)
		)
		return tamirMuddat - farq
	}

	const getBadgeVariant = (days: number) => {
		if (days > 7) return 'default'
		if (days > 0) return 'secondary'
		return 'destructive'
	}

	return (
		<div className='p-6 space-y-6'>
			{/* QIDIRUV VA FILTER */}
			<div className='flex flex-col sm:flex-row justify-between items-center gap-3'>
				<div className='flex items-center gap-3 w-full sm:w-auto'>
					<Input
						placeholder='Qidiruv (nomi yoki raqami bo‘yicha)...'
						value={search}
						onChange={e => setSearch(e.target.value)}
						className='max-w-xs'
					/>
					<Select value={holatFilter} onValueChange={setHolatFilter}>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Holat bo‘yicha filter' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='barchasi'>Barchasi</SelectItem>
							<SelectItem value='ish holatida'>Ish holatida</SelectItem>
							<SelectItem value='sexda'>Sexda</SelectItem>
							<SelectItem value='ta’mirda'>Ta’mirda</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Button className='flex items-center gap-2'>
					<Plus className='h-4 w-4' />
					Qo‘shish
				</Button>
			</div>

			{/* TABLE */}
			<Card className='overflow-hidden'>
				<CardHeader>
					<CardTitle>Uzel ro‘yxati</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='overflow-x-auto'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>T/r</TableHead>
									<TableHead>Nomi</TableHead>
									<TableHead>Raqami</TableHead>
									<TableHead>Holati</TableHead>
									<TableHead>Joyi</TableHead>
									<TableHead>Oxirgi ta’mir sanasi</TableHead>
									<TableHead>Qolgan kun</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filtered.map((u, i) => {
									const qolgan = getQolganKun(u)
									return (
										<TableRow key={u.id}>
											<TableCell>{i + 1}</TableCell>
											<TableCell>{u.nomi}</TableCell>
											<TableCell>{u.raqami}</TableCell>
											<TableCell>
												<Badge
													variant={
														u.holati === 'ish holatida'
															? 'default'
															: u.holati === 'sexda'
															? 'secondary'
															: 'destructive'
													}
												>
													{u.holati}
												</Badge>
											</TableCell>
											<TableCell>{getJoy(u)}</TableCell>
											<TableCell>{u.sana}</TableCell>
											<TableCell>
												<Badge variant={getBadgeVariant(qolgan)}>
													{qolgan > 0
														? `${qolgan} kun qoldi`
														: `${Math.abs(qolgan)} kun o‘tgan`}
												</Badge>
											</TableCell>
										</TableRow>
									)
								})}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
