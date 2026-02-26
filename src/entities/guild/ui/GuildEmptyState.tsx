interface GuildEmptyStateProps {
  message: string;
}

export function GuildEmptyState({ message }: GuildEmptyStateProps) {
  return (
    <div className="text-muted-foreground rounded-lg border border-dashed py-20 text-center">
      {message}
    </div>
  );
}
