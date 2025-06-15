type User = {
  username: string
  password: string
}

const STORAGE_KEY = 'fake_users'

function getUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export const AuthAPI = {
  login: (username: string, password: string): boolean => {
    const users = getUsers()
    return users.some((u) => u.username === username && u.password === password)
  },

  register: (username: string, password: string): boolean => {
    const users = getUsers()
    const exists = users.some((u) => u.username === username)
    if (exists) return false
    saveUsers([...users, { username, password }])
    return true
  },

  updateUser: (oldUsername: string, newUsername: string, newPassword: string): boolean => {
    const users = getUsers()
    const index = users.findIndex((u) => u.username === oldUsername)
    if (index === -1) return false
    users[index] = { username: newUsername, password: newPassword }
    saveUsers(users)
    return true
  },

  getCurrentUser: (): string | null => {
    return localStorage.getItem('current_user')
  },

  setCurrentUser: (username: string) => {
    localStorage.setItem('current_user', username)
  },

  logout: () => {
    localStorage.removeItem('current_user')
  },
}
