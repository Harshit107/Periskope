import fetchGroups from "../lib/fetchGroups";
import type { ResponseType } from "../types/ResponseType";
import type { WhatsAppGroup } from "../types/group";

export const getGroups = (
  phoneNumber: string
): Promise<ResponseType<WhatsAppGroup[], string>> => fetchGroups(phoneNumber);
