'use server'

import { cookies } from 'next/headers'

export async function lembrarUsuario(usuarioId: string) {
  const cookieStore = await cookies();

  cookieStore.set('lembrar_usuario', usuarioId, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });
}