import '../../globals.css'

import React from 'react';

export default function LoginTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="body-login">
        <img
            src="/i-back.webp"
            alt="Background"
            className="absolute inset-0 object-cover w-1/2 h-auto"
        />
        {children}
      </body>
    </html>
  );
}