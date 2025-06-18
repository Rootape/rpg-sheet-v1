'use server'

import { cookies } from 'next/headers'

export async function loginUsuario(username: string, password: string, rememberMe: boolean) {
  const cookieStore = await cookies();

  function lembrarUsuario(usuarioId: string) {

    cookieStore.set('lembrar_usuario', usuarioId, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 180, // 7 dias
    });
  }

  if(username === 'Rotape' && password === '12345'){
    if(rememberMe){
      lembrarUsuario('12345')
    }
    cookieStore.set('logado', username, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });
    return { success: true }
  }
  return { success: false, message: 'Credenciais inválidas' }
}