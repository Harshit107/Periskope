import type { ColumnDef } from "@tanstack/react-table";
import { format, isToday, isYesterday } from "date-fns";
import styled from "styled-components";
import { COLORS } from "../constants/colors";
import type { WhatsAppGroup } from "../types/group";

const Label = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: white;
  border-radius: 16px; /* Capsule shape */
  font-size: 12px;
  font-weight: 500;
  color: ${COLORS.text.primary};
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  border: 1px solid ${COLORS.border.subtle};
  margin-right: 4px;
`;

const GroupNameContainer = styled.div`

  display: flex;
  align-items: center;
`;

const AvatarImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 12px;
    object-fit: cover;
    background: ${COLORS.background.alt};
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid ${COLORS.border.medium};
  cursor: pointer;
  accent-color: ${COLORS.primary}; /* Brand color checkbox */
`;

function formatLastActive(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);

  if (isToday(date)) {
    return format(date, "HH:mm");
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "dd MMM");
}

// Helper to generate consistent random image URL
const getAvatarUrl = (seed: string) => {
    // Simple hash to get a number from string
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const id = Math.abs(hash) % 1000; // Limits to 1000 images
    return `https://picsum.photos/id/${id}/200/200`;
};

const UnreadBadge = styled.div`
  background-color: ${COLORS.primary};
  color: white;
  font-size: 10px;
  font-weight: 700;
  height: 18px;
  min-width: 18px;
  padding: 0 4px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

export const groupColumns: ColumnDef<WhatsAppGroup>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    size: 40,
  },
  {
    header: "Group Name",
    accessorKey: "group_name",
    size: 440,
    filterFn: "includesString",
    cell: ({ row }) => {
      const name = row.original.group_name;
      const unreadCount = row.original.unreadCount || 0; 
      const avatarUrl = getAvatarUrl(name);
      
      return (
        <GroupNameContainer>
          <AvatarImg src={avatarUrl} alt={name} />
          <span style={{ fontWeight: 500, color: COLORS.text.primary }}>{name}</span>
          {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
        </GroupNameContainer>
      );
    }
  },

  {
    header: "Project",
    accessorKey: "project",
    size: 160,
    cell: ({ row }) => {
       const val = row.original.project;
       const isDemo = val === "Demo" || val === "Internal";
       const color = isDemo ? COLORS.tags.demo : COLORS.tags.clients;
       const bgColor = isDemo ? COLORS.tags.demoBg : COLORS.tags.clientsBg;
       const text = isDemo ? "# Demo" : "# Clients";

       return (
           <span style={{
               backgroundColor: bgColor,
               color: color,
               padding: "4px 10px",
               borderRadius: "6px",
               fontSize: "13px",
               fontWeight: 500,
               display: "inline-block"
           }}>
               {text}
           </span>
       )
    },
  },

  {
    header: "Labels",
    accessorKey: "labels",
    size: 220,
    cell: ({ row }) => {
      const labels = row.original.labels || [];
      const visible = labels.slice(0, 2);
      const extra = labels.length - 2;

      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {visible.map((l) => {
              let dotColor = COLORS.labels.default;
              let labelText = l;

              // Logic to determine color based on text matching "High", "Priority", "Pilot"
              if (l.includes("High")) dotColor = COLORS.labels.high;
              else if (l.includes("Priority") || l.includes("Prio")) dotColor = COLORS.labels.priority;
              else if (l.includes("Pilot")) dotColor = COLORS.labels.pilot;

              return (
                  <Label key={l} style={{ gap: 6 }}>
                      <span style={{
                          display: "block",
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: dotColor
                      }} />
                      {labelText}
                  </Label>
              )
          })}
          {extra > 0 && <Label style={{color: COLORS.text.light}}>+{extra}</Label>}
        </div>
      );
    },
  },

  {
    header: "Members",
    accessorKey: "members",
    size: 100,
    cell: ({ row }) => {
        // Just show count as requested
        // The accessor 'members' usually returns a number in our mock data based on previous file view
        // If it's an array we length it, if it's number we display it.
        const val = row.original.members;
        const count = Array.isArray(val) ? val.length : val;
        
        return (
            <span style={{ fontSize: 13, color: COLORS.text.secondary }}>
                {count}
            </span>
        )
    }
  },

  {
    header: "Last Active",
    size: 120,
    cell: ({ row }) => <span style={{ color: COLORS.text.muted }}>{formatLastActive(row.original.last_active)}</span>,
  },
];
