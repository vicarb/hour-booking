// RootLayout.js
import './globals.css'
import { ReactNode } from 'react';
import { Inter } from 'next/font/google'
import { UserProvider } from '@/context/UserContext'
import { ToastContextProvider } from '@/context/ToastContext';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Book your services',
  description: 'Generated by create next app',
}
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
