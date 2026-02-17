import styled from "styled-components";
import { COLORS } from "../constants/colors";

const SidebarContainer = styled.div`
  width: 240px;
  background-color: ${COLORS.background.white};
  border-right: 1px solid ${COLORS.border.light};
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  flex-shrink: 0;
`;

const LogoArea = styled.div`
  padding: 0 24px 24px 24px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 18px;
  color: ${COLORS.text.primary};
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const NavItem = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 24px;
  color: ${props => props.$active ? COLORS.primary : COLORS.text.tertiary};
  background: ${props => props.$active ? COLORS.primaryLight : "transparent"};
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  border-left: 3px solid ${props => props.$active ? COLORS.primary : "transparent"};

  &:hover {
    background: ${props => props.$active ? COLORS.primaryLight : COLORS.background.hover};
    color: ${props => props.$active ? COLORS.primary : COLORS.text.primary};
  }
`;

const Badge = styled.span`
  background: ${COLORS.primary};
  color: ${COLORS.text.white};
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: auto;
`;

const UserSection = styled.div`
  padding: 24px;
  border-top: 1px solid ${COLORS.border.light};
  margin-top: auto;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${COLORS.text.tertiary};
  cursor: pointer;
  
  &:hover { color: ${COLORS.text.primary}; }
`;

export default function Sidebar() {
  return (
    <SidebarContainer>
      <LogoArea>
        <div style={{width: 24, height: 24, background: COLORS.primary, borderRadius: 6}}></div>
        Periskope
      </LogoArea>

      <NavList>
        <NavItem>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Dashboard
        </NavItem>
        <NavItem>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Chats
            <Badge>99+</Badge>
        </NavItem>
        <NavItem $active>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Groups
        </NavItem>
        <NavItem>
             <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
             Contacts
        </NavItem>
        <NavItem>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            Logs
        </NavItem>
        <NavItem>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
            Files
        </NavItem>
        <NavItem>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Settings
        </NavItem>
      </NavList>

      <UserSection>
        <UserItem>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Help & Support
        </UserItem>
      </UserSection>
    </SidebarContainer>
  );
}
