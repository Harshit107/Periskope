import type { ColumnDef } from "@tanstack/react-table";
import { format, isToday, isYesterday } from "date-fns";
import styled from "styled-components";
import { COLORS } from "../constants/colors";
import type { WhatsAppGroup } from "../types/group";

const ProjectTag = styled.span<{ project: string }>`
  font-size: 13px;
  font-weight: 500;
  color: ${COLORS.text.secondary};
`;

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

  &::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${COLORS.text.tertiary}; /* Default gray dot */
  }
`;

const HighPriorityLabel = styled(Label)`
  &::before {
    background-color: ${COLORS.danger}; /* Red dot */
  }
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

const MembersContainer = styled.div`
    display: flex;
    align-items: center;
`;

const MemberAvatar = styled.div<{ $zIndex: number, $bg?: string }>`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${props => props.$bg || COLORS.background.alt};
    border: 2px solid white;
    margin-left: -8px; /* Overlap */
    z-index: ${props => props.$zIndex};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: ${COLORS.text.secondary};
    font-weight: 600;

    &:first-child {
        margin-left: 0;
    }
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

// Helper to generate consistent avatar URL
const getAvatarUrl = (seed: string) => `https://ui-avatars.com/api/?name=${encodeURIComponent(seed)}&background=random&color=fff&size=64`;

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
    filterFn: "includesString",
    cell: ({ row }) => {
      const name = row.original.group_name;
      // Use UI Avatars for deterministic avatars based on name
      const avatarUrl = getAvatarUrl(name);
      
      return (
        <GroupNameContainer>
          <AvatarImg src={avatarUrl} alt={name} />
          <span style={{ fontWeight: 500, color: COLORS.text.primary }}>{name}</span>
        </GroupNameContainer>
      );
    }
  },

  {
    header: "Project",
    cell: ({ row }) => (
      <ProjectTag project={row.original.project}>
        {row.original.project}
      </ProjectTag>
    ),
  },

  {
    header: "Labels",
    cell: ({ row }) => {
      const labels = row.original.labels || [];
      const visible = labels.slice(0, 2);
      const extra = labels.length - 2;

      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {visible.map((l) => {
              if (l === "High Priority") {
                  return <HighPriorityLabel key={l}>{l}</HighPriorityLabel>
              }
              return <Label key={l}>{l}</Label>
          })}
          {extra > 0 && <Label style={{color: COLORS.text.light}}>+{extra}</Label>}
        </div>
      );
    },
  },

  {
    header: "Members",
    accessorKey: "members",
    cell: ({ getValue }) => {
        const count = getValue() as number;
        // Mocking member avatars relative to count
        return (
            <MembersContainer>
                <MemberAvatar $zIndex={3} $bg="#E0E7FF">A</MemberAvatar>
                <MemberAvatar $zIndex={2} $bg="#FEF3C7">B</MemberAvatar>
                <MemberAvatar $zIndex={1} $bg="#D1FAE5">C</MemberAvatar>
                <span style={{marginLeft: 8, fontSize: 13, color: COLORS.text.muted}}>+{count}</span>
            </MembersContainer>
        )
    }
  },

  {
    header: "Last Active",
    cell: ({ row }) => <span style={{ color: COLORS.text.muted }}>{formatLastActive(row.original.last_active)}</span>,
  },
];
