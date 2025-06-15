'use client'

import { useRouter } from 'next/navigation'
import AuthForm from '@/components/AuthForm'
import { AuthAPI } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (username: string, password: string) => {
    const success = AuthAPI.login(username, password)

    if (success) {
      AuthAPI.setCurrentUser(username)
      router.push('/dashboard')
    } else {
      alert('Usuário ou senha inválidos.')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-white text-2xl font-semibold mb-6 text-center">Login</h1>
        <AuthForm
          type="login"
          onSubmit={handleLogin}
        />
      </div>
    </div>
  )
}
