'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function LoginPage() {
	const { login } = useAuth()
	const [form, setForm] = useState({ jshshir: '', password: '' })
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		try {
			const res = await api.post('auth/login', form)
			login(res.data)
			toast.success('Tizimga kirildi ✅')
		} catch (err: any) {
			toast.error(err.response?.data?.message || 'Login yoki parol xato ❌')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-muted/50'>
			<Card className='w-full max-w-sm'>
				<CardHeader>
					<CardTitle className='text-center text-lg font-semibold'>
						Tizimga kirish
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<Input
							name='jshshir'
							placeholder='JSHSHIR'
							value={form.jshshir}
							onChange={handleChange}
							required
						/>
						<Input
							type='password'
							name='password'
							placeholder='Parol'
							value={form.password}
							onChange={handleChange}
							required
						/>
						<Button type='submit' className='w-full' disabled={loading}>
							{loading ? 'Kirilmoqda...' : 'Kirish'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

// 'use client'

// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'

// export default function LoginPage() {
// 	const [login, setLogin] = useState('')
// 	const [password, setPassword] = useState('')
// 	const router = useRouter()

// 	const handleLogin = async () => {
// 		// demo uchun fake auth
// 		if (login === 'admin' && password === '123') {
// 			localStorage.setItem('token', 'demo-token')
// 			router.push('/')
// 		} else {
// 			alert('Login yoki parol noto‘g‘ri ❌')
// 		}
// 	}

// 	return (
// 		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
// 			<Card className='w-[350px] p-4 shadow-lg'>
// 				<CardHeader>
// 					<CardTitle className='text-center text-lg font-bold'>
// 						Tizimga kirish
// 					</CardTitle>
// 				</CardHeader>
// 				<CardContent className='space-y-3'>
// 					<Input
// 						placeholder='Login'
// 						value={login}
// 						onChange={e => setLogin(e.target.value)}
// 					/>
// 					<Input
// 						type='password'
// 						placeholder='Parol'
// 						value={password}
// 						onChange={e => setPassword(e.target.value)}
// 					/>
// 					<Button className='w-full' onClick={handleLogin}>
// 						Kirish
// 					</Button>
// 				</CardContent>
// 			</Card>
// 		</div>
// 	)
// }
