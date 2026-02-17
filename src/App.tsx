import { useState } from "react";
import GroupList from "./components/GroupList";
import Sidebar from "./components/Sidebar";
import { COLORS } from "./constants/colors";
import { supabase } from "./lib/supabaseClient";
import { type WhatsAppGroup } from "./types/group";

function App() {
  const [groups, setGroups] = useState<WhatsAppGroup[] | undefined>();

  const fetchGroups = async () => {
    const { data, error, status, count, statusText} = await supabase
      .from("whatsapp_groups")
      .select("*")
      .eq("phone_number", "9876543210");

    if (error) {
      console.log(error);
      return;
    }
    console.log(status);
    console.log(count);
    console.log(statusText);

    setGroups(data as WhatsAppGroup[]);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "row", overflow: "hidden", background: COLORS.background.main, boxSizing:"border-box" }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {!groups && <div style={{padding: "20px"}}><button onClick={fetchGroups} style={{cursor: "pointer", padding: "8px 16px", background: COLORS.button.primary, color: COLORS.text.white, border: "none", borderRadius: "6px"}}>Load Data</button></div>}
            
            {groups && <div style={{flex: 1, overflow: "hidden"}}><GroupList groups={groups} /></div>}
        </div>
    </div>
  );
}

export default App;
