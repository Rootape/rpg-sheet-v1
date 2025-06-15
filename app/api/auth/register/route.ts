import { NextResponse } from 'next/server'

let fakeUserDb: { username: string; password: string }[] = []

export async function POST(req: Request) {
  const { username, password } = await req.json()

  if (!username || !password) {
    return NextResponse.json({ error: 'Campos obrigatórios' }, { status: 400 })
  }

  const userExists = fakeUserDb.find((user) => user.username === username)

  if (userExists) {
    return NextResponse.json({ error: 'Usuário já existe' }, { status: 409 })
  }

  fakeUserDb.push({ username, password })

  return NextResponse.json({ success: true })
}
