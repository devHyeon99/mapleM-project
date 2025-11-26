interface CoreListProps<T extends { slot_id: string | number }> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}

export function CoreList<T extends { slot_id: string | number }>({
  items,
  renderItem,
  className,
}: CoreListProps<T>) {
  return (
    <ul className={className ?? "space-y-1"}>
      {items.map((item) => (
        <li key={item.slot_id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
