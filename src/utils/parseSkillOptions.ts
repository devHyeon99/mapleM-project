export function parseSkillOptions(
  effectString: string,
): { name: string; value: string }[] {
  if (!effectString) return [];

  return effectString
    .split(/,\s*/) // 콤마 + 공백 기준
    .map((part) => {
      const [name, value] = part.split(":").map((s) => s.trim());
      return { name: name ?? "", value: value ?? "" };
    })
    .filter((opt) => opt.name !== "");
}
