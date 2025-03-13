export interface CharacterCardProps {
  name: string;
}

export const CharacterCard = ({ name }: CharacterCardProps) => (
  <div className='flex flex-col items-center justify-center h-32 w-full border rounded-md bg-card'>
    <span className='text-foreground'>{name}</span>
  </div>
);
