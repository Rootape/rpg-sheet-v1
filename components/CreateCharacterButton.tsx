'use client'

import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

export default function CreateCharacterButton() {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push('/character/create')}
      className="w-64 h-40 border-2 border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-800 transition"
    >
      <Plus className="w-10 h-10 text-gray-400" />
    </div>
  )
}
