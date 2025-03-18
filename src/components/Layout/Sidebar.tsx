interface SidebarProps {
  position: 'left' | 'right';
}

export const Sidebar = ({ position }: SidebarProps) => {
  const borderClass = position === 'left' ? 'border-r-[1px]' : 'border-l-[1px]';

  return (
    <aside
      className={`w-full p-4 hidden xl:block border-none ${borderClass}`}
    />
  );
};
