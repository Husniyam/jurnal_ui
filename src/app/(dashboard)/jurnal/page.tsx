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
interface Jurnal {
	id: string
	lokomotiv: string
	yechilganuzel: string
	yechganxodim: string
	tamirturi: string
	status: 'Yangi' | 'Jarayonda' | 'Yakunlangan'
	yechgansana: string
	qoyganxodim?: string
	qoyilganuzel?: string
	qoyilgansana?: string
}

// --- KOMPONENT ---
export default function JurnalPage() {
	const [jurnallar, setJurnallar] = useState<Jurnal[]>([])
	const [filtered, setFiltered] = useState<Jurnal[]>([])
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState('')

	useEffect(() => {
		// FAKE DATA
		const data: Jurnal[] = [
			{
				id: '1',
				lokomotiv: 'TE33A - Z123',
				yechilganuzel: 'Generator',
				yechganxodim: 'Aliyev D.',
				tamirturi: 'Kapital',
				status: 'Yangi',
				yechgansana: '2025-10-02',
			},
			{
				id: '2',
				lokomotiv: 'UZTE16M - Z456',
				yechilganuzel: 'Transformator',
				yechganxodim: 'Karimov R.',
				tamirturi: 'Joriy',
				status: 'Jarayonda',
				yechgansana: '2025-09-28',
				qoyganxodim: 'Saidov B.',
				qoyilganuzel: 'Transformator-2',
				qoyilgansana: '2025-10-05',
			},
			{
				id: '3',
				lokomotiv: 'TE33A - Z789',
				yechilganuzel: 'Kompresor',
				yechganxodim: 'Rahimova N.',
				tamirturi: 'Kapital',
				status: 'Yakunlangan',
				yechgansana: '2025-08-15',
				qoyganxodim: 'Aliyev D.',
				qoyilganuzel: 'Kompresor-1',
				qoyilgansana: '2025-09-01',
			},
		]
		setJurnallar(data)
		setFiltered(data)
	}, [])

	// FILTER & SEARCH
	useEffect(() => {
		let result = jurnallar.filter(
			j =>
				j.lokomotiv.toLowerCase().includes(search.toLowerCase()) ||
				j.yechilganuzel.toLowerCase().includes(search.toLowerCase()) ||
				j.yechganxodim.toLowerCase().includes(search.toLowerCase())
		)
		if (statusFilter) {
			result = result.filter(j => j.status === statusFilter)
		}
		setFiltered(result)
	}, [search, statusFilter, jurnallar])

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'Yangi':
				return <Badge variant='default'>Yangi</Badge>
			case 'Jarayonda':
				return <Badge variant='secondary'>Jarayonda</Badge>
			case 'Yakunlangan':
				return <Badge variant='outline'>Yakunlangan</Badge>
			default:
				return <Badge variant='outline'>—</Badge>
		}
	}

	return (
		<div className='p-6 space-y-6'>
			{/* FILTERS */}
			<div className='flex flex-col sm:flex-row justify-between items-center gap-3'>
				<div className='flex items-center gap-3 w-full sm:w-auto'>
					<Input
						placeholder='Qidiruv (lokomotiv, xodim, uzel...)'
						value={search}
						onChange={e => setSearch(e.target.value)}
						className='max-w-xs'
					/>
					<Select value={statusFilter} onValueChange={setStatusFilter}>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Status bo‘yicha filter' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='barchasi'>Barchasi</SelectItem>
							<SelectItem value='Yangi'>Yangi</SelectItem>
							<SelectItem value='Jarayonda'>Jarayonda</SelectItem>
							<SelectItem value='Yakunlangan'>Yakunlangan</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Button className='flex items-center gap-2'>
					<Plus className='h-4 w-4' />
					Yangi jurnal
				</Button>
			</div>

			{/* TABLE */}
			<Card className=''>
				<CardHeader>
					<CardTitle>Jurnallar ro‘yxati</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='overflow-x-auto'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>T/r</TableHead>
									<TableHead>Lokomotiv</TableHead>
									<TableHead>Yechilgan uzel</TableHead>
									<TableHead>Yechgan xodim</TableHead>
									<TableHead>Yechilgan sana</TableHead>
									<TableHead>Ta’mir turi</TableHead>
									<TableHead>Qo‘yilgan uzel</TableHead>
									<TableHead>Qo‘ygan xodim</TableHead>
									<TableHead>Qo‘yilgan sana</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filtered.map((j, i) => (
									<TableRow key={j.id}>
										<TableCell>{i + 1}</TableCell>
										<TableCell>{j.lokomotiv}</TableCell>
										<TableCell>{j.yechilganuzel}</TableCell>
										<TableCell>{j.yechganxodim}</TableCell>
										<TableCell>{j.yechgansana}</TableCell>
										<TableCell>{j.tamirturi}</TableCell>
										<TableCell>{j.qoyilganuzel || '—'}</TableCell>
										<TableCell>{j.qoyganxodim || '—'}</TableCell>
										<TableCell>{j.qoyilgansana || '—'}</TableCell>
										<TableCell>{getStatusBadge(j.status)}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
