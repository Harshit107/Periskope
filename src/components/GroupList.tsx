import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../constants/colors";
import type { WhatsAppGroup } from "../types/group";
import { DataGrid } from "./DataGrid";
import { groupColumns } from "./GroupColumns";
import GroupDetailsPanel from "./GroupDetailsPanel";

type GroupListProps = {
  groups: WhatsAppGroup[];
};

const Container = styled.div`
  padding: 10px 24px;
  height: 95%;
  display: flex;
  flex-direction: column;
`;

const ContentArea = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  gap: 0;
  border: 1px solid ${COLORS.border.light};
`;

const LeftPanel = styled.div<{ $isOpen: boolean }>`
  flex: ${props => props.$isOpen ? "0 0 65%" : "1"};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: flex 0.3s ease;
  border-right: ${props => props.$isOpen ? `1px solid ${COLORS.border.light}` : "none"};
`;

const RightPanel = styled.div<{ $isOpen: boolean }>`
  flex: ${props => props.$isOpen ? "0 0 35%" : "0 0 0"};
  width: ${props => props.$isOpen ? "35%" : "0"};
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: ${props => props.$isOpen ? 1 : 0};
`;

const ControlsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SearchFilterGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const SearchInput = styled.div`
  position: relative;
  width: 300px;
  
  input {
    width: 100%;
    padding: 8px 12px 8px 36px;
    border: 1px solid ${COLORS.border.light};
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    color: ${COLORS.text.secondary};

    &:focus {
      border-color: ${COLORS.primary};
      box-shadow: 0 0 0 1px ${COLORS.primary};
    }
  }

  svg {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: ${COLORS.text.light};
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ variant?: 'primary' | 'outline' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  background: ${props => props.variant === 'primary' ? COLORS.primary : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : COLORS.text.secondary};
  border: ${props => props.variant === 'primary' ? 'none' : `1px solid ${COLORS.border.light}`};

  &:hover {
    opacity: 0.9;
    background: ${props => props.variant === 'outline' ? COLORS.background.main : undefined};
  }
`;

export default function GroupList({ groups }: GroupListProps) {
  const [search, setSearch] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const filteredGroups = groups.filter((group) =>
    group.group_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <ControlsBar>
        <SearchFilterGroup>
          <SearchInput>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
                placeholder="Search" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
          </SearchInput>
        </SearchFilterGroup>

        <ActionGroup>
          <Button variant="primary">Bulk message</Button>
          <Button variant="outline">
            Group Actions
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </ActionGroup>
      </ControlsBar>

      <ContentArea>
          <LeftPanel $isOpen={!!selectedGroupId}>
              <DataGrid 
                data={filteredGroups} 
                columns={groupColumns} 
                onRowClick={(row) => setSelectedGroupId(row.id)}
              />
          </LeftPanel>
          <RightPanel $isOpen={!!selectedGroupId}>
              <GroupDetailsPanel 
                groupId={selectedGroupId}
                groupName={groups.find(g => g.id === selectedGroupId)?.group_name}
                onClose={() => setSelectedGroupId(null)}
              />
          </RightPanel>
      </ContentArea>
    </Container>
  );
}
