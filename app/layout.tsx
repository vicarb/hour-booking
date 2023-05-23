// RootLayout.js
import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from '@/context/UserContext'
import { ToastContextProvider } from '@/context/ToastContext';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Book your services',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <ToastContextProvider>
            {children}
          </ToastContextProvider>
        </UserProvider>
      </body>
    </html>
  )
}
