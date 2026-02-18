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
  padding: 16px 0 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .title-area {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 600;
    color: ${COLORS.text.primary};

    svg {
      color: ${COLORS.text.secondary};
    }
  }

  .actions-area {
    display: flex;
    align-items: center;
    gap: 16px;

    button.secondary {
      background: white;
      border: 1px solid ${COLORS.border.light};
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      color: ${COLORS.text.secondary};
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;

      &:hover {
        background: ${COLORS.background.hover};
      }
    }

    .status-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border: 1px solid ${COLORS.border.light};
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
      color: ${COLORS.text.primary};
      background: white;

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${COLORS.primary}; /* Green */
      }
    }

    .notification-bell {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid ${COLORS.border.light};
      border-radius: 6px;
      background: white;
      color: ${COLORS.text.secondary};
      cursor: pointer;
      
      &:hover {
        background: ${COLORS.background.hover};
      }
    }
  }
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
  padding: 16px 24px;
  border-bottom: 1px solid ${COLORS.border.light};
`;

const SearchFilterGroup = styled.div`
  display: flex;
  align-items: center;
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
        <div className="title-area">
           {/* Groups Icon */}
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
           groups
        </div>
        <div className="actions-area">
          <button className="secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            Docs
          </button>
          <div className="status-pill">
            <div className="dot" />
            +91 90043 89372
          </div>
          <button className="notification-bell">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
        </div>
      </TopNav>

      <ContentArea>
          <LeftPanel $isOpen={!!selectedGroupId}>
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
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginLeft: "4px" }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </Button>
                </ActionGroup>
              </ControlsBar>

              <DataGrid 
                data={filteredGroups} 
                columns={groupColumns} 
                onRowClick={(row) => setSelectedGroupId(row.id)}
              />
          </LeftPanel>
          <RightPanel $isOpen={!!selectedGroupId}>
              {selectedGroupId && (
                  <GroupDetailsPanel 
                    groupId={selectedGroupId}
                    onClose={() => setSelectedGroupId(null)}
                  />
              )}
          </RightPanel>
      </ContentArea>
    </Container>
  );
}
