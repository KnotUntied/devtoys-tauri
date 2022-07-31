import { forwardRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Autocomplete,
  Box,
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
import { useMediaQuery } from '@mantine/hooks';
import {
  IconSearch
} from '@tabler/icons'
import { toolGroups, tools, homeData, settingsData } from '../data'

const searchData = tools.map((tool) => ({ value: tool.title }));

const NavbarLink = ({ data, expanded, location }) => {
  return expanded
    ? (
      <NavLink
        icon={<data.icon size={16} />}
        label={data.title}
        component={Link}
        to={`/${data.slug}`}
        active={location === `/${data.slug}`}
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

export default function Navbar({ expanded, handlers }) {
  const location = useLocation();
  const navigate = useNavigate();
  const smallScreen = useMediaQuery('(max-width: 900px)');

  const navbarSearch = expanded
    ? (
      <Divider my='xs' />
    )
    : (
      <Tooltip
        label="Click to search"
        position="right"
        transitionDuration={0}
        withArrow
      >
        <NavLink
          icon={<IconSearch size={16}/>}
          onClick={() => null}
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

  return (expanded || !smallScreen) && (
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
        width={{ base: expanded ? 300 : 61 }}
        p="xs"
      >
        <NavbarBase.Section>
          <Stack spacing='xs'>
            {navbarSearch}
            <NavbarLink data={homeData} expanded={expanded} location={location.pathname} />
          </Stack>
        </NavbarBase.Section>
        <Divider my='xs' />
        <NavbarBase.Section grow component={ScrollArea}>
          <Stack spacing='xs'>
            {navbarCategories}
          </Stack>
        </NavbarBase.Section>
        <NavbarBase.Section>
          <Stack spacing='xs'>
            <NavbarLink data={settingsData} expanded={expanded} location={location.pathname} />
          </Stack>
        </NavbarBase.Section>
      </NavbarBase>
    </MantineProvider>
  )
}