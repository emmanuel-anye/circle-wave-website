import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import MotionProvider from "@/components/ui/MotionProvider";

export const metadata = {
  title: "Circle Wave",
  description: "Customer service staffing and consulting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <MainLayout>{children}</MainLayout>
        </MotionProvider>
      </body>
    </html>
  );
}