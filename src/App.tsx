import { useEffect, useState } from "react";
import GroupList from "./components/GroupList";
import Sidebar from "./components/Sidebar";
import { COLORS } from "./constants/colors";
import { supabase } from "./lib/supabaseClient";
import { type WhatsAppGroup } from "./types/group";

function App() {
  const [groups, setGroups] = useState<WhatsAppGroup[] | undefined>();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const { data, error } = await supabase
      .from("whatsapp_groups")
      .select("*")
      .eq("phone_number", "9876543210");

    if (error) {
      console.log(error);
      return;
    }

    const groupsWithUnread = (data || []).map(g => ({
        ...g,
        unreadCount: Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : 0
    }));

    setGroups(groupsWithUnread as WhatsAppGroup[]);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "row", overflow: "hidden", background: COLORS.background.main, boxSizing:"border-box" }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {!groups ? (
                <div style={{padding: "20px", color: COLORS.text.muted}}>Loading...</div>
            ) : (
                <div style={{flex: 1, overflow: "hidden"}}><GroupList groups={groups} /></div>
            )}
        </div>
    </div>
  );
}

export default App;
