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
        {/* Logo */}
        <img src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://periskope.app/&size=64" alt="Periskope" style={{width: 32, height: 32, borderRadius: 8}} />
        
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
            {/* Dashboard - Filled Home */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text.tertiary} xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Dashboard
        </NavItem>
        <NavItem>
            {/* Chats - Filled Bubbles */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text.tertiary} xmlns="http://www.w3.org/2000/svg">
                <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
            </svg>
            Chats
            <Badge>99+</Badge>
        </NavItem>
        <NavItem $active>
            {/* Groups - Filled 3 People */}
             <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-7.5-3.25z"/>
                <path d="M12.5 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
                <path d="M7.5 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
                <path d="M17.5 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
            </svg>
            Groups
        </NavItem>
        <NavItem>
             {/* Contacts - Filled Notebook */}
             <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text.tertiary} xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
             </svg>
             Contacts
        </NavItem>
        <NavItem>
            {/* Logs - Filled Bell */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text.tertiary} xmlns="http://www.w3.org/2000/svg">
                 <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
            </svg>
            Logs
        </NavItem>
        <NavItem>
             {/* Files - Filled Folder */}
             <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text.tertiary} xmlns="http://www.w3.org/2000/svg">
                 <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
             </svg>
            Files
        </NavItem>
        <NavItem>
            {/* Settings - Filled Gear (Cleaner) */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.text.tertiary} xmlns="http://www.w3.org/2000/svg">
                <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
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
