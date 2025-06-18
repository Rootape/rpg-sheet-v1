'use client'

import { useRouter } from 'next/navigation'
import AuthForm from '@/app/components/AuthForm'
import { AuthAPI } from '@/lib/auth'

export default function RegisterPage() {
  const router = useRouter()

  const handleRegister = (username: string, password: string) => {
    const success = AuthAPI.register(username, password)

    if (success) {
      alert('Usuário cadastrado com sucesso!')
      router.push('/login')
    } else {
      alert('Usuário já existe!')
    }
  }

  return (
    <AuthForm
      type="register"
      onSubmit={handleRegister}
    />
  )
}
