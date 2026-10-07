import "server-only";
import { timingSafeEqual } from "node:crypto";

/**
 * `Authorization: Bearer <secret>` 헤더 검사.
 * 길이가 다르면 timingSafeEqual 이 던지므로 먼저 거름. 길이는 어차피 응답 시간에 안 새어나감
 */
export function matchesBearerSecret(req: Request, secret: string) {
  const provided = req.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(secret);

  return a.length === b.length && timingSafeEqual(a, b);
}
