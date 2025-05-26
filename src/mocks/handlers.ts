import { http, HttpResponse, delay } from "msw";
import {
  MOCK_ACCOUNTS as initialAccounts,
  MOCK_CHARACTERS as initialCharacters,
} from "@/lib/mock-data";
import type { Account, Character } from "@/types/scheduler";

// MSW가 실행되는 동안 메모리에서 관리될 데이터
let accounts: Account[] = JSON.parse(JSON.stringify(initialAccounts));
let mockCharacters: Character[] = JSON.parse(JSON.stringify(initialCharacters));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!SUPABASE_URL) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
}

const ACCOUNTS_API_PATH = "/rest/v1/accounts";
const CHARACTERS_API_PATH = "/rest/v1/characters";

export const handlers = [
  // =========================================
  // === 계정(Account) 핸들러
  // =========================================
  http.get(`${SUPABASE_URL}${ACCOUNTS_API_PATH}`, async () => {
    await delay(500);
    return HttpResponse.json(accounts);
  }),

  http.post(`${SUPABASE_URL}${ACCOUNTS_API_PATH}`, async ({ request }) => {
    const newAccountsData = (await request.json()) as { name: string }[];

    const name = newAccountsData[0]?.name;

    if (!name) {
      return HttpResponse.json(
        { message: "Name is required" },
        { status: 400 },
      );
    }

    const newAccount = {
      id: crypto.randomUUID(),
      name,
      created_at: new Date().toISOString(),
    };

    accounts.push(newAccount);

    return HttpResponse.json([newAccount], { status: 201 });
  }),

  http.delete(`${SUPABASE_URL}${ACCOUNTS_API_PATH}`, ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id")?.replace("eq.", "");
    if (!id) return new HttpResponse(null, { status: 400 });
    accounts = accounts.filter((acc) => acc.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),

  // =========================================
  // === 캐릭터(Character) 핸들러 ✨ (개편됨)
  // =========================================

  // 1. 캐릭터 목록 조회 (GET /rest/v1/characters)
  // fetchCharacters가 호출하는 Supabase API를 모킹합니다.
  http.get(`${SUPABASE_URL}${CHARACTERS_API_PATH}`, async ({ request }) => {
    const url = new URL(request.url);
    // 실제 DB 컬럼명인 'account_id'를 기준으로 필터링합니다.
    const accountId = url.searchParams.get("account_id")?.replace("eq.", "");

    if (!accountId) {
      return HttpResponse.json(
        { message: "account_id is required" },
        { status: 400 },
      );
    }

    const filteredCharacters = mockCharacters.filter(
      (char) => char.account_id === accountId, // MOCK 데이터도 account_id를 사용해야 합니다.
    );

    await delay(500); // 실제 네트워크 딜레이처럼 보이게 합니다.
    return HttpResponse.json(filteredCharacters);
  }),

  // 2. 캐릭터 추가 (POST /api/characters)
  // addCharacter가 호출하는 Next.js API Route를 모킹합니다. ✨ 경로가 변경되었습니다.
  http.post("/api/characters", async ({ request }) => {
    const { name } = (await request.json()) as {
      name: string;
      world_name: string;
    };

    // 실제 API Route의 로직을 시뮬레이션합니다.
    // 세션이 없으므로, 테스트를 위해 첫 번째 계정(acc1)에 추가된다고 가정합니다.
    const mockSessionAccountId = "acc1";

    const newCharacter: Character = {
      id: crypto.randomUUID(),
      account_id: mockSessionAccountId, // 실제 컬럼명 사용
      ocid: `mock_ocid_${crypto.randomUUID()}`, // 실제 API 응답에 있는 필드 추가
      name,
      job: "iel", // 기본 직업
      level: 265, // 기본 레벨
    };

    mockCharacters.push(newCharacter);

    await delay(1000);
    // 실제 API Route와 동일하게 추가된 캐릭터 정보를 반환합니다.
    return HttpResponse.json(newCharacter, { status: 201 });
  }),

  // 3. 캐릭터 삭제 (DELETE /rest/v1/characters)
  // deleteCharacter가 호출하는 Supabase API를 모킹합니다.
  http.delete(`${SUPABASE_URL}${CHARACTERS_API_PATH}`, async ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id")?.replace("eq.", "");
    if (!id) {
      return new HttpResponse("id is required", { status: 400 });
    }
    const initialLength = mockCharacters.length;
    mockCharacters = mockCharacters.filter((char) => char.id !== id);
    if (mockCharacters.length < initialLength) {
      return new HttpResponse(null, { status: 204 }); // 성공 (No Content)
    } else {
      return HttpResponse.json(
        { message: "Character not found" },
        { status: 404 },
      );
    }
  }),
];
