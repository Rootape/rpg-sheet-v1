'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import UpdateUserModal from './UpdateUserModal'
import { AuthAPI } from '@/lib/auth'

export default function Navbar({ username }: { username: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleLogout = () => {
    AuthAPI.logout()
    router.push('/login')
  }

  return (
    <nav className="w-full bg-black bg-opacity-60 px-6 py-4 flex justify-between items-center border-b border-gray-700">
      <span className="text-lg font-semibold">{username}</span>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
        >
          Opções
        </button>
        {open && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow overflow-hidden z-20">
            <button
              onClick={() => {
                setShowModal(true)
                setOpen(false)
              }}
              className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
            >
              Alterar Usuário
            </button>
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
            >
              Deslogar
            </button>
          </div>
        )}
        {showModal && (
          <UpdateUserModal
            onClose={() => setShowModal(false)}
            onUpdate={() => {
              setShowModal(false)
              window.location.reload()
            }}
          />
        )}
      </div>
    </nav>
  )
}
