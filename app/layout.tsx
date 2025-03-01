import './globals.css'
import React from "react";
import AppThemeProvider from "@/app/theme-provider";
import QueryProvider from "@/app/providers/query-provider";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-full">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="description" content="Provides simplified and accessible Drupal docs"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <title>Drupal docs app</title>
            </head>
            <body className="h-full flex flex-col">
                <AppThemeProvider>
                    <QueryProvider>
                        {children}
                    </QueryProvider>
                </AppThemeProvider>
            </body>
        </html>
    )
}