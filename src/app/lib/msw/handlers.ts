import { http, HttpResponse, delay } from "msw";
import {
  // 분리된 mock-data 파일에서 모든 목 데이터를 가져옵니다.
  MOCK_ACCOUNTS,
  MOCK_CHARACTERS,
  MOCK_SCHEDULE_ITEMS,
  MOCK_CHECKED_ITEMS,
} from "@/shared/config/mock-data";
import type {
  Account,
  Character,
  ChecklistItemData,
} from "@/entities/scheduler";

type NewScheduleItemPayload = Omit<ChecklistItemData, "id"> & {
  type: "task" | "boss";
  character_id: string;
};

type CheckedItemPayload = {
  character_id: string;
  item_id: string;
};

// =========================================
// === 인메모리 DB 설정
// =========================================
// MSW 세션 동안 상태를 유지하기 위해 mock 데이터를 깊은 복사하여 변수에 할당합니다.
let accounts: Account[] = JSON.parse(JSON.stringify(MOCK_ACCOUNTS));
let mockCharacters: Character[] = JSON.parse(JSON.stringify(MOCK_CHARACTERS));
let scheduleItems: (ChecklistItemData & {
  type: string;
  character_id: string;
})[] = JSON.parse(JSON.stringify(MOCK_SCHEDULE_ITEMS));
let checkedItems: { character_id: string; item_id: string }[] = JSON.parse(
  JSON.stringify(MOCK_CHECKED_ITEMS),
);

// =========================================
// === API 경로 설정
// =========================================
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!SUPABASE_URL) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
}

const ACCOUNTS_API_PATH = "/rest/v1/accounts";
const CHARACTERS_API_PATH = "/rest/v1/characters";
const SCHEDULER_API_PATH = "/rest/v1/schedule_items";
const CHECKED_API_PATH = "/rest/v1/user_checked_items";

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

    const newAccount: Account = {
      id: crypto.randomUUID(),
      name,
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
  // === 캐릭터(Character) 핸들러
  // =========================================
  http.get(`${SUPABASE_URL}${CHARACTERS_API_PATH}`, async ({ request }) => {
    const url = new URL(request.url);
    const accountId = url.searchParams.get("account_id")?.replace("eq.", "");

    if (!accountId) {
      return HttpResponse.json(
        { message: "account_id is required" },
        { status: 400 },
      );
    }

    const filteredCharacters = mockCharacters.filter(
      (char) => char.account_id === accountId,
    );
    await delay(500);
    return HttpResponse.json(filteredCharacters);
  }),

  http.post("/api/characters", async ({ request }) => {
    const { name } = (await request.json()) as { name: string };
    const mockSessionAccountId = "acc1"; // 테스트를 위해 첫 번째 계정에 추가
    const newCharacter: Character = {
      id: crypto.randomUUID(),
      account_id: mockSessionAccountId,
      ocid: `mock_ocid_${crypto.randomUUID()}`,
      name,
      job: "iel",
      level: 1,
    };
    mockCharacters.push(newCharacter);
    await delay(1000);
    return HttpResponse.json(newCharacter, { status: 201 });
  }),

  http.delete(`${SUPABASE_URL}${CHARACTERS_API_PATH}`, async ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id")?.replace("eq.", "");
    if (!id) return new HttpResponse("id is required", { status: 400 });
    mockCharacters = mockCharacters.filter((char) => char.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),

  // =========================================
  // === 스케줄(Scheduler) 핸들러
  // =========================================
  http.get(`${SUPABASE_URL}${SCHEDULER_API_PATH}`, async ({ request }) => {
    const url = new URL(request.url);
    const characterId = url.searchParams
      .get("character_id")
      ?.replace("eq.", "");
    if (!characterId)
      return HttpResponse.json(
        { message: "character_id is required" },
        { status: 400 },
      );

    const filteredItems = scheduleItems.filter(
      (item) => item.character_id === characterId,
    );
    await delay(300);
    return HttpResponse.json(filteredItems);
  }),

  http.post(`${SUPABASE_URL}${SCHEDULER_API_PATH}`, async ({ request }) => {
    const [newItemData] = (await request.json()) as [NewScheduleItemPayload];
    const newItem = {
      ...newItemData,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
    scheduleItems.push(newItem);
    await delay(300);
    return HttpResponse.json([newItem], { status: 201 });
  }),

  http.patch(`${SUPABASE_URL}${SCHEDULER_API_PATH}`, async ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id")?.replace("eq.", "");
    if (!id) return new HttpResponse("id is required", { status: 400 });

    const [updates] = (await request.json()) as Partial<ChecklistItemData>[];
    let updatedItem: ChecklistItemData | null = null;

    scheduleItems = scheduleItems.map((item) => {
      if (item.id === id) {
        updatedItem = { ...item, ...updates };
        return updatedItem;
      }
      return item;
    });

    if (!updatedItem) {
      return HttpResponse.json({ message: "Item not found" }, { status: 404 });
    }

    await delay(300);
    return HttpResponse.json([updatedItem], { status: 200 });
  }),

  http.delete(`${SUPABASE_URL}${SCHEDULER_API_PATH}`, ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id")?.replace("eq.", "");
    if (!id) return new HttpResponse(null, { status: 400 });
    scheduleItems = scheduleItems.filter((item) => item.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),

  // =========================================
  // === 체크 아이템(Checked Items) 핸들러
  // =========================================
  http.get(`${SUPABASE_URL}${CHECKED_API_PATH}`, async ({ request }) => {
    const url = new URL(request.url);
    const characterId = url.searchParams
      .get("character_id")
      ?.replace("eq.", "");
    if (!characterId)
      return HttpResponse.json(
        { message: "character_id is required" },
        { status: 400 },
      );

    const filteredChecked = checkedItems.filter(
      (item) => item.character_id === characterId,
    );
    await delay(300);
    return HttpResponse.json(filteredChecked);
  }),

  http.post(`${SUPABASE_URL}${CHECKED_API_PATH}`, async ({ request }) => {
    const itemsToUpsert = (await request.json()) as CheckedItemPayload[];
    itemsToUpsert.forEach((itemToUpsert) => {
      const exists = checkedItems.some(
        (ci) =>
          ci.character_id === itemToUpsert.character_id &&
          ci.item_id === itemToUpsert.item_id,
      );
      if (!exists) {
        checkedItems.push(itemToUpsert);
      }
    });
    return new HttpResponse(null, { status: 201 });
  }),

  http.delete(`${SUPABASE_URL}${CHECKED_API_PATH}`, ({ request }) => {
    const url = new URL(request.url);
    const characterId = url.searchParams
      .get("character_id")
      ?.replace("eq.", "");
    const itemIdsToDelete = url.searchParams
      .get("item_id")
      ?.replace("in.(", "")
      .replace(")", "")
      .split(",");

    if (!characterId || !itemIdsToDelete)
      return new HttpResponse(null, { status: 400 });

    checkedItems = checkedItems.filter(
      (item) =>
        !(
          item.character_id === characterId &&
          itemIdsToDelete.includes(item.item_id)
        ),
    );
    return new HttpResponse(null, { status: 204 });
  }),
];
