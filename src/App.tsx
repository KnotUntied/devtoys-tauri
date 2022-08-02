import { Link, Outlet } from 'react-router-dom'
import {
  AppShell,
  Burger,
  Container,
  Header,
  MantineProvider,
} from '@mantine/core'
import {
  useColorScheme,
  useDisclosure,
  useLocalStorage
} from '@mantine/hooks'
import { ColorScheme } from './types'
import Navbar from './components/Navbar'

function App() {
  const systemColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'system',
    getInitialValueInEffect: true,
  })
  const [opened, handlers] = useDisclosure(window.innerWidth > 900)

  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colorScheme: colorScheme === 'system' ? systemColorScheme : colorScheme,
        headings: { fontWeight: 500 },
      }}
    >
      <AppShell className="App"
        fixed
        padding="lg"
        navbarOffsetBreakpoint={900}
        navbar={<Navbar expanded={opened} handlers={handlers} />}
        header={
          <Header height={56} p="xs">
            <Burger opened={opened} onClick={() => handlers.toggle()} size="sm" ml={7} />
          </Header>
        }
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
        <Outlet />
      </AppShell>
    </MantineProvider>
  )
}

export default App
