import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../constants/colors";
import { useGroupDetails } from "../hooks/useGroupDetails";
import { type WhatsAppGroup } from "../types/group";

type Props = {
  groupData: WhatsAppGroup | null;
  onClose: () => void;
};



// Helper to generate consistent random image URL (Duplicated from Columns for now, ideally shared)
const getAvatarUrl = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const id = Math.abs(hash) % 1000;
    return `https://picsum.photos/id/${id}/200/200`;
};

const PanelContainer = styled.div`
  background: ${COLORS.background.white};
  border-left: 1px solid ${COLORS.border.light};
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ContentScroller = styled.div`
    flex: 1;
    overflow-y: auto;
    padding-bottom: 24px;
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

const AvatarImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: ${COLORS.background.alt};
`;

const GroupName = styled.h2`
  font-size: 16px;
  font-weight: 700;
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
  font-size: 13px;
  
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
  font-weight: 600;
  color: ${props => props.$active ? COLORS.primary : COLORS.text.muted};
  border-bottom: 2px solid ${props => props.$active ? COLORS.primary : "transparent"};
  cursor: pointer;
`;

const Content = styled.div`
  padding: 0 24px;
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
  color: ${COLORS.text.primary};
  font-weight: 600;
  text-align: right;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-end;
`;

const Pill = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid ${COLORS.border.light};
  border-radius: 20px;
  font-size: 13px;
  color: ${COLORS.text.secondary};
  background: white;
  margin-bottom: 8px;
  width: fit-content;
  margin-left: auto;
  font-weight: 500;
`;

const ProjectTag = styled.span<{ $isDemo: boolean }>`
    background-color: ${props => props.$isDemo ? COLORS.tags.demoBg : COLORS.tags.clientsBg};
    color: ${props => props.$isDemo ? COLORS.tags.demo : COLORS.tags.clients};
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${COLORS.border.light};
  margin: 24px 0;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  color: ${COLORS.text.tertiary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 0;
  
  &:hover {
    color: ${COLORS.text.primary};
  }
  
  &.danger {
    color: ${COLORS.danger};
    &:hover { color: ${COLORS.dangerHover}; }
  }
`;



// Moved to top

// ... (keep styled components same until IssueCard) ...
// Note: I need to preserve the imports and styled components above line 197. 
// But replace_file_content needs to match exact text. 
// Since I can't match the whole file easily without reading it all (which I have), I will target the component definition part.

const BottomInfoBar = styled.div`
    padding: 16px 24px;
    background: white;
    border: 1px solid ${COLORS.border.light};
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 24px; 
`;

export default function GroupDetailsPanel({ groupData, onClose: _onClose }: Props) {
  const { group: fetchedGroup } = useGroupDetails(groupData?.id || null);
  const [activeTab, setActiveTab] = useState("Overview");

  if (!groupData) return null;

  // Merge passed data with fetched details
  const displayGroup = { ...groupData, ...fetchedGroup };
  const avatarUrl = getAvatarUrl(displayGroup.group_name || displayGroup.id);

  return (
    <PanelContainer>
      <ContentScroller>
            <>
            <Header>
                <GroupIdentity>
                <AvatarImg src={avatarUrl} alt={displayGroup.group_name} />
                <GroupName>
                    {displayGroup.group_name || "Unknown Group"} 
                </GroupName>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
                     <Refresh>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        Refresh
                    </Refresh>
                    {/* Close button removed as requested */}
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
                            <Value>{displayGroup.last_active || "03:17"}</Value> 
                        </FieldRow>
                        <FieldRow>
                            <Label>Disappearing Messages</Label>
                            <Value>
                                {fetchedGroup?.disappearing_messages ? "ON" : "OFF"} 
                                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{marginTop: 1}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                            </Value>
                        </FieldRow>
                        <FieldRow>
                            <Label>Send Message Permission</Label>
                            <Value>
                                {fetchedGroup?.send_message_permission || "All"}
                                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{marginTop: 1}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                            </Value>
                        </FieldRow>
                        
                        <FieldRow>
                            <Label>Project</Label>
                            <ProjectTag $isDemo={displayGroup.project === "Demo" || displayGroup.project === "Internal"}>
                                {displayGroup.project === "Demo" || displayGroup.project === "Internal" ? "# Demo" : "# Clients"}
                            </ProjectTag>
                        </FieldRow>
                        
                        <div style={{display: "flex", justifyContent: "space-between", marginBottom: 20}}>
                            <Label style={{paddingTop: 8}}>Labels</Label>
                            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
                                {displayGroup.labels?.map(l => (
                                   <Pill key={l}>
                                       <span style={{width: 8, height: 8, borderRadius: "50%", background: l.includes("High") ? COLORS.labels.high : l.includes("Priority") ? COLORS.labels.priority : COLORS.labels.pilot}}></span>
                                       {l}
                                   </Pill>
                                ))}
                                <Pill style={{color: COLORS.text.light}}>
                                    + Add Label
                                </Pill>
                            </div>
                        </div>

                        <Divider />

                        <div style={{ paddingBottom: 24 }}>
                            <ActionButton>
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{color: COLORS.text.tertiary}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Export Chat
                            </ActionButton>
                            <ActionButton className="danger">
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={COLORS.danger}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                Exit Group
                            </ActionButton>

                            {/* Footer / Issues Card now here under actions */}
                            <BottomInfoBar>
                                <div style={{display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.text.light}}>
                                    <span>PER-011 | {displayGroup.group_name}</span>
                                    <div style={{width: 20, height: 20, background: COLORS.secondary, color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold"}}>H</div>
                                </div>
                                <div style={{display: "flex", gap: 8, alignItems: "center", fontSize: 13, fontWeight: 500, color: COLORS.text.primary}}>
                                    <span style={{color: COLORS.danger, fontWeight: "bold"}}>○</span>
                                    Issues with mentions on groups
                                </div>
                                <div style={{display: "flex", alignItems: "center", gap: 12, marginTop: 4}}>
                                    <div style={{display: "flex", gap: 4, alignItems: "center", padding: "2px 6px", border: `1px solid ${COLORS.border.light}`, borderRadius: 4}}>
                                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={COLORS.text.tertiary}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                    </div>
                                    <div style={{display: "flex", gap: 4, alignItems: "center", padding: "2px 6px", border: `1px solid ${COLORS.border.light}`, borderRadius: 4, fontSize: 12, color: COLORS.text.tertiary}}>
                                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={COLORS.danger}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        Dec 22
                                    </div>
                                    <div style={{display: "flex", gap: 4, alignItems: "center", padding: "2px 6px", border: `1px solid ${COLORS.border.light}`, borderRadius: 4, fontSize: 12, color: COLORS.text.tertiary}}>
                                        <span style={{width: 6, height: 6, background: COLORS.text.primary, borderRadius: "50%"}}></span>
                                        client
                                    </div>
                                    <span style={{marginLeft: "auto", fontSize: 12, color: COLORS.text.light}}>3 days</span>
                                </div>
                            </BottomInfoBar>
                        </div>
                    </>
                )}
                 {activeTab !== "Overview" && <div style={{padding: 20, textAlign: "center", color: COLORS.text.light}}>No data available</div>}
            </Content>
            </>
      </ContentScroller>
    </PanelContainer>
  );
}
