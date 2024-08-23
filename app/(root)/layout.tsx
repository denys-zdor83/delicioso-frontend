import type { Metadata } from "next";
import { Header } from "@/components/shared";

export const metadata: Metadata = {
  title: "Deliciouso",
  description: "Order food online",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
    </main>
  );
}
