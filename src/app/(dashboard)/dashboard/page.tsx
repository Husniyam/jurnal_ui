'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useLokomotivlar } from '@/hooks/useLokomotiv'
import { useSexlar } from '@/hooks/useSex'
import { useUzellar } from '@/hooks/useUzel'
import { useXodimlar } from '@/hooks/useXodim'
import { motion } from 'framer-motion'
import { Building2, TrainFront, Users, Wrench } from 'lucide-react'
import Link from 'next/link'
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
	{ name: 'Sexda', value: 0 },
	{ name: 'Tamirda', value: 0 },
	{ name: 'Nosoz', value: 0 },
]

// Sexlar bo‘yicha uzellar (bar chart)
const fakeSexUzel = [
	{ name: 'Sex-1', value: 120 },
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
	// Pie legend data tayyorlash (recharts tooltip ishlashi uchun)
	const pieData = useMemo(() => fakeUzelStatus, [])
	const barData = useMemo(() => fakeSexUzel, [])
	const journals = useMemo(() => fakeJurnallar, [])
	const { data: xodimlar = [] } = useXodimlar()
	const { data: sexlar = [] } = useSexlar()
	const { data: lokomotivlar = [] } = useLokomotivlar()
	const { data: uzellar = [] } = useUzellar()

	// --- 1️⃣ Status bo‘yicha guruhlash (PieChart)
	// const statusData = Object.values(
	// 	uzellar?.reduce((acc: any, uzel) => {
	// 		const status = uzel.holati || 'Noma’lum'
	// 		if (!acc[status]) acc[status] = { name: status, value: 0 }
	// 		acc[status].value++
	// 		return acc as UzelStatus[]
	// 	}, {})
	// )

	// --- 2️⃣ Sex (joylashuv) bo‘yicha guruhlash (BarChart)
	// const sexData = Object.values(
	// 	uzellar.reduce((acc: any, uzel) => {
	// 		const sex = uzel.sex.nomi || 'Noma’lum'
	// 		if (!acc[sex]) acc[sex] = { sex, soni: 0 }
	// 		acc[sex].soni++
	// 		return acc
	// 	}, {})
	// )

	const stats = [
		{
			title: 'Xodimlar',
			value: xodimlar.length,
			icon: <Users className='w-6 h-6' />,
			url: 'xodim',
		},
		{
			title: 'Sexlar',
			value: sexlar.length,
			icon: <Building2 className='w-6 h-6' />,
			url: 'sex',
		},
		{
			title: 'Lokomotivlar',
			value: lokomotivlar.length,
			icon: <TrainFront className='w-6 h-6' />,
			url: 'lokomotiv',
		},
		{
			title: 'Uzellar',
			value: uzellar.length,
			icon: <Wrench className='w-6 h-6' />,
			url: 'uzelturlari/uzel',
		},
	]

	return (
		<div className='p-6 space-y-6'>
			<div className='flex items-center justify-between gap-4'>
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
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<Card>
					<CardHeader>
						<CardTitle>Uzel holati</CardTitle>
					</CardHeader>
					<CardContent>
						<div style={{ width: '100%', height: 300 }}>
							<ResponsiveContainer width='100%' height='100%'>
								<PieChart>
									<Pie
										data={pieData}
										dataKey='value'
										nameKey='name'
										cx='50%'
										cy='50%'
										outerRadius={90}
										label
									>
										{pieData.map((entry, idx) => (
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
								{pieData.map((p, i) => (
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
									data={barData}
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
						<Button variant='ghost' size='sm'>
							Barchasini ko‘rish
						</Button>
					</div>
				</CardHeader>

				<CardContent>
					<div className='overflow-x-auto'>
						<table className='w-full text-sm'>
							<thead className='text-left text-xs text-muted-foreground'>
								<tr>
									<th className='py-2'>T/r</th>
									<th className='py-2'>Lokomotiv</th>
									<th className='py-2'>Uzel</th>
									<th className='py-2'>Xodim</th>
									<th className='py-2'>Sana</th>
									<th className='py-2'>Status</th>
								</tr>
							</thead>
							<tbody>
								{journals.map((j, i) => (
									<tr key={i} className='border-t group hover:bg-muted/50'>
										<td className='py-3'>{i + 1}</td>
										<td className='py-3'>{j.lokomotiv}</td>
										<td className='py-3'>{j.uzel}</td>
										<td className='py-3'>{j.xodim}</td>
										<td className='py-3'>{j.sana}</td>
										<td className='py-3'>
											<Badge
												className={`${
													j.status === 'Yakunlangan'
														? 'bg-green-500 text-white'
														: j.status === 'Jarayonda'
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
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// 'use client'

// import { useEffect, useState } from 'react'
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
// import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'
// import { motion } from 'framer-motion'
// // import { collection, getDocs } from 'firebase/firestore'
// // import { db } from '@/lib/firebase'
// import { Users, Building2, TrainFront, Wrench } from 'lucide-react'

// export default function DashboardPage() {
//   const [counts, setCounts] = useState({
//     xodimlar: 0,
//     sexlar: 0,
//     lokomotivlar: 0,
//     uzellar: 0,
//   })
//   const [uzelStatusData, setUzelStatusData] = useState([])
//   const [sexUzelData, setSexUzelData] = useState([])
//   const [jurnallar, setJurnallar] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       const xodimSnap = await getDocs(collection(db, 'xodimlar'))
//       const sexSnap = await getDocs(collection(db, 'sexlar'))
//       const lokoSnap = await getDocs(collection(db, 'lokomotivlar'))
//       const uzelSnap = await getDocs(collection(db, 'uzellar'))
//       const jurnalSnap = await getDocs(collection(db, 'jurnallar'))

//       const uzelData = uzelSnap.docs.map((d) => d.data())
//       const statusGroups = {
//         'Ish holatida': uzelData.filter(u => u.holati === 'Ish holatida').length,
//         'Sexda': uzelData.filter(u => u.holati === 'Sexda').length,
//         'Ta’mirda': uzelData.filter(u => u.holati === 'Ta’mirda').length,
//       }

//       const sexlarMap = {}
//       uzelData.forEach(u => {
//         if (!sexlarMap[u.sex]) sexlarMap[u.sex] = 0
//         sexlarMap[u.sex]++
//       })

//       setCounts({
//         xodimlar: xodimSnap.size,
//         sexlar: sexSnap.size,
//         lokomotivlar: lokoSnap.size,
//         uzellar: uzelSnap.size,
//       })

//       setUzelStatusData(Object.entries(statusGroups).map(([name, value]) => ({ name, value })))
//       setSexUzelData(Object.entries(sexlarMap).map(([name, value]) => ({ name, value })))

//       const latestJurnals = jurnalSnap.docs
//         .map(d => d.data())
//         .sort((a, b) => new Date(b.yechgansana) - new Date(a.yechgansana))
//         .slice(0, 5)
//       setJurnallar(latestJurnals)
//     }

//     fetchData()
//   }, [])

//   const COLORS = ['#22c55e', '#3b82f6', '#f97316']

//   const stats = [
//     { title: 'Xodimlar', count: counts.xodimlar, icon: <Users className="text-blue-600" /> },
//     { title: 'Sexlar', count: counts.sexlar, icon: <Building2 className="text-emerald-600" /> },
//     { title: 'Lokomotivlar', count: counts.lokomotivlar, icon: <TrainFront className="text-indigo-600" /> },
//     { title: 'Uzellar', count: counts.uzellar, icon: <Wrench className="text-rose-600" /> },
//   ]

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

//       {/* Cards */}
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         {stats.map((item, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//           >
//             <Card className="shadow-md hover:shadow-lg transition">
//               <CardHeader className="flex justify-between items-center">
//                 <CardTitle>{item.title}</CardTitle>
//                 {item.icon}
//               </CardHeader>
//               <CardContent>
//                 <p className="text-3xl font-semibold">{item.count}</p>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card className="shadow-md">
//           <CardHeader><CardTitle>Uzel holati</CardTitle></CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie data={uzelStatusData} dataKey="value" nameKey="name" outerRadius={100}>
//                   {uzelStatusData.map((_, index) => (
//                     <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card className="shadow-md">
//           <CardHeader><CardTitle>Sexlar bo‘yicha uzellar</CardTitle></CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={sexUzelData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#3b82f6" radius={[5, 5, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Latest Jurnals */}
//       <Card>
//         <CardHeader><CardTitle>So‘nggi jurnallar</CardTitle></CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-100 dark:bg-gray-800">
//                 <tr>
//                   <th className="p-2 text-left">Lokomotiv</th>
//                   <th className="p-2 text-left">Uzel</th>
//                   <th className="p-2 text-left">Xodim</th>
//                   <th className="p-2 text-left">Sana</th>
//                   <th className="p-2 text-left">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {jurnallar.map((j, i) => (
//                   <tr key={i} className="border-b">
//                     <td className="p-2">{j.lokomotiv}</td>
//                     <td className="p-2">{j.yechilganuzel}</td>
//                     <td className="p-2">{j.yechganxodim}</td>
//                     <td className="p-2">{new Date(j.yechgansana).toLocaleDateString()}</td>
//                     <td className="p-2">{j.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
