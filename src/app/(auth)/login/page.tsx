'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { useState } from 'react'
import { toast } from 'sonner'

export default function LoginPage() {
	const { login } = useAuth()
	const [form, setForm] = useState({ jshshir: '', password: '' })
	const [loading, setLoading] = useState(false)

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
		} catch (err) {
			toast.error(`Login yoki parol xato ❌ ${err}`)
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
						<Button
							type='submit'
							className='w-full bg-sidebar-primary text-sidebar-primary-foreground cursor-pointer'
							disabled={loading}
						>
							{loading ? 'Kirilmoqda...' : 'Kirish'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
