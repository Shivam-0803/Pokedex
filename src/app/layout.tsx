import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { MUIThemeProvider } from '@/components/MUIThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokédex App',
  description: 'Pokémon search and filter app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <MUIThemeProvider>
            {children}
          </MUIThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
