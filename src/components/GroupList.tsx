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
  padding: 0 24px 24px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TopNav = styled.div`
  padding: 24px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${COLORS.text.muted};
`;

const ContentArea = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  gap: 0;
  border: 1px solid ${COLORS.border.light};
  border-radius: 12px;
  overflow: hidden;
  background: white; 
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
  margin-bottom: 24px;
`;

const SearchFilterGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const SearchInput = styled.div`
  position: relative;
  width: 320px;
  
  input {
    width: 100%;
    padding: 10px 12px 10px 40px;
    border: 1px solid ${COLORS.border.light};
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    color: ${COLORS.text.secondary};
    background: white;

    &:focus {
      border-color: ${COLORS.primary};
      box-shadow: 0 0 0 1px ${COLORS.primary};
    }
  }

  svg {
    position: absolute;
    left: 12px;
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
  padding: 10px 16px;
  border-radius: 8px;
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

const FilterButton = styled(Button)`
  color: ${COLORS.text.tertiary};
`;

export default function GroupList({ groups }: GroupListProps) {
  const [search, setSearch] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const filteredGroups = groups.filter((group) =>
    group.group_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <TopNav>
          <span>Dashboard</span>
          <span>/</span>
          <span style={{color: COLORS.text.primary, fontWeight: 500}}>Groups</span>
      </TopNav>

      <ControlsBar>
        <SearchFilterGroup>
          <SearchInput>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
                placeholder="Search" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
          </SearchInput>
          <FilterButton variant="outline">
               <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
               Filter
          </FilterButton>
        </SearchFilterGroup>

        <ActionGroup>
          <Button variant="primary">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              Bulk message
          </Button>
          <Button variant="outline">
            Group Actions
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
