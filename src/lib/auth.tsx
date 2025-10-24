'use client'

// import { eUser } from '@/types/user'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'

interface LayoutProps {
	children: ReactNode
}
export interface eUser {
	_id: string
	jshshir: string
	password: string
	role: 'ADMIN' | 'USER' | 'MASTER'
	refreshToken?: string
}

interface dataType {
	user: eUser
	accessToken: string
	refreshToken?: string
}

interface AuthContextType {
	user: eUser | null
	login: (data: dataType) => void
	logout: () => void
	loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: LayoutProps) {
	const [user, setUser] = useState<eUser | null>(null)
	const [loading, setLoading] = useState(true)
	const router = useRouter()
	useEffect(() => {
		try {
			const storedUser = Cookies.get('user')
			if (storedUser) {
				setUser(JSON.parse(storedUser))
			}
		} catch (error) {
			console.error('Auth parse error', error)
		}
		setLoading(false)
	}, [])

	const login = (data: dataType) => {
		Cookies.set('token', data.accessToken)
		Cookies.set('role', data.user.role)
		Cookies.set('user', JSON.stringify(data.user))
		setUser(data.user)

		router.push('/')
		// switch (data.user.role) {
		// 	case 'ADMIN':
		// 		router.push('/admin')
		// 		break
		// 	case 'MASTER':
		// 		router.push('/master')
		// 		break
		// 	default:
		// 		router.push('/user')
		// }
	}

	const logout = () => {
		Cookies.remove('token')
		Cookies.remove('user')
		Cookies.remove('role')
		setUser(null)
		router.push('/login')
	}

	if (loading) return null // yoki spinner

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) throw new Error('useAuth() must be used within an AuthProvider')
	return context
}
