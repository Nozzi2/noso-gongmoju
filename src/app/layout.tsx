import { ReactNode } from 'react'
import './globals.css'  // 이 줄 추가

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko">
      <body className="pb-16">
        {children}
      </body>
    </html>
  )
}
