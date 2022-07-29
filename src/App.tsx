import { Link, Outlet } from 'react-router-dom'
import {
  AppShell,
  Burger,
  ColorSchemeProvider,
  Container,
  Drawer,
  Header,
  MantineProvider,
} from '@mantine/core'
import {
  useColorScheme,
  useDisclosure,
  useLocalStorage,
  useMediaQuery
} from '@mantine/hooks'
import Navbar, { NavbarContent } from './components/Navbar'

function App() {
  const systemColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'system',
    getInitialValueInEffect: true,
  })
  const [opened, handlers] = useDisclosure(true)
  const largeScreen = useMediaQuery('(min-width: 900px)')
  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          colorScheme: colorScheme === 'system' ? systemColorScheme : colorScheme,
          headings: { fontWeight: 500 },
        }}
      >
        <AppShell className="App"
          padding="lg"
          navbar={<Navbar expanded={opened} handlers={handlers} />}
          header={
            <Header height={56} p="xs">
              <Burger opened={opened} onClick={() => handlers.toggle()} size="sm" />
            </Header>
          }
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}
        >
          <Drawer opened={opened && !largeScreen} onClose={() => handlers.close()} size={300}>
            <NavbarContent expanded={true} handlers={handlers} />
          </Drawer>
          <Outlet />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
