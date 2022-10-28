import React, { useState, useRef, useEffect } from 'react'
import { useTheme as useOriginalTheme } from 'styled-components'
import { useTheme } from '../../../contexts/ThemeContext'
import { Button, IconButton, Input } from '../../../styles'
import HiOutlineSearch from '@meronex/icons/hi/HiOutlineSearch'
import FiChevronDown from '@meronex/icons/fi/FiChevronDown'
import EnChevronRight from '@meronex/icons/en/EnChevronRight'
import BsList from '@meronex/icons/bs/BsList'
import MdcClose from '@meronex/icons/mdc/MdcClose'
import { useNavigate } from 'react-router-dom'
import { useWindowSize } from '../../../hooks/useWindowSize'
import { Accordion } from '../../shared'
import { useSession } from '../../../contexts/SessionContext'
import { usePopper } from 'react-popper'
import BsPower from '@meronex/icons/bs/BsPower'
import BiSun from '@meronex/icons/bi/BiSun'
import BiMoon from '@meronex/icons/bi/BiMoon'

import {
  Container,
  InnerContainer,
  LeftWrapper,
  SearchWrapper,
  MenuItem,
  MenuListWrapper,
  MenuItemContent,
  RightWrapper,
  DropDownList,
  DropDownItem,
  OverLay,
  MobileMenuWrapper,
  MobileMenuItem,
  LogoWrapper,
  MobileLoginWrapper,
  CloseIcon,
  MobileDropDown,
  DashboardBtnWrapper,
  AccountWrapper,
  RoundLogoWrapper,
  DashboardMenuList,
  UserInfoWrapper,
  LogoutWrapper,
  MobileDashboardMenuWrapper,
  ThemeMode
} from './styles'

