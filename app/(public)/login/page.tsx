'use client'

import { useRouter } from 'next/navigation'
import AuthForm from '@/app/components/AuthForm'
//import { AuthAPI } from '@/lib/auth'
import { loginUsuario } from './actions'

export default function LoginPage() {
  const router = useRouter()

  async function handleLogin(username: string, password: string, rememberMe: boolean) {
    //const success = AuthAPI.login(username, password)
    const result = await loginUsuario(username, password, rememberMe)

    if (result.success) {
      //AuthAPI.setCurrentUser(username)
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
