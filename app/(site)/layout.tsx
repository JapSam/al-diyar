import ClientShell from "@/components/ui/ClientShell";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientShell>{children}</ClientShell>;
}
