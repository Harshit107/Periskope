import { TABLE_NAME } from "../config";
import { supabase } from "../lib/supabaseClient";
import type { GroupDetail } from "../types/groupDetail";
import type { ResponseType } from "../types/ResponseType";

export const getGroupDetails = async (groupId: string): Promise<ResponseType<GroupDetail, string>> => {
  try {
    // Try fetching from group_details first
    let { data, error } = await supabase
      .from(TABLE_NAME.GROUP_DETAIL)
      .select("*")
      .eq("group_id", groupId) 
      .single();

    if (error || !data) {
        console.warn("Failed to fetch from group_details, falling back to whatsapp_groups", error);
        
        // Fallback to whatsapp_groups
        const { data: fallbackData, error: fallbackError } = await supabase
        .from(TABLE_NAME.WHATSAPP_GROUP)
        .select("*")
        .eq("id", groupId)
        .single();
        
        if (fallbackError) {
             return {
                response: "FAIL",
                data: null,
                error: fallbackError.message,
            };
        }
        data = fallbackData;
    }

    return {
      response: "SUCCESS",
      data: data as GroupDetail,
      error: null,
    };
  } catch (error) {
    return {
      response: "FAIL",
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
