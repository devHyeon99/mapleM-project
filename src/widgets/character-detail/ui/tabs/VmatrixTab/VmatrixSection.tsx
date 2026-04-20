import { Separator } from "@/shared/ui/separator";

interface VmatrixSectionProps {
  title: string;
  children: React.ReactNode;
}

export function VmatrixSection({ title, children }: VmatrixSectionProps) {
  return (
    <section className="bg-card rounded-2xl p-4 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <Separator className="my-2" />
      {children}
    </section>
  );
}
