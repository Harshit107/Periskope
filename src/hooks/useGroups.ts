import { use } from "react";
import { getGroups } from "../service/groupService";

export function useGroups() {
  const result = use(getGroups("9876543210"));
  if (result.response === "SUCCESS") {
    return result.data;
  }
  return [];
}
