import { NextResponse } from 'next/server'

let fakeUserDb: { username: string; password: string }[] = []

export async function POST(req: Request) {
  const { username, password } = await req.json()

  const user = fakeUserDb.find(
    (user) => user.username === username && user.password === password
  )

  if (!user) {
    return NextResponse.json({ error: 'Usuário ou senha inválidos' }, { status: 401 })
  }

  return NextResponse.json({ success: true })
}
