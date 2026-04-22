import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

export const metadata = {
  title: "Circle Wave",
  description: "Customer service staffing and consulting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}