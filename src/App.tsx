import {
  AppShell,
  Burger,
  MantineProvider,
} from "@mantine/core";
import {
  emotionTransform,
  Global,
  MantineEmotionProvider,
} from "@mantine/emotion";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { Outlet } from "react-router-dom";
import classes from "./App.module.css";
import Navbar from "./components/Navbar";
import { desktopBreakpoint } from "./const";
import FlashProvider from "./contexts/FlashProvider";

import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";

function App() {
  const [opened, handlers] = useDisclosure(
    window.innerWidth > desktopBreakpoint,
  );

  return (
    <MantineProvider
      stylesTransform={emotionTransform}
      theme={{
        headings: { fontWeight: "500" },
      }}
    >
      <MantineEmotionProvider>
        <Notifications />
        <FlashProvider>
          <Global
            styles={(_) => ({
              "html, body": {
                overscrollBehaviorY: "none",
              },
            })}
          />
          <AppShell
            className="App"
            padding="lg"
            header={{
              height: 56,
            }}
          >
            <AppShell.Header p="xs">
              <Burger
                opened={opened}
                onClick={() => handlers.toggle()}
                size="sm"
                ml={7}
              />
            </AppShell.Header>
            <Navbar expanded={opened} handlers={handlers} />
            <AppShell.Main className={classes.main}>
              <Outlet />
            </AppShell.Main>
          </AppShell>
        </FlashProvider>
      </MantineEmotionProvider>
    </MantineProvider>
  );
}

export default App;
