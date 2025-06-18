'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/app/components/Navbar'
import CharacterCard from '@/app/components/CharacterCard'
import CreateCharacterButton from '@/app/components/CreateCharacterButton'
import { AuthAPI } from '@/lib/auth'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<string | null>(null)
  const [characters, setCharacters] = useState<any[]>([]) // usar tipagem real no futuro

  useEffect(() => {
    const currentUser = AuthAPI.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
    } else {
      setUser(currentUser)
      // Aqui vamos simular busca de personagens
      const stored = localStorage.getItem(`characters_${currentUser}`)
      setCharacters(stored ? JSON.parse(stored) : [])
    }
  }, [router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-black text-white relative">
      <img
        src="/i-back.webp"
        alt="Fundo"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative z-10">
        <Navbar username={user} />
        <main className="p-8 flex flex-wrap gap-4 justify-center">
          {characters.length === 0 && <CreateCharacterButton />}
          {characters.map((char, i) => (
            <CharacterCard key={i} data={char} />
          ))}
          {characters.length > 0 && <CreateCharacterButton />}
        </main>
      </div>
    </div>
  )
}
