export type Character = {
  id: string
  name: string
  nex: string
  campaign: string
  image: string
  [key: string]: any
}

export const CharacterAPI = {
  getAll: (user: string): Character[] => {
    const raw = localStorage.getItem(`characters_${user}`)
    return raw ? JSON.parse(raw) : []
  },

  getById: (user: string, id: string): Character | undefined => {
    return CharacterAPI.getAll(user).find((char) => char.id === id)
  },

  save: (user: string, char: Character) => {
    const all = CharacterAPI.getAll(user)
    const exists = all.find((c) => c.id === char.id)
    const updated = exists
      ? all.map((c) => (c.id === char.id ? char : c))
      : [...all, char]
    localStorage.setItem(`characters_${user}`, JSON.stringify(updated))
  },
}
