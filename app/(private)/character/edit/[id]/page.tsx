'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AuthAPI } from '@/lib/auth'
import { CharacterAPI, Character } from '@/lib/character'
import CharacterForm from '@/app/components/CharacterForm'

export default function EditCharacterPage() {
  const router = useRouter()
  const params = useParams()
  const [char, setChar] = useState<Character | null>(null)

  useEffect(() => {
    const user = AuthAPI.getCurrentUser()
    if (!user) return router.push('/login')
    const found = CharacterAPI.getById(user, params.id as string)
    if (!found) return router.push('/dashboard')
    setChar(found)
  }, [params.id, router])

  if (!char) return null

  return <CharacterForm mode="edit" existingData={char} />
}
