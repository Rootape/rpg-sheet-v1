import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const lembrar = request.cookies.get('lembrar_usuario')?.value

  const pathname = request.nextUrl.pathname

  // Se estiver na raiz "/"
  if (pathname === '/') {
    if (lembrar) {
      // Redireciona para dashboard se o cookie estiver presente
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
      // Redireciona para login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}