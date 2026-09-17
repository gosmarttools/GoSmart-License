import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'GoSmart License Manager - Portal Aktivasi Lisensi Resmi',
  description: 'Portal aktivasi dan validasi lisensi template serta sistem digital resmi PT. GoSmart Teknologi Creative & Tuanbagues.',
  openGraph: {
    title: 'GoSmart License Manager - Portal Aktivasi Lisensi Resmi',
    description: 'Portal aktivasi dan validasi lisensi template serta sistem digital resmi PT. GoSmart Teknologi Creative & Tuanbagues.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoSmart License Manager - Portal Aktivasi Lisensi Resmi',
    description: 'Portal aktivasi dan validasi lisensi template serta sistem digital resmi PT. GoSmart Teknologi Creative & Tuanbagues.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
