import { forwardRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ActionIcon,
  Autocomplete,
  Divider,
  Group,
  Navbar as NavbarBase,
  NavLink,
  ScrollArea,
  SelectItemProps,
  Stack,
  Text,
  Tooltip,
  createStyles
} from '@mantine/core'
import {
  IconSearch
} from '@tabler/icons'
import { toolGroups, tools, homeData, settingsData } from '../data'

// todo: make collapsible
// todo: make it a drawer on smaller viewports

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
  },
}));

const searchData = tools.map((tool) => ({ value: tool.title }));

export default function Navbar({ expanded, handlers }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { classes } = useStyles();
  return (
    <NavbarBase width={{ base: 300 }} p="xs" className={classes.navbar}>
      <NavbarBase.Section>
        <Stack spacing='xs'>
          {/*<Autocomplete
            placeholder="Search"
            size="xs"
            rightSection={<IconSearch size={16} />}
            data={searchData}
            nothingFound="No results found"
            onItemSubmit={(item) => navigate('/')}
            size="sm"
            mb="sm"
          />*/}
          <Tooltip
            label={homeData.title}
            position="right"
            transitionDuration={0}
            withArrow
          >
            <NavLink
              icon={<homeData.icon size={16} />}
              label={homeData.title}
              component={Link}
              to={`/${homeData.slug}`}
              active={location.pathname == `/${homeData.slug}`}
            />
          </Tooltip>
        </Stack>
      </NavbarBase.Section>
      <Divider my='xs' />
      <NavbarBase.Section grow component={ScrollArea}>
        <Stack spacing='xs'>
          {toolGroups.map(toolGroup => 
            <NavLink
              key={toolGroup.slug}
              icon={<toolGroup.icon size={16} />}
              label={toolGroup.title}
              component={Link}
              to={`/${toolGroup.slug}`}
              active={location.pathname == `/${toolGroup.slug}`}
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
                  active={location.pathname == `/${tool.slug}`}
                  pl={40}
                >
                  
                </NavLink>
              )}
            </NavLink>
          )}
        </Stack>
      </NavbarBase.Section>
      <NavbarBase.Section>
        <Stack spacing='xs'>
          <Tooltip
            label={settingsData.title}
            position="right"
            transitionDuration={0}
            withArrow
          >
            <NavLink
              icon={<settingsData.icon size={16} />}
              label={settingsData.title}
              component={Link}
              to={`/${settingsData.slug}`}
              active={location.pathname == `/${settingsData.slug}`}
            />
          </Tooltip>
        </Stack>
      </NavbarBase.Section>
    </NavbarBase>
  );
}