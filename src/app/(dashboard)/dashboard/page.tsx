'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useJurnallar } from '@/hooks/useJurnal'
import { useLokomotivlar } from '@/hooks/useLokomotiv'
import { useSexlar } from '@/hooks/useSex'
import { useUzellar } from '@/hooks/useUzel'
import { useXodimlar } from '@/hooks/useXodim'
import { Sex } from '@/types/sex'
import { Uzel } from '@/types/uzel'
import { motion } from 'framer-motion'
import { Building2, TrainFront, Users, Wrench } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useMemo } from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip as ReTooltip,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

/**
 * Fake data — keyinchalik API bilan almashtirish oson bo‘lsin uchun oddiy struktura.
 */

// Uzel holatlari pie uchun
const fakeUzelStatus = [
	{ name: 'Ish holatida', value: 0 },
	{ name: 'Tamirda', value: 0 },
	{ name: 'Nosoz', value: 0 },
]

// Sexlar bo‘yicha uzellar (bar chart)
const fakeSexUzel = [
	{ name: 'Sex-1', value: 0 },
	{ name: 'Sex-2', value: 90 },
	{ name: 'Sex-3', value: 60 },
	{ name: 'Sex-4', value: 48 },
	{ name: 'Sex-5', value: 80 },
]

// So‘nggi jurnallar (latest)
const fakeJurnallar = [
	{
		lokomotiv: 'TE33A - Z123',
		uzel: 'Generator',
		xodim: 'Rustam I.',
		sana: '2025-10-12',
		status: 'Yakunlangan',
	},
	{
		lokomotiv: 'UZTE16M - Z456',
		uzel: 'Kompresor',
		xodim: 'Aliyev D.',
		sana: '2025-10-10',
		status: 'Jarayonda',
	},
	{
		lokomotiv: 'TE33A - Z789',
		uzel: 'Transformator',
		xodim: 'Karimov R.',
		sana: '2025-10-08',
		status: 'Yangi',
	},
	{
		lokomotiv: 'UZTE16M - Z111',
		uzel: 'Nasos',
		xodim: 'Soliyev B.',
		sana: '2025-10-07',
		status: 'Yakunlangan',
	},
	{
		lokomotiv: 'TE33A - Z321',
		uzel: 'Kondensor',
		xodim: 'Rahimova N.',
		sana: '2025-10-05',
		status: 'Jarayonda',
	},
]

// ranglar
const PIE_COLORS = ['#3b82f6', '#10b981', '#f97316', '#f10']

