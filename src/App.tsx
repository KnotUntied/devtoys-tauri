import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import {
  AppShell,
  Container,
  MantineProvider,
  Navbar as NavbarBase
} from '@mantine/core'
import {
  Home2,
} from 'tabler-icons-react'
import Content from ''

// todo: make collapsible
// todo: make it a drawer on smaller viewports

// function Navbar() {
//   const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

//   return (
//     <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar}>
//       <Navbar.Section className={classes.header}>
//         <Group position="apart">
//           <Logo width={120} />
//           <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
//         </Group>
//       </Navbar.Section>

//       <Navbar.Section grow className={classes.links} component={ScrollArea}>
//         <div className={classes.linksInner}>{links}</div>
//       </Navbar.Section>

//       <Navbar.Section className={classes.footer}>
//         <UserButton
//           image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
//           name="Ann Nullpointer"
//           email="anullpointer@yahoo.com"
//         />
//       </Navbar.Section>
//     </Navbar>
//   );
// }

function App() {
  const [active, setActive] = useState('')
  return (
    <MantineProvider
      theme={{
        headings: { fontWeight: 500 },
      }}
    >
      <AppShell className="App"
        padding="lg"
        // navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
        <Container>
          <Outlet />
        </Container>
      </AppShell>
    </MantineProvider>
  )
}

export default App
