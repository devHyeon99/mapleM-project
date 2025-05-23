import type { Account } from "@/types/scheduler";
import { supabase } from "@/utils/supabase/client";

export const fetchAccounts = async (): Promise<Account[]> => {
  const { data, error } = await supabase.from("accounts").select("*");

  if (error) {
    console.error("Supabase fetch error:", error);
    throw error;
  }
  return data ?? [];
};

export const createAccount = async (name: string): Promise<Account[]> => {
  const { data, error } = await supabase
    .from("accounts")
    .insert([{ name }])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    throw error;
  }

  return data ?? [];
};

export const deleteAccount = async (id: string): Promise<void> => {
  const { error } = await supabase.from("accounts").delete().eq("id", id);

  if (error) {
    console.error("Supabase delete error:", error);
    throw error;
  }
};
