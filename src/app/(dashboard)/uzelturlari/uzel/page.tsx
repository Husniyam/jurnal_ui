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
import { useLokomotivlar } from '@/hooks/useLokomotiv'
import { useSexlar } from '@/hooks/useSex'
import { useUzellar } from '@/hooks/useUzel'
import { Uzel } from '@/types/uzel'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import AddUzelModal from './components/AddUzelModal'

// --- KOMPONENT ---
export default function UzelPage() {
	const [filtered, setFiltered] = useState<Uzel[]>([])
	const [search, setSearch] = useState('')
	const [open, setOpen] = useState(false)
	const [holatFilter, setHolatFilter] = useState('')
	const { data: uzellar = [] } = useUzellar()
	const { data: lokomotivlar = [] } = useLokomotivlar()
	const { data: sexlar = [] } = useSexlar()

	// --- FILTERS ---
	useEffect(() => {
		let result = uzellar.filter(
			u =>
				u.uzeltype.nomi.toLowerCase().includes(search.toLowerCase()) ||
				u.raqami.toLowerCase().includes(search.toLowerCase())
		)
		if (holatFilter && holatFilter !== 'Barchasi') {
			result = result.filter(u => u.holati === holatFilter)
		}
		setFiltered(result)
	}, [search, holatFilter, uzellar])

	// --- JOY FUNKSIYASI ---
	const getJoy = (uzel: Uzel) => {
		if (uzel.holati === 'Ish holatida' && uzel.lokomotiv) {
			const loko = lokomotivlar.find(l => l._id === uzel.lokomotiv._id)
			return loko ? `${loko.nomi} (${loko.zavodRaqami})` : '—'
		} else if (uzel.sex) {
			const sex = sexlar.find(s => s._id === uzel.sex._id)
			return sex ? sex.nomi : '—'
		}
		return '—'
	}

	// --- QOLGAN KUNLAR HISOBI ---
	const getQolganKun = (uzel: Uzel) => {
		const oxirgiTamir = new Date(uzel.sana)
		const bugun = new Date()
		const tamirMuddat = +uzel.uzeltype.korikmuddat * 30 // oy → kun
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
							<SelectItem value='Ish holatida'>Ish holatida</SelectItem>
							<SelectItem value='sexda'>Sexda</SelectItem>
							<SelectItem value='Tamirda'>Ta’mirda</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Button
					className='flex items-center gap-2 cursor-pointer'
					onClick={() => setOpen(!open)}
				>
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
								{filtered.length ? (
									filtered.map((u, i) => {
										const qolgan = getQolganKun(u)
										return (
											<TableRow key={u._id}>
												<TableCell>{i + 1}</TableCell>
												<TableCell>{u.uzeltype.nomi}</TableCell>
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
												<TableCell>
													{u.sana ? new Date(u.sana).toLocaleDateString() : '-'}
												</TableCell>
												<TableCell>
													<Badge variant={getBadgeVariant(qolgan)}>
														{qolgan > 0
															? `${qolgan} kun qoldi`
															: `${Math.abs(qolgan)} kun o‘tgan`}
													</Badge>
												</TableCell>
											</TableRow>
										)
									})
								) : (
									<TableRow>
										<TableCell colSpan={7} className='text-center py-4'>
											Hech qanday natija topilmadi 😕
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
			<AddUzelModal open={open} onClose={() => setOpen(false)} />
		</div>
	)
}