export default function DashboardPage() {
	const { data: xodimlar = [], isLoading: loadingxodim } = useXodimlar()
	const { data: sexlar = [], isLoading: loadingsex } = useSexlar()
	const { data: lokomotivlar = [], isLoading: loadinglokomotiv } =
		useLokomotivlar()
	const { data: uzellar = [], isLoading: loadinguzel } = useUzellar()
	const { data: jurnallar = [], isLoading: loadingjurnal } = useJurnallar()
	// Pie legend data tayyorlash (recharts tooltip ishlashi uchun)

	function countUzelStatus(uzel: Uzel[]) {
		const result = fakeUzelStatus.map(item => {
			const count = uzel.filter(u => u.holati === item.name).length
			return { ...item, value: count }
		})
		return result
	}

	function countUzelBySex(uzel: Uzel[], sexlar: Sex[]) {
		return sexlar.map(sex => {
			const count = uzel.filter(
				u => u.sex._id === sex._id && u.holati !== 'Ish holatida'
			).length
			return { name: sex.nomi, value: count }
		})
	}

	const barData = useMemo(() => fakeSexUzel, [])

	const stats = [
		{
			title: 'Xodimlar',
			value: loadingxodim ? <Badge>loading...</Badge> : xodimlar.length,
			icon: <Users className='w-6 h-6' />,
			url: 'xodim',
		},
		{
			title: 'Sexlar',
			value: loadingsex ? <Badge>loading...</Badge> : sexlar.length,
			icon: <Building2 className='w-6 h-6' />,
			url: 'sex',
		},
		{
			title: 'Lokomotivlar',
			value: loadinglokomotiv ? <Badge>loading...</Badge> : lokomotivlar.length,
			icon: <TrainFront className='w-6 h-6' />,
			url: 'lokomotiv',
		},
		{
			title: 'Uzellar',
			value: loadinguzel ? <Badge>loading...</Badge> : uzellar.length,
			icon: <Wrench className='w-6 h-6' />,
			url: 'uzelturlari/uzel',
		},
	]

	return (
		<div className='p-6 space-y-6'>
			<div className='grid items-center justify-between gap-4'>
				<div>
					<h1 className='text-3xl font-bold'>Dashboard</h1>
					<p className='text-sm text-muted-foreground mt-1'>Tizim holati</p>
				</div>

				{/* qidiruv va quick action */}
				<div className='flex items-center gap-3'>
					<Input
						placeholder='Qidiruv (jurnal, jihoz, lokomotiv)...'
						className='w-72'
					/>
					<Button>Yuklash</Button>
				</div>
			</div>

			{/* Statistik cardlar */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				{stats.map((s, i) => (
					<motion.div
						key={s.title}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.08 }}
					>
						<Card className='overflow-hidden'>
							<Link href={s.url}>
								<CardContent className='flex items-center justify-between gap-4'>
									<div>
										<p className='text-sm text-muted-foreground'>{s.title}</p>
										<p className='text-2xl font-semibold'>{s.value}</p>
									</div>
									<div className='grid place-items-center w-12 h-12 rounded-lg bg-muted/40'>
										{s.icon}
									</div>
								</CardContent>
							</Link>
						</Card>
					</motion.div>
				))}
			</div>

			{/* Charts */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
				<Card>
					<CardHeader>
						<CardTitle>Uzel holati</CardTitle>
					</CardHeader>
					<CardContent>
						<div style={{ width: '100%', height: 300 }}>
							<ResponsiveContainer width='100%' height='100%'>
								<PieChart>
									<Pie
										data={uzellar ? countUzelStatus(uzellar) : fakeUzelStatus}
										dataKey='value'
										nameKey='name'
										cx='50%'
										cy='50%'
										outerRadius={90}
										label
									>
										{fakeUzelStatus.map((entry, idx) => (
											<Cell
												key={idx}
												fill={PIE_COLORS[idx % PIE_COLORS.length]}
											/>
										))}
									</Pie>
									<ReTooltip />
								</PieChart>
							</ResponsiveContainer>

							{/* legend */}
							<div className='flex gap-4  justify-center'>
								{countUzelStatus(uzellar).map((p, i) => (
									<div key={p.name} className='flex items-center gap-2 text-sm'>
										<span
											className='w-3 h-3 rounded-full'
											style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
										/>
										<span className='text-muted-foreground'>{p.name}</span>
										<span className='font-medium ml-1'>{p.value}</span>
									</div>
								))}
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Sexlar bo‘yicha uzellar</CardTitle>
					</CardHeader>
					<CardContent>
						<div style={{ width: '100%', height: 300 }}>
							<ResponsiveContainer width='100%' height='100%'>
								<BarChart
									data={
										sexlar || uzellar
											? countUzelBySex(uzellar, sexlar)
											: barData
									}
									margin={{ top: 10, right: 16, left: -16, bottom: 5 }}
								>
									<CartesianGrid strokeDasharray='3 3' opacity={0.2} />
									<XAxis dataKey='name' />
									<YAxis />
									<Tooltip />
									<Bar dataKey='value' radius={[6, 6, 0, 0]} fill='#3b82f6' />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Latest jurnal table */}
			<Card>
				<CardHeader className='flex items-center justify-between'>
					<CardTitle>So‘nggi jurnallar</CardTitle>
					<div className='flex items-center gap-2'>
						<Badge className='bg-green-500 text-white'>Oxirgi 5</Badge>
						<Button
							variant='ghost'
							size='sm'
							onClick={() => redirect('/jurnal')}
						>
							Barchasini ko‘rish
						</Button>
					</div>
				</CardHeader>

				<CardContent>
					<div className='overflow-x-auto'>
						{!loadingjurnal ? (
							<table className='w-full text-sm overflow-auto'>
								<thead className='text-left text-xs text-muted-foreground'>
									<tr>
										<th className='py-2'>T/r</th>
										<th className='py-2'>Sana</th>
										<th className='py-2'>Lokomotiv</th>
										<th className='py-2'>Yechilgan uzel</th>
										<th className='py-2'>Yechgan xodim</th>
										<th className='py-2'>Tamir turi</th>
										<th className='py-2'>Qoyilgan uzel</th>
										<th className='py-2'>Qoygan xodim</th>
										<th className='py-2'>Status</th>
									</tr>
								</thead>
								<tbody>
									{jurnallar.slice(-5).map((j, i) => (
										<tr key={i} className='border-t group hover:bg-muted/50'>
											<td className='py-3'>{i + 1}</td>
											<td className='py-3'>
												{j.yechilganSana.toLocaleString().slice(0, 10)}
											</td>
											<td className='py-3'>
												{j.lokomotiv.nomi}-{j.lokomotiv.zavodRaqami}
											</td>
											<td className='py-3'>
												{j.yechilganuzel.uzeltype.nomi}-{j.yechilganuzel.raqami}
											</td>
											<td className='py-3'>
												{j.yechganXodim.ism} {j.yechganXodim.familiya}
											</td>
											<td className='py-3'>{j.tamirTuri}</td>
											<td className='py-3'>
												{j.qoyilganuzel.uzeltype.nomi}-{j.qoyilganuzel.raqami}
											</td>
											<td className='py-3'>
												{j.qoyganXodim.ism} {j.qoyganXodim.familiya}
											</td>
											<td className='py-3'>{j.status}</td>
											<td className='py-3'>
												<Badge
													className={`${
														j.status === 'Ish holatida'
															? 'bg-green-500 text-white'
															: j.status === 'Tamirda'
															? 'bg-yellow-400 text-black'
															: 'bg-blue-500 text-white'
													}`}
												>
													{j.status}
												</Badge>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<Badge>Loading...</Badge>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
