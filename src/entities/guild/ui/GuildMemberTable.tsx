import { Badge } from "@/shared/ui/badge";
import { GuildMember } from "../model/types"; // 이전에 정의한 타입 사용

export function GuildMemberTable({
  members,
  masterName,
}: {
  members: GuildMember[]; // any[] 대신 정확한 타입을 사용하세요
  masterName: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted-foreground border-b">
            <th className="pb-3 text-left font-medium">이름</th>
            <th className="pb-3 text-center font-medium">레벨</th>
            <th className="pb-3 text-right font-medium">기여도</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {members.map((member) => (
            <tr
              // 고유한 값인 character_name을 키로 사용합니다.
              key={member.character_name}
              className="hover:bg-muted/50 transition-colors"
            >
              <td className="flex items-center gap-2 py-3 font-medium">
                {member.character_name}
                {member.character_name === masterName && (
                  <Badge
                    variant="outline"
                    className="h-4 border-amber-500 px-1 text-[10px] text-amber-500"
                  >
                    Master
                  </Badge>
                )}
              </td>
              <td className="text-muted-foreground py-3 text-center">
                {member.character_level}
              </td>
              <td className="py-3 text-right tabular-nums">
                {member.guild_activity.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
