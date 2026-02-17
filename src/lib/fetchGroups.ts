import { TABLE_NAME } from "../config";
import type { WhatsAppGroup } from "../types/group";
import type { ResponseType } from "../types/ResponseType";
import { supabase } from "./supabaseClient";

const fetchGroups = async (
  phoneNumber: string
): Promise<ResponseType<WhatsAppGroup[], string>> => {
  const { data, error } = await supabase
    .from(TABLE_NAME.WHATSAPP_GROUP)
    .select("*")
    .eq("phone_number", phoneNumber);

  if (error) {
    return {
      response: "FAIL",
      data: null,
      error: error.message,
    };
  }

  return {
    response: "SUCCESS",
    data: data || [],
    error: null,
  };
};

export default fetchGroups;
