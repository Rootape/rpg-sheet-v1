'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Character, CharacterAPI } from '@/lib/character'
import { AuthAPI } from '@/lib/auth'

interface Props {
  character: Character
}

export default function CharacterViewForm({ character }: Props) {
  const router = useRouter()
  const user = AuthAPI.getCurrentUser()
  const [data, setData] = useState(character)

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
    // Atualiza automaticamente no localStorage (somente campos editáveis)
    if (user) {
      const updated = { ...data, [field]: value }
      CharacterAPI.save(user, updated)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <img
        src="/sheet-bg.webp"
        alt="Ficha"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute top-4 left-8 z-10">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Voltar
        </button>
      </div>

      <div className="relative z-10 p-10 pt-24">
        <div className="relative w-full max-w-4xl mx-auto h-[700px] bg-[url('/sheet-bg.webp')] bg-no-repeat bg-cover">
          <input
            type="text"
            value={data.name}
            disabled
            className="absolute top-[10%] left-[5%] w-[40%] bg-white/10 text-white px-2 py-1 rounded border border-white"
          />
          <select
            value={data.nex}
            onChange={(e) => handleChange('nex', e.target.value)}
            className="absolute top-[20%] left-[5%] w-[20%] bg-white/10 text-white px-2 py-1 rounded border border-white"
          >
            <option value="0%">0%</option>
            <option value="35%">35%</option>
            <option value="100%">100%</option>
          </select>
          <input
            type="text"
            value={data.campaign}
            disabled
            className="absolute top-[30%] left-[5%] w-[40%] bg-white/10 text-white px-2 py-1 rounded border border-white"
          />
          {data.special && (
            <div className="absolute top-[40%] left-[5%] text-green-300 text-sm">
              {data.special}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
