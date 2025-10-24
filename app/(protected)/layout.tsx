import { Header } from "@/components/header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans antialiased min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      {children}
    </div>
  );
}
