import { http, HttpResponse } from "msw";
import { MOCK_ACCOUNTS as initialAccounts } from "@/lib/mock-data";
import type { Account } from "@/types/scheduler";

let accounts: Account[] = [...initialAccounts];

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

const SUPABASE_API_PATH = "/rest/v1/accounts";

export const handlers = [
  http.get(`${SUPABASE_URL}${SUPABASE_API_PATH}`, () => {
    return HttpResponse.json(accounts);
  }),

  http.post(`${SUPABASE_URL}${SUPABASE_API_PATH}`, async ({ request }) => {
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

  http.delete(`${SUPABASE_URL}${SUPABASE_API_PATH}`, ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id")?.replace("eq.", "");

    if (!id) return new HttpResponse(null, { status: 400 });

    accounts = accounts.filter((acc) => acc.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),
];
