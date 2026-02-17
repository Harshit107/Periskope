import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../constants/colors";
import { useGroupDetails } from "../hooks/useGroupDetails";

type Props = {
  groupId: string | null;
  groupName?: string;
  onClose: () => void;
};

const PanelContainer = styled.div`
  background: ${COLORS.background.white};
  border-left: 1px solid ${COLORS.border.light};
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 24px 24px 0 24px;
`;

const GroupIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${COLORS.secondaryLight};
  color: ${COLORS.secondaryText};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
`;

const GroupName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.text.primary};
  margin: 0;
`;

const Refresh = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: ${COLORS.text.light};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  
  &:hover {
    color: ${COLORS.text.muted};
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 24px;
  border-bottom: 1px solid ${COLORS.border.light};
  margin-bottom: 24px;
`;

const Tab = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding-bottom: 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.$active ? COLORS.primary : COLORS.text.muted};
  border-bottom: 2px solid ${props => props.$active ? COLORS.primary : "transparent"};
  cursor: pointer;
`;

const Content = styled.div`
  padding: 0 24px 24px 24px;
  flex: 1;
`;

const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
`;

const Label = styled.div`
  color: ${COLORS.text.light};
`;

const Value = styled.div`
  color: ${COLORS.text.secondary};
  font-weight: 500;
  text-align: right;
`;

const Pill = styled.span<{ $color?: string; $bg?: string }>`
  background: ${props => props.$bg || COLORS.background.alt};
  color: ${props => props.$color || COLORS.text.secondary};
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  display: inline-block;
  margin-left: 4px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${COLORS.background.alt};
  margin: 24px 0;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${COLORS.text.muted};
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 16px;
  
  &:hover {
    color: ${COLORS.text.secondary};
  }
  
  &.danger {
    color: ${COLORS.danger};
    &:hover { color: ${COLORS.dangerHover}; }
  }
`;

const IssueCard = styled.div`
  background: ${COLORS.dangerBg};
  border: 1px solid ${COLORS.dangerBorder};
  border-radius: 8px;
  padding: 16px;
  margin-top: 24px;
`;

const IssueHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${COLORS.dangerText};
  font-size: 12px;
  margin-bottom: 4px;
`;

const IssueTitle = styled.div`
  font-weight: 600;
  color: ${COLORS.dangerText};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const LoadingState = styled.div`
  padding: 40px;
  text-align: center;
  color: ${COLORS.text.muted};
`;

export default function GroupDetailsPanel({ groupId, groupName, onClose }: Props) {
  const { group, loading } = useGroupDetails(groupId);
  const [activeTab, setActiveTab] = useState("Overview");

  if (!groupId) return null;

  return (
    <PanelContainer>
      {loading ? (
        <LoadingState>Loading details...</LoadingState>
      ) : group ? (
        <>
          <Header>
            <GroupIdentity>
              <Avatar>{groupName?.charAt(0) || group.group_id?.charAt(0) || group.project?.charAt(0) || "G"}</Avatar>
              <GroupName>
                   {groupName || group.group_id || "Unknown Group"} 
              </GroupName>
              <div style={{marginLeft: "auto", display: "flex", gap: 12}}>
                  <Refresh onClick={onClose} style={{color: COLORS.text.muted}}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </Refresh>
                  <Refresh>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      Refresh
                  </Refresh>
              </div>
            </GroupIdentity>

            <Tabs>
              <Tab $active={activeTab === "Overview"} onClick={() => setActiveTab("Overview")}>Overview</Tab>
              <Tab $active={activeTab === "Members"} onClick={() => setActiveTab("Members")}>Members</Tab>
              <Tab $active={activeTab === "Logs"} onClick={() => setActiveTab("Logs")}>Logs</Tab>
            </Tabs>
          </Header>

          <Content>
            {activeTab === "Overview" && (
                <>
                    <FieldRow>
                        <Label>Last Active</Label>
                        <Value>{group.last_active || "03:17"}</Value> 
                    </FieldRow>
                    <FieldRow>
                        <Label>Disappearing Messages</Label>
                        <Value>{group.disappearing_messages ? "ON" : "OFF"}</Value>
                    </FieldRow>
                    <FieldRow>
                        <Label>Send Message Permission</Label>
                        <Value>{group.send_message_permission || "All"}</Value>
                    </FieldRow>
                    <FieldRow>
                        <Label>Project</Label>
                        <Value style={{color: COLORS.secondary}}>{group.project}</Value>
                    </FieldRow>
                    <FieldRow>
                        <Label>Labels</Label>
                        <div style={{textAlign: "right"}}>
                           {group.labels?.map(l => (
                               <Pill key={l} $bg={l.includes("High") ? COLORS.dangerBg : COLORS.background.alt} $color={l.includes("High") ? COLORS.danger : COLORS.text.secondary}>
                                   ● {l}
                               </Pill>
                           ))}
                           <Pill $bg={COLORS.background.white} $color={COLORS.text.light} style={{border: `1px solid ${COLORS.border.light}`}}>+ Add Label</Pill>
                        </div>
                    </FieldRow>

                    <Divider />

                    <ActionButton>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Export Chat
                    </ActionButton>
                    <ActionButton className="danger">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Exit Group
                    </ActionButton>

                    {group.issue_title && (
                        <IssueCard>
                            <IssueHeader>
                                <span>{group.issue_tag || "PER-011"} | {group.group_id}</span>
                                <div style={{width: 20, height: 20, background: COLORS.text.tertiary, color: COLORS.text.white, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10}}>H</div>
                            </IssueHeader>
                            <IssueTitle>
                                <span style={{color: COLORS.danger, fontWeight: "bold"}}>○</span>
                                {group.issue_title}
                            </IssueTitle>
                            <div style={{display: "flex", gap: 8, fontSize: 12, alignItems: "center"}}>
                                <span style={{display: "flex", alignItems: "center", gap: 4, color: COLORS.text.muted}}>
                                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                    {group.issue_date || "Dec 22"}
                                </span>
                                <Pill $bg="white" $color={COLORS.text.tertiary} style={{border: `1px solid ${COLORS.border.light}`}}>client</Pill>
                                <span style={{marginLeft: "auto", color: COLORS.text.light}}>3 days</span>
                            </div>
                        </IssueCard>
                    )}
                </>
            )}
            
            {activeTab !== "Overview" && <div style={{padding: 20, textAlign: "center", color: COLORS.text.light}}>Tab content implementation pending</div>}

          </Content>
        </>
      ) : (
        <LoadingState>Select a group to view details</LoadingState>
      )}
    </PanelContainer>
  );
}
