import {
  AppShell,
  Burger,
  type MantineColorScheme,
  MantineProvider,
} from "@mantine/core";
import {
  emotionTransform,
  Global,
  MantineEmotionProvider,
} from "@mantine/emotion";
import { useColorScheme, useDisclosure, useLocalStorage } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { desktopBreakpoint } from "./const";
import FlashProvider from "./contexts/FlashProvider";

import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";

function App() {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<MantineColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "auto",
  });
  const [opened, handlers] = useDisclosure(
    window.innerWidth > desktopBreakpoint,
  );

  return (
    <MantineProvider
      stylesTransform={emotionTransform}
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colorScheme: colorScheme === "auto" ? systemColorScheme : colorScheme,
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
            navbar={{
              breakpoint: desktopBreakpoint,
            }}
            header={{
              height: 56,
              padding: "xs",
            }}
            styles={(theme, _, u) => ({
              main: {
                [u.dark]: {
                  backgroundColor: theme.colors.dark[8],
                  color: theme.white,
                },

                [u.light]: {
                  backgroundColor: theme.colors.gray[0],
                  color: theme.black,
                },
                transition: "padding-left 200ms ease",
              },
            })}
          >
            <AppShell.Header>
              <Burger
                opened={opened}
                onClick={() => handlers.toggle()}
                size="sm"
                ml={7}
              />
            </AppShell.Header>
            <Navbar expanded={opened} handlers={handlers} />
            <AppShell.Main>
              <Outlet />
            </AppShell.Main>
          </AppShell>
        </FlashProvider>
      </MantineEmotionProvider>
    </MantineProvider>
  );
}

export default App;
