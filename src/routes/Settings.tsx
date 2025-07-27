import {
  Group,
  type MantineColorScheme,
  Select,
  Stack,
  Switch,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  IconClipboardText,
  IconHighlight,
  IconListNumbers,
  IconPaint,
  IconSpace,
  IconTextWrap,
} from "@tabler/icons-react";
import ConfigItem from "../components/ConfigItem";
import Content from "../components/Content";

interface OnOffSwitchProps {
  storageKey: string;
}

function OnOffSwitch({ storageKey }: OnOffSwitchProps) {
  const [value, setValue] = useLocalStorage<boolean>({
    key: storageKey,
    defaultValue: true,
  });

  return (
    <Group wrap="nowrap" gap="xs">
      <Text>{value ? "On" : "Off"}</Text>
      <Switch
        checked={value}
        onChange={(event) => setValue(event.currentTarget.checked)}
      />
    </Group>
  );
}

export default function Settings() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Content title="Settings">
      <Stack gap="lg">
        <Stack gap="xs">
          <ConfigItem
            icon={IconPaint}
            title="App theme"
            description="Select which app theme to display"
          >
            <Select
              data={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
                { value: "auto", label: "Use system settings" },
              ]}
              value={colorScheme}
              onChange={(value, _) =>
                setColorScheme((value ?? "auto") as MantineColorScheme)
              }
            />
          </ConfigItem>
        </Stack>
        <Stack gap="xs">
          <Text>Text editor</Text>
          <ConfigItem icon={IconTextWrap} title="Wrap word">
            <OnOffSwitch storageKey="monaco-wordwrap" />
          </ConfigItem>
          <ConfigItem
            icon={IconListNumbers}
            title="Line numbers"
            description="Select which app theme to display"
          >
            <OnOffSwitch storageKey="monaco-linenumbers" />
          </ConfigItem>
          <ConfigItem
            icon={IconHighlight}
            title="Highlight current line"
            description="Change the background color of the current line so it's more visible"
          >
            <OnOffSwitch storageKey="monaco-highlightcurrentline" />
          </ConfigItem>
          <ConfigItem icon={IconSpace} title="Render white space">
            <OnOffSwitch storageKey="monaco-renderwhitespace" />
          </ConfigItem>
          <ConfigItem
            icon={IconClipboardText}
            title="Replace text when pasting"
            description="When clicking the Paste button, clear the text before pasting instead of appending to the existing text editor content"
          >
            <OnOffSwitch storageKey="replacewhenpasting" />
          </ConfigItem>
        </Stack>
      </Stack>
    </Content>
  );
}
