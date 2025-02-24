'use client';
// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import CustomChip from '@core/components/mui/Chip'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'
// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar
  const { data: session, status } = useSession();

  const getUserRole = async () => {
    if (session) return session.user.role;
    else return null;
  }

  useEffect(() => {
    getUserRole();
  }, [status, session]);

  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleSubmenuToggle = () => {
    setSubmenuOpen((prevOpen) => !prevOpen);
  };
  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
          className: 'bs-full overflow-y-auto overflow-x-hidden',
          onScroll: container => scrollMenu(container, false)
        }
        : {
          options: { wheelPropagation: false, suppressScrollX: true },
          onScrollY: container => scrollMenu(container, true)
        })}
    >
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href={`/${locale}/dashboard`}
          icon={<i className='tabler-home' />}
        >
          {dictionary['navigation'].home}
        </MenuItem>
        <MenuItem href={`/${locale}/search`}
          icon={<i className='tabler-search' />}
        >
          {dictionary['navigation'].search}
        </MenuItem>
        <MenuItem href={`/${locale}/subscription`}
          icon={<i className='tabler-currency-dollar' />}
        >
          {dictionary['navigation'].subScription}
        </MenuItem>
        <MenuItem href={`/${locale}/support`}
          icon={<i className='tabler-help' />}
        >
          {dictionary['navigation'].support}
        </MenuItem>
        <MenuItem href={`/${locale}/privacy`}
          icon={<i className='tabler-shield-question' />}
        >
          Privacy Policy
        </MenuItem>
        <SubMenu label={dictionary['navigation'].accountSetting}
          icon={<i className='tabler-user' />}
        >
          <MenuItem href={`/${locale}/profile`}>{dictionary['navigation'].profile}</MenuItem>
          <MenuItem href={`/${locale}/transactions`}>{dictionary['navigation'].transactionHistory}</MenuItem>
        </SubMenu>
        {getUserRole() === 'admin' && (
          <MenuSection label={dictionary['navigation'].adminPanel}>
            <SubMenu label={dictionary['navigation'].administrator} icon={<i className='tabler-lock' />}>
              <MenuItem href={`/${locale}/admin/settings`}>{dictionary['navigation'].settings}</MenuItem>
              <MenuItem href={`/${locale}/admin/users`}>{dictionary['navigation'].userManagement}</MenuItem>
              <MenuItem href={`/${locale}/admin/affiliate-settings`}>{dictionary['navigation'].affiliateSettings}</MenuItem>
              <MenuItem href={`/${locale}/admin/content`}>{dictionary['navigation'].content}</MenuItem>
              <MenuItem href={`/${locale}/admin/notifications`}>{dictionary['navigation'].notifications}</MenuItem>
              <MenuItem href={`/${locale}/admin/logs`}>{dictionary['navigation'].logs}</MenuItem>
            </SubMenu>
          </MenuSection>
        )}
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
