import styled from "styled-components";
import { COLORS } from "../constants/colors";

const SidebarContainer = styled.div`
  width: 240px;
  background-color: ${COLORS.background.white};
  border-right: 1px solid ${COLORS.border.light};
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  flex-shrink: 0;
`;

const HeaderSection = styled.div`
  padding: 0 24px 24px 24px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const AppTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: ${COLORS.text.primary};
  font-weight: 700;
  font-size: 16px;
  line-height: 1.2;
`;

const SelectorIcon = styled.div`
  display: flex;
  flex-direction: column;
  color: ${COLORS.text.tertiary};
  
  svg {
    display: block;
  }
`;

const UserEmail = styled.span`
  font-size: 12px;
  color: ${COLORS.text.tertiary};
  margin-top: 2px;
  font-weight: 400;
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

const FooterSection = styled.div`
  padding: 16px 24px;
  margin-top: auto;
`;

const HelpItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${COLORS.text.tertiary};
  cursor: pointer;
  font-weight: 500;
  
  &:hover { color: ${COLORS.text.primary}; }
`;

export default function Sidebar() {
  return (
    <SidebarContainer>
      <HeaderSection>
        {/* Logo */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill={COLORS.primary} />
            <path d="M16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8ZM16 20C13.7909 20 12 18.2091 12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16C20 18.2091 18.2091 20 16 20Z" fill="white" />
        </svg>
        
        <HeaderText>
            <AppTitleRow>
                Periskope
                <SelectorIcon>
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginTop: -4}}><path d="M6 9l6 6 6-6"/></svg>
                </SelectorIcon>
            </AppTitleRow>
            <UserEmail>harshit@periskope.app</UserEmail>
        </HeaderText>
      </HeaderSection>

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

      <FooterSection>
        <HelpItem>
            {/* WhatsApp Logo for Help */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0117 2.00003C6.48834 2.00003 2.00003 6.48834 2.00003 12.0117C2.00003 13.9217 2.55334 15.6967 3.51834 17.2017L2.03834 22.1817L7.20668 20.8717C8.65334 21.7217 10.2983 22.1617 12.0033 22.1617H12.0117C17.535 22.1617 22.0234 17.6734 22.0234 12.15C22.0234 9.43836 20.9684 6.89169 19.0517 4.97503C17.135 3.05836 14.5967 2.00003 12.0117 2.00003ZM12.0117 20.4784C10.5183 20.4784 9.05668 20.0884 7.78003 19.3467L7.47668 19.1684L4.31834 19.9684L5.16668 16.9684L4.99003 16.6384C4.19169 15.28 3.77169 13.6817 3.77169 12.0117C3.77169 7.46836 7.46834 3.77169 12.0117 3.77169C14.2117 3.77169 16.2783 4.62836 17.8333 6.18336C19.39 7.73836 20.2467 9.80503 20.2467 12.0117C20.2467 16.555 16.5567 20.4784 12.0117 20.4784Z"/>
                <path d="M16.565 15.2C16.315 15.075 15.09 14.475 14.865 14.4C14.64 14.325 14.475 14.275 14.31 14.525C14.145 14.775 13.67 15.325 13.52 15.5C13.37 15.675 13.22 15.7 12.97 15.575C12.72 15.45 11.9167 15.195 10.9633 14.3633C10.22 13.715 9.71833 12.915 9.56833 12.665C9.41833 12.415 9.55333 12.2767 9.67833 12.1533C9.79166 12.04 9.92833 11.8583 10.0533 11.7133C10.1783 11.5683 10.2167 11.4583 10.3 11.2917C10.3833 11.125 10.3417 10.9833 10.2783 10.8583C10.2167 10.7333 9.71833 9.53333 9.51 9.04999C9.30833 8.57999 9.09999 8.64999 8.94999 8.64999C8.80833 8.64999 8.64166 8.64333 8.47499 8.64333C8.30833 8.64333 8.03833 8.705 7.80999 8.94999C7.58166 9.19499 6.93666 9.78499 6.93666 10.99C6.93666 12.195 7.83499 13.3617 7.96166 13.5283C8.08666 13.695 9.70833 16.0967 12.1933 17.1183C12.785 17.3617 13.2467 17.5067 13.6067 17.6183C14.2083 17.8067 14.7567 17.7783 15.19 17.7133C15.6717 17.6417 16.6717 17.12 16.8783 16.545C17.0867 15.97 17.0867 15.4783 17.025 15.375C16.9633 15.2717 16.815 15.2 16.565 15.2Z" fill="#25D366"/>
                <path d="M12.0117 20.4784C10.5183 20.4784 9.05668 20.0884 7.78003 19.3467L7.47668 19.1684L4.31834 19.9684L5.16668 16.9684L4.99003 16.6384C4.19169 15.28 3.77169 13.6817 3.77169 12.0117C3.77169 7.46836 7.46834 3.77169 12.0117 3.77169C14.2117 3.77169 16.2783 4.62836 17.8333 6.18336C19.39 7.73836 20.2467 9.80503 20.2467 12.0117C20.2467 16.555 16.5567 20.4784 12.0117 20.4784Z" fill="white" fillOpacity="0.01"/>
            </svg>
            Help & Support
        </HelpItem>
      </FooterSection>
    </SidebarContainer>
  );
}
