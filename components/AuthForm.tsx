'use client'

import { useState } from 'react'
import Link from 'next/link'

interface AuthFormProps {
  type: 'login' | 'register'
  onSubmit: (username: string, password: string, remember: boolean) => void
  showRedirectLink?: boolean
}

export default function AuthForm({
  type,
  onSubmit,
}: AuthFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(username, password, rememberMe)
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
          {type === 'login' && (
            <h1>Login</h1>
          )}
          {type === 'register' && (
            <h1>Registrar</h1>
          )}
          <div className="input-box">
              <input
              type="text"
              placeholder="Usuário"
              required value={username}
              onChange={(e) => setUsername(e.target.value)}/>
              <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
              <input
              type="password"
              placeholder="Senha"
              required value={password}
              onChange={(e) => setPassword(e.target.value)}/>
              <i className='bx bxs-lock-alt' ></i>
          </div>
          {type === 'login' && (
              <div className="remember-forgot">
                  <label><input type="checkbox" className='custom-checkbox'/>Lembre de mim</label>
              </div>
          )}
          <button type="submit" className="btn">Enviar</button>
          {type === 'login' && (
            <div className="register-link">
                <p>Não é cadastrado? <Link href="/register" className=''>Registrar</Link></p>
            </div>
          )}
        </form>
    </div>
  )
}