export const Header = (props) => {
  const { pathname } = props

  const themeOriginal = useOriginalTheme()
  const [theme, { toggleDarkMode }] = useTheme()
  const [{ auth, user }, { logout }] = useSession()
  const navigate = useNavigate()
  const { width } = useWindowSize()
  
  const [isMobileMenu, setIsMobileMenu] = useState(false)
  const [open, setOpen] = useState(false)
  const referenceElement = useRef()
  const popperElement = useRef()
  const email =  localStorage.getItem('email')
  const popper = usePopper(referenceElement.current, popperElement.current, {
    placement: 'bottom-end',
    modifiers: [
      { name: 'arrow' },
      {
        name: 'offset',
        options: {
          offset: [0, 12]
        }
      }
    ]
  })
  
  const { styles, attributes } = popper

  const handleClickOutside = (e) => {
    if (!open) return
    const outsidePopover = !popperElement.current?.contains(e.target)
    const outsidePopoverMenu = !referenceElement.current?.contains(e.target)
    if (outsidePopover && outsidePopoverMenu) {
      setOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleClickOutside)
    return () => {
      window.removeEventListener('mouseup', handleClickOutside)
    }
  }, [open])

  const popStyle = { ...styles.popper, visibility: open ? 'visible' : 'hidden', minWidth: '150px' }
  if (!open) {
    popStyle.transform = 'translate3d(0px, 0px, 0px)'
  }


  const browseSubMenuList = [
    { path: '/browse', params: '', title: 'All Business'},
    { path: '/browse', params: '?sort=trending', title: 'Trending Business'},
    { path: '/browse', params: '?sort=recently_created', title: 'Categories'},
    // { path: '/browse', params: '?creator_type=VERIFIED_CREATOR', title: 'Verified Artists'},
    { path: '/originals', params: '', title: 'BlockReward Collection'}
  ]

  const resourceSubMenuList = [
    { path: '/about', title: 'About BlockRewrad'},
    { path: '/help', title: 'Partner with Us'},
    { path: '/faq', title: 'FAQ'},
    { path: '/code', title: 'Got a claim code'},
    { path: '/press', title: 'Press'}
  ]

  const dashboardMenuList = [
    { path: '/u/account', title: 'Accoount'},
    { path: '/u/profile', title: 'Profile'},
    { path: '/help', title: 'Help Center'}
  ]

  const handleClickMenu = (path, params) => {
    const query = params ?? ''
    setIsMobileMenu(false)
    navigate(`${path}${query}`, { state: { active: true } });
  }

  const handleLogOut = () => {
    logout()
  }

  return (
    <>
      <Container noShadow={pathname.includes('/u/') || pathname.includes('/c/')}>
        <InnerContainer>
          <LeftWrapper>
            <img src={theme?.isLightMode ? themeOriginal.images.logoDark : themeOriginal.images.logo} alt='logo' onClick={() => navigate('/')} />
            {width > 576 && (
              <SearchWrapper>
                <Input
                  placeholder='Search...'
                />
                <HiOutlineSearch />
              </SearchWrapper>
            )}
            {width > 994 && (
              <MenuListWrapper>
                <MenuItem>
                  <MenuItemContent>
                    <span>Browse</span>
                    <FiChevronDown />
                  </MenuItemContent>
                  <DropDownList className='drop-down'>
                    {browseSubMenuList.map((subMenu, i) => (
                      <DropDownItem key={i} onClick={() => handleClickMenu(subMenu.path, subMenu.params)}>
                        <span>{subMenu.title}</span>
                        <EnChevronRight />
                      </DropDownItem>
                    ))}
                  </DropDownList>
                </MenuItem>
                <MenuItem>
                  <MenuItemContent onClick={() => navigate('/lmwr')}>
                    <span>About Block Reward Token</span>
                  </MenuItemContent>
                </MenuItem>
                <MenuItem>
                  <MenuItemContent>
                    <span>Resources</span>
                    <FiChevronDown />
                  </MenuItemContent>
                  <DropDownList className='drop-down'>
                    {resourceSubMenuList.map((subMenu, i) => (
                      <DropDownItem key={i} onClick={() => navigate(subMenu.path)}>
                        <span>{subMenu.title}</span>
                        <EnChevronRight />
                      </DropDownItem>
                    ))}
                  </DropDownList>
                </MenuItem>
              </MenuListWrapper>
            )}
          </LeftWrapper>
          <RightWrapper>
            <ThemeMode onClick={() => toggleDarkMode()}>
              {theme?.isLightMode ? <BiSun /> : <BiMoon />}
            </ThemeMode>
            {width > 769 && (
              <>
                {auth ? (
                  <DashboardBtnWrapper>
                    <Button color='primary' naked onClick={() => navigate('/u/dashboard', { state: { active: true } })}>Dashboard</Button>
                    <AccountWrapper>
                      <RoundLogoWrapper
                        ref={referenceElement}
                        onClick={() => setOpen(!open)}
                      >
                        <img src={themeOriginal.images.roundLogo} alt='round-logo' />
                      </RoundLogoWrapper>
                      <DashboardMenuList ref={popperElement} style={popStyle} {...attributes.popper}>
                        <UserInfoWrapper>
                           <span>{user.passwordHash?user.passwordHash.split('.')[1]:user.split('.')[0]}</span>
                          <span className='email'>{email}</span>
                        </UserInfoWrapper>
                        {dashboardMenuList.map((menu, i) => (
                          <DropDownItem key={i} onClick={() => navigate(menu.path)}>
                            <span>{menu.title}</span>
                            <EnChevronRight />
                          </DropDownItem>
                        ))}
                        <LogoutWrapper onClick={() => handleLogOut()}>
                          <BsPower />
                          <span>Logout</span>
                        </LogoutWrapper>
                      </DashboardMenuList>
                    </AccountWrapper>
                  </DashboardBtnWrapper>
                ) : (
                  <>
                    <Button
                      color='primary'
                      naked
                      onClick={() => navigate('./login')}
                    >Log In</Button>
                    <Button
                      color='primary'
                      onClick={() => navigate('./signup')}
                    >Sign Up</Button>
                  </>
                )}
              </>
            )}
            {width < 994 && (
              <IconButton onClick={() => setIsMobileMenu(true)}>
                <BsList />
              </IconButton>
            )}
          </RightWrapper>
        </InnerContainer>
      </Container>
      <MobileMenuWrapper style={{ width: isMobileMenu && '75%' }}>
        <div>
          <CloseIcon onClick={() => setIsMobileMenu(false)}>
            <MdcClose />
          </CloseIcon>
          <LogoWrapper>
            <img src={theme?.isLightMode ? themeOriginal.images.logoDark : themeOriginal.images.logo} alt='logo' onClick={() => navigate('/')} />
          </LogoWrapper>
            {width < 576 && (
              <SearchWrapper>
                <Input
                  placeholder='Search...'
                />
                <HiOutlineSearch />
              </SearchWrapper>
            )}
            <Accordion
              title='Browse'
              headerStyle={{ fontSize: '16px', paddingRight: '0px' }}
            >
              <MobileDropDown>
                {browseSubMenuList.map((subMenu, i) => (
                  <div key={i} onClick={() => handleClickMenu(subMenu.path, subMenu.params)}>{subMenu?.title}</div>
                ))}
              </MobileDropDown>
            </Accordion>
            <MobileMenuItem onClick={() => handleClickMenu('/lmwr')}>
              <span>About Block Reward Token</span>
            </MobileMenuItem>
            <Accordion
              title='Resources'
              headerStyle={{ fontSize: '16px', paddingRight: '0px' }}
            >
              <MobileDropDown>
                {resourceSubMenuList.map((subMenu, i) => (
                  <div key={i} onClick={() => handleClickMenu(subMenu.path, subMenu.params)}>{subMenu?.title}</div>
                ))}
              </MobileDropDown>
            </Accordion>
            {width < 769 && (
              <>
                {auth ? (
                  <MobileDashboardMenuWrapper>
                    <h2 onClick={() => handleClickMenu('/u/dashboard')}>Dashboard</h2>
                    {dashboardMenuList.map((menu, i) => (
                      <MobileMenuItem key={i} onClick={() => handleClickMenu(menu.path)}>
                        <span>{menu.title}</span>
                      </MobileMenuItem>
                    ))}
                    <MobileMenuItem onClick={() => handleLogOut()}>
                        <span>Logout</span>
                      </MobileMenuItem>
                  </MobileDashboardMenuWrapper>
                ) : (
                  <MobileLoginWrapper>
                    <Button
                      color='primary'
                      naked
                    >Log In</Button>
                    <Button
                      color='primary'
                    >Sign Up</Button>
                  </MobileLoginWrapper>
                )}
              </>
            )}
        </div>
      </MobileMenuWrapper>
      {isMobileMenu && (
        <OverLay onClick={() => setIsMobileMenu(false)} />
      )}
    </>
  )
}
