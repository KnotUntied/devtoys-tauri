import {
  Group,
  Select,
  Stack,
  Switch,
  Text,
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import {
  IconClipboardText,
  IconHighlight,
  IconListNumbers,
  IconPaint,
  IconSpace,
  IconTextWrap,
  IconTypography,
} from '@tabler/icons'
import { ColorScheme } from '../types'
import ConfigItem from '../components/ConfigItem'
import Content from '../components/Content'

interface OnOffSwitchProps {
  storageKey: string
}

function OnOffSwitch({ storageKey }: OnOffSwitchProps) {
  const [value, setValue] = useLocalStorage<boolean>({
    key: storageKey,
    defaultValue: true,
  })

  console.log(value)

  return (
    <Group noWrap spacing="xs">
      <Text>{value ? 'On' : 'Off'}</Text>
      <Switch checked={value} onChange={(event) => setValue(event.currentTarget.checked)} />
    </Group>
  )
}

export default function Settings() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'system',
  })

  const selectColorScheme = (value: ColorScheme | null) => setColorScheme(value || 'system')

  return (
    <Content title="Settings">
      <Stack spacing="lg">
        <Stack spacing="xs">
          <ConfigItem
            icon={IconPaint}
            title="App theme"
            description="Select which app theme to display"
          >
            <Select
              data={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'Use system settings' }
              ]}
              value={colorScheme}
              onChange={selectColorScheme}
            />
          </ConfigItem>
        </Stack>
        <Stack spacing="xs">
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
  )
}