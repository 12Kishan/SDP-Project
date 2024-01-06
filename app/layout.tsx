import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextAuthProvider from '@/provider/NextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuizBee | an AI based quiz app',
  description: 'SDP project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
