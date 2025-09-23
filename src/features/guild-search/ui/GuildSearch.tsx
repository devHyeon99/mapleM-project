"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Search } from "lucide-react";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";

export function GuildSearch() {
  const router = useRouter();
  const [guildName, setGuildName] = useState("");
  const [world, setWorld] = useState("전체");

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!guildName.trim()) return;

    router.push(
      `/guild/${encodeURIComponent(world)}/${encodeURIComponent(guildName.trim())}`,
    );
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full flex-col gap-3">
      <div className="flex w-full items-center gap-2">
        <Select value={world} onValueChange={setWorld} name="world">
          <SelectTrigger className="!h-12 min-w-25 rounded-sm lg:w-31.5">
            <SelectValue placeholder="월드" />
          </SelectTrigger>
          <SelectContent>
            {WORLD_NAMES.map((w) => (
              <SelectItem key={w} value={w}>
                {w}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Input
            id="guild-search-input"
            name="guildName"
            placeholder="길드명을 입력하세요"
            value={guildName}
            onChange={(e) => setGuildName(e.target.value)}
            className="h-12 w-full rounded-sm pr-12"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            disabled={!guildName.trim()}
            className="absolute top-1/2 right-1 h-10 w-10 -translate-y-1/2 cursor-pointer hover:bg-transparent!"
            aria-label="길드 검색"
          >
            <Search className="size-5" />
          </Button>
        </div>
      </div>
    </form>
  );
}
