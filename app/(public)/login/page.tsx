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
    <AuthForm
      type="login"
      onSubmit={handleLogin}
    />
  )
}
