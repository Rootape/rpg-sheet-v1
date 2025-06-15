'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Character, CharacterAPI } from '@/lib/character'
import { AuthAPI } from '@/lib/auth'

interface Props {
  mode: 'create' | 'edit'
  existingData?: Character
}

export default function CharacterForm({ mode, existingData }: Props) {
  const router = useRouter()
  const user = AuthAPI.getCurrentUser()
  const [data, setData] = useState<Character>(
    existingData ?? {
      id: uuidv4(),
      name: '',
      nex: '',
      campaign: '',
      image: '/placeholder.png',
    }
  )

  useEffect(() => {
    if (!user) router.push('/login')
  }, [user, router])

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
    if (field === 'nex' && value === '100%') {
      setData((prev) => ({ ...prev, special: 'Pronto para o ritual' }))
    }
  }

  const handleSave = () => {
    if (!user) return
    CharacterAPI.save(user, data)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <img
        src="/sheet-bg.webp"
        alt="Ficha"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute top-4 right-8 z-10 flex gap-4">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          {mode === 'create' ? 'Criar' : 'Atualizar'}
        </button>
      </div>
      <div className="relative z-10 p-10 pt-24">
        <div className="relative w-full max-w-4xl mx-auto h-[700px] bg-cover bg-center bg-no-repeat bg-[url('/sheet-bg.webp')]">
          {/* Exemplo de campos posicionados sobre a imagem */}
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Nome"
            className="absolute top-[10%] left-[5%] w-[40%] bg-white/10 text-white px-2 py-1 rounded border border-white"
          />
          <select
            value={data.nex}
            onChange={(e) => handleChange('nex', e.target.value)}
            className="absolute top-[20%] left-[5%] w-[20%] bg-white/10 text-white px-2 py-1 rounded border border-white"
          >
            <option value="">Selecione NEX</option>
            <option value="0%">0%</option>
            <option value="35%">35%</option>
            <option value="100%">100%</option>
          </select>
          <input
            type="text"
            value={data.campaign}
            onChange={(e) => handleChange('campaign', e.target.value)}
            placeholder="Campanha"
            className="absolute top-[30%] left-[5%] w-[40%] bg-white/10 text-white px-2 py-1 rounded border border-white"
          />
          {/* Campo extra afetado por nex */}
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
