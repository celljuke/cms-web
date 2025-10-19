import { Header } from "@/components/header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="font-sans antialiased">
      <Header />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {children}
      </div>
    </main>
  );
}
