import type { Account } from "@/types/scheduler";
import { supabase } from "@/utils/supabase/client";

export const fetchAccounts = async (): Promise<Account[]> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("로그인이 필요합니다.");

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Supabase fetch error:", error);
    throw error;
  }
  return data ?? [];
};

export const createAccount = async (name: string): Promise<Account[]> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("로그인이 필요합니다.");

  const { data, error } = await supabase
    .from("accounts")
    .insert([{ name, user_id: user.id }])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    throw error;
  }

  return data ?? [];
};

export const deleteAccount = async (id: string): Promise<void> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("로그인이 필요합니다.");

  const { error } = await supabase
    .from("accounts")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Supabase delete error:", error);
    throw error;
  }
};
