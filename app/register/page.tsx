'use client'

import { useRouter } from 'next/navigation'
import AuthForm from '@/components/AuthForm'
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
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      <img
        src="/i-back.webp"
        alt="Background"
        className="absolute inset-0 object-cover opacity-20 w-full h-full"
      />
      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-white text-2xl font-semibold mb-6 text-center">Cadastro</h1>
        <AuthForm
          type="register"
          onSubmit={handleRegister}
        />
      </div>
    </div>
  )
}
