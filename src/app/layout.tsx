import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "二维码工坊 - 专业二维码生成与美化工具",
  description:
    "免费在线二维码生成器，支持自定义颜色、Logo、边框等个性化设计，提供多种专业模板",
  keywords:
    "二维码生成器,二维码美化,自定义二维码,企业Logo二维码,在线二维码制作",
  authors: [{ name: "QR Craft Team" }],
  creator: "QR Craft",
  publisher: "QR Craft",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
