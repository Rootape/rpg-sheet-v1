'use client'

import { useState } from 'react'
import { AuthAPI } from '@/lib/auth'

interface Props {
  onClose: () => void
  onUpdate: () => void
}

export default function UpdateUserModal({ onClose, onUpdate }: Props) {
  const currentUser = AuthAPI.getCurrentUser()
  const [username, setUsername] = useState(currentUser || '')
  const [password, setPassword] = useState('')

  const handleConfirm = () => {
    if (!currentUser) return
    const success = AuthAPI.updateUser(currentUser, username, password)
    if (success) {
      AuthAPI.setCurrentUser(username)
      onUpdate()
    } else {
      alert('Erro ao atualizar usuário.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm space-y-4">
        <h2 className="text-xl font-semibold text-black">Alterar Usuário</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Novo usuário"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nova senha"
          className="w-full p-2 border rounded"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-white bg-red-600 px-4 py-1 rounded">
            Cancelar
          </button>
          <button onClick={handleConfirm} className="text-white bg-green-600 px-4 py-1 rounded">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
