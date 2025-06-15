import './globals.css'

export const metadata = {
  title: 'Minha App de Fichas',
  description: 'Gerencie seus personagens facilmente',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-white">
        <img
            src="/i-back.webp"
            alt="Background"
            className="absolute inset-0 object-cover w-1/2 h-auto"
        />
        {children}
      </body>
    </html>
  )
}
