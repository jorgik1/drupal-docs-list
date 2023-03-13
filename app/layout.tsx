import './globals.css'
import React from "react";

export const metadata = {
  title: 'Drupal docs app',
  description: 'Provides simplified and accessible Drupal docs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
