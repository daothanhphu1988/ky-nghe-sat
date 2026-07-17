import type { Metadata } from "next";
import { Bebas_Neue, Oswald, Inter, Manrope } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kynghesat.vn";
const SITE_DESCRIPTION =
  "Thi công cửa sắt, cầu thang, lan can, cổng sắt, mái che, hàng rào theo yêu cầu. Xưởng sản xuất trực tiếp, bền đẹp theo thời gian.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kỹ Nghệ Sắt - Xưởng Cơ Khí & Kỹ Nghệ Sắt",
    template: "%s | Kỹ Nghệ Sắt",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Kỹ Nghệ Sắt",
    title: "Kỹ Nghệ Sắt - Xưởng Cơ Khí & Kỹ Nghệ Sắt",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Kỹ Nghệ Sắt - Xưởng Cơ Khí & Kỹ Nghệ Sắt",
    description: SITE_DESCRIPTION,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Kỹ Nghệ Sắt",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: "+84984999087",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Thọ Tân, Xã Xuân Thọ",
    addressLocality: "Xuân Lộc",
    addressRegion: "Đồng Nai",
    addressCountry: "VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${bebasNeue.variable} ${oswald.variable} ${inter.variable} ${manrope.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
