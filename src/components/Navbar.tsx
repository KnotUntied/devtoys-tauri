import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ActionIcon,
  Autocomplete,
  Box,
  CloseButton,
  Divider,
  Drawer,
  MantineProvider,
  Menu,
  Navbar as NavbarBase,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core'
import { getHotkeyHandler, useMediaQuery } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons'
import { desktopBreakpoint } from '../const'
import { Tool, toolGroups, tools, homeData, settingsData } from '../data'

const searchData = tools.map((tool) => ({ value: tool.title, slug: tool.slug }))

interface NavbarLinkProps {
  data: Tool
  expanded: boolean
  location: string
}

const NavbarLink = ({ data, expanded, location }: NavbarLinkProps) => {
  return expanded
    ? (
      <NavLink
        icon={<data.icon size={16} />}
        label={data.title}
        component={Link}
        to={`/${data.slug}`}
        active={location === `/${data.slug}`}
        noWrap
      />
    )
    : (
      <Tooltip
        label={data.title}
        position="right"
        transitionDuration={0}
        withArrow
      >
        <NavLink
          icon={<data.icon size={16}/>}
          component={Link}
          to={`/${data.slug}`}
          active={location === `/${data.slug}`}
        />
      </Tooltip>
    )
}

interface NavbarProps {
  expanded: boolean
  handlers: {
    readonly open: () => void
    readonly close: () => void
    readonly toggle: () => void
  }
}

export default function Navbar({ expanded, handlers }: NavbarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const searchRef = useRef<HTMLInputElement>(null)
  const smallScreen = useMediaQuery(`(max-width: ${desktopBreakpoint}px)`)
  const [searchFocus, setSearchFocus] = useState<boolean>(false)

  useEffect(() => {
    if (searchFocus) {
      searchRef.current?.focus()
      setSearchFocus(false)
    }
  }, [searchFocus])

  const handleSearch = () => searchQuery && navigate(`/search?q=${searchQuery}`)

  const navbarSearch = (
    <Autocomplete
      ref={searchRef}
      value={searchQuery}
      onChange={setSearchQuery}
      placeholder="Type to search for tools..."
      data={searchData}
      limit={50}
      maxDropdownHeight={360}
      nothingFound="No results found"
      onItemSubmit={item => navigate(`/${item.slug}`)}
      onKeyDown={getHotkeyHandler([
        ['Enter', handleSearch]
      ])}
      rightSection={
        <ActionIcon onClick={handleSearch}>
          <IconSearch size={16} />
        </ActionIcon>
      }
      style={{ display: expanded ? 'block' : 'none' }}
      sx={{ input: { height: 40 } }}
    />
  )

  const navbarSearchCollapsed = !expanded && (
    <Tooltip
      label="Click to search"
      position="right"
      transitionDuration={0}
      withArrow
    >
      <NavLink
        icon={<IconSearch size={16}/>}
        onClick={() => {
          handlers.open()
          setSearchFocus(true)
        }}
      />
    </Tooltip>
  )

  const navbarCategories = toolGroups.map(toolGroup => 
    expanded
    ? (
      <NavLink
        key={toolGroup.slug}
        icon={<toolGroup.icon size={16} />}
        label={toolGroup.title}
        active={location.pathname === `/${toolGroup.slug}`}
        childrenOffset={0}
        onClick={() => navigate(`/${toolGroup.slug}`)}
        noWrap
      >
        {toolGroup.tools.map(tool => 
          <NavLink
            key={tool.slug}
            icon={<tool.icon size={16} />}
            label={tool.titleShort}
            component={Link}
            to={`/${tool.slug}`}
            active={location.pathname === `/${tool.slug}`}
            pl={40}
          />
        )}
      </NavLink>
    )
    : (
      <Menu
        key={toolGroup.slug}
        position="right-start"
        withinPortal
      >
        <Menu.Target>
          <NavLink
            icon={<toolGroup.icon size={16} />}
            component={Link}
            to={`/${toolGroup.slug}`}
            active={
              location.pathname === `/${toolGroup.slug}`
              || toolGroup.tools.some(tool => location.pathname === `/${tool.slug}`)
            }
          />
        </Menu.Target>
        <Menu.Dropdown>
          {toolGroup.tools.map(tool => 
            <Menu.Item
              key={tool.slug}
              icon={<tool.icon size={16}/>}
              component={Link}
              to={`/${tool.slug}`}
            >
              {tool.titleShort}
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    )
  )

  return (
    <MantineProvider
      inherit
      theme={{
        components: {
          NavLink: {
            styles: (theme) => ({
              root: { height: 40 },
              icon: { marginRight: expanded ? 12 : 0 },
            }),
          },
        },
      }}
    >
      <NavbarBase
        width={{ base: expanded ? 300 : (smallScreen ? '0' : 61) }}
        py="xs"
        sx={{
          overflow: 'hidden',
          transition: 'width 200ms ease, min-width 200ms ease'
        }}
      >
        <NavbarBase.Section mx="xs">
          <Stack spacing="xs">
            {navbarSearch}
            {navbarSearchCollapsed}
            <NavbarLink data={homeData} expanded={expanded} location={location.pathname} />
          </Stack>
        </NavbarBase.Section>
        <Divider my="xs" />
        <NavbarBase.Section mx="xs" grow component={ScrollArea}>
          <Stack spacing="xs">
            {navbarCategories}
          </Stack>
        </NavbarBase.Section>
        <NavbarBase.Section mx="xs">
          <Stack spacing="xs">
            <NavbarLink data={settingsData} expanded={expanded} location={location.pathname} />
          </Stack>
        </NavbarBase.Section>
      </NavbarBase>
    </MantineProvider>
  )
}