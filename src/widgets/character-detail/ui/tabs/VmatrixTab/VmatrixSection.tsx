import { Separator } from "@/shared/ui/separator";

interface VmatrixSectionProps {
  title: string;
  children: React.ReactNode;
}

export function VmatrixSection({ title, children }: VmatrixSectionProps) {
  return (
    <section className="bg-card p-4 shadow-sm">
      <h2 className="font-semibold">{title}</h2>
      <Separator className="my-2" />
      {children}
    </section>
  );
}
