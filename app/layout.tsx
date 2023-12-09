import './globals.css'

export const metadata = {
  title: 'Ujian Pemrograman Web',
  description: 'Aplikasi Penyimpanan Barang',
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
