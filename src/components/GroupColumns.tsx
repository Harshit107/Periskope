import type { ColumnDef } from "@tanstack/react-table";
import { format, isToday, isYesterday } from "date-fns";
import styled from "styled-components";
import { COLORS } from "../constants/colors";
import type { WhatsAppGroup } from "../types/group";

const ProjectTag = styled.span<{ project: string }>`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;

  background-color: ${({ project }) => {
    if (project === "Demo") return COLORS.tags.demoBg;
    if (project === "Clients") return COLORS.tags.clientsBg;
    return COLORS.background.alt;
  }};

  color: ${({ project }) => {
    if (project === "Demo") return COLORS.tags.demo;
    if (project === "Clients") return COLORS.tags.clients;
    return COLORS.text.secondary;
  }};
`;

const Label = styled.span`
  padding: 2px 8px;
  margin-right: 4px;
  background: ${COLORS.background.alt};
  border-radius: 12px;
  font-size: 12px;
  color: ${COLORS.text.secondary};
  display: inline-block;
  border: 1px solid ${COLORS.border.light};
`;

const AvatarPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${COLORS.secondaryLight};
  color: ${COLORS.secondaryText};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  margin-right: 12px;
`;

const GroupNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid ${COLORS.border.medium};
  cursor: pointer;
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
      const initial = name.charAt(0);
      return (
        <GroupNameContainer>
          <AvatarPlaceholder>{initial}</AvatarPlaceholder>
          <span style={{ fontWeight: 500, color: COLORS.text.primary }}>{name}</span>
        </GroupNameContainer>
      );
    }
  },

  {
    header: "Project",
    cell: ({ row }) => (
      <ProjectTag project={row.original.project}>
        #{row.original.project}
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
          {visible.map((l) => (
            <Label key={l}>● {l}</Label>
          ))}
          {extra > 0 && <Label style={{background: 'white', color: COLORS.text.light}}>+{extra}</Label>}
        </div>
      );
    },
  },

  {
    header: "Members",
    accessorKey: "members",
    cell: ({ getValue }) => <span style={{ color: COLORS.text.muted }}>{getValue() as number}</span>
  },

  {
    header: "Last Active",
    cell: ({ row }) => <span style={{ color: COLORS.text.muted }}>{formatLastActive(row.original.last_active)}</span>,
  },
];
