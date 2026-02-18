import styled from "styled-components";
import { COLORS } from "../constants/colors";

const SidebarContainer = styled.div`
  width: 240px;
  background-color: ${COLORS.background.white};
  border-right: 1px solid ${COLORS.border.light};
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  flex-shrink: 0;
`;

const LogoArea = styled.div`
  padding: 0 24px 32px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 20px;
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
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${COLORS.background.alt};
  color: ${COLORS.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${COLORS.text.primary};
`;

const UserEmail = styled.span`
  font-size: 12px;
  color: ${COLORS.text.light};
`;

const HelpItem = styled.div`
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
        {/* Placeholder Logo - Simple geometric shape */}
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="32" height="32" rx="8" fill={COLORS.primary}/>
            <path d="M16 8V24M8 16H24" stroke="white" strokeWidth="4" strokeLinecap="round"/> 
            {/* Simple plus/cross for mockup */}
        </svg>
        <span>Periskope</span>
      </LogoArea>

      <NavList>
        <NavItem>
            <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text.tertiary} xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            Dashboard
        </NavItem>
        <NavItem>
            {/* Chats - Filled Bubble */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text.tertiary} xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
            Chats
            <Badge>99+</Badge>
        </NavItem>
        <NavItem $active>
            {/* Groups - Filled People */}
             <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            Groups
        </NavItem>
        <NavItem>
             {/* Contacts - Filled User Box */}
             <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text.tertiary} xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
             </svg>
             Contacts
        </NavItem>
        <NavItem>
            {/* Logs - Filled List */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text.tertiary} xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            Logs
        </NavItem>
        <NavItem>
             {/* Files - Filled Folder */}
             <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text.tertiary} xmlns="http://www.w3.org/2000/svg">
                 <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
             </svg>
            Files
        </NavItem>
        <NavItem>
            {/* Settings - Filled Gear */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text.tertiary} xmlns="http://www.w3.org/2000/svg">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L5.09 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
            Settings
        </NavItem>
      </NavList>

      <UserSection>
        <HelpItem>
            <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text.tertiary} xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
            Help & Support
        </HelpItem>

        <UserProfile>
            <UserAvatar>H</UserAvatar>
            <UserInfo>
                <UserName>Harshit</UserName>
                <UserEmail>harshit@periskope.app</UserEmail>
            </UserInfo>
        </UserProfile>

        <a style={{display: "flex", alignItems: "center", gap: 8, color: COLORS.danger, textDecoration: "none", fontSize: 13, cursor: "pointer", marginLeft: 4}}>
             <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
             Logout
        </a>
      </UserSection>
    </SidebarContainer>
  );
}
