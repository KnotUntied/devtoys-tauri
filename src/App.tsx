import { Link, Outlet } from 'react-router-dom'
import {
  AppShell,
  Burger,
  Container,
  Header,
  MantineProvider,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Navbar from './components/Navbar'

function App() {
  const [opened, handlers] = useDisclosure(false)
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
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
        <Outlet />
      </AppShell>
    </MantineProvider>
  )
}

export default App
