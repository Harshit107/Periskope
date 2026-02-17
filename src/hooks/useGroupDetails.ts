import { useEffect, useState } from "react";
import { getGroupDetails } from "../service/groupDetailsService";
import type { GroupDetail } from "../types/groupDetail";

export function useGroupDetails(groupId: string | null) {
  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!groupId) {
      setGroup(null);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      const result = await getGroupDetails(groupId);
      
      if (result.response === "SUCCESS") {
        setGroup(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [groupId]);

  return { group, loading, error };
}
