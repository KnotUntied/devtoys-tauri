import { Link, Outlet } from 'react-router-dom'
import {
  AppShell,
  Burger,
  Container,
  Global,
  Header,
  MantineProvider,
} from '@mantine/core'
import {
  useColorScheme,
  useDisclosure,
  useLocalStorage
} from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'
import FlashProvider from './contexts/FlashProvider'
import { desktopBreakpoint } from './const'
import { ColorScheme } from './types'
import Navbar from './components/Navbar'

import '@mantine/core/styles.css'
import '@mantine/code-highlight/styles.css'
import '@mantine/dropzone/styles.css'

function App() {
  const systemColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'system',
  })
  const [opened, handlers] = useDisclosure(window.innerWidth > desktopBreakpoint)

  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colorScheme: colorScheme === 'system' ? systemColorScheme : colorScheme,
        headings: { fontWeight: 500 },
      }}
    >
      <NotificationsProvider>
        <FlashProvider>
          <Global
            styles={(theme) => ({
              'html, body': {
                overscrollBehaviorY: 'none'
              },
            })}
          />
          <AppShell className="App"
            fixed
            padding="lg"
            navbarOffsetBreakpoint={desktopBreakpoint}
            navbar={<Navbar expanded={opened} handlers={handlers} />}
            header={
              <Header height={56} p="xs">
                <Burger opened={opened} onClick={() => handlers.toggle()} size="sm" ml={7} />
              </Header>
            }
            styles={(theme) => ({
              main: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                transition: 'padding-left 200ms ease'
              },
            })}
          >
            <Outlet />
          </AppShell>
        </FlashProvider>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
