import { Group, Stack, Switch, Text } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { IconSquareToggleHorizontal } from '@tabler/icons'
import ConfigItem from '../../components/ConfigItem'
import Content from '../../components/Content'
import MonacoInput from '../../components/MonacoInput'
import MonacoDiffOutput from '../../components/MonacoDiffOutput'
import Split from '../../components/Split'
import create from 'zustand'

interface State {
  oldText: string,
  setOldText: (oldText: string) => void,
  newText: string,
  setNewText: (newText: string) => void
}

const useState = create<State>(set => ({
  oldText: '',
  setOldText: (oldText: string) => set((state: State) => ({ ...state, oldText })),
  newText: '',
  setNewText: (newText: string) => set((state: State) => ({ ...state, newText }))
}))

export default function TextComparer() {
  const [inline, setInline] = useLocalStorage<boolean>({
    key: 'textComparer-inline',
    defaultValue: true,
  })
  const { oldText, setOldText, newText, setNewText } = useState()

  return (
    <Content title="Text Comparer">
      <Stack spacing="lg">
        <Stack spacing="xs">
          <Text>Configuration</Text>
          <ConfigItem icon={IconSquareToggleHorizontal} title="Inline mode">
            <Group spacing="xs">
              <Text>{inline ? 'On' : 'Off'}</Text>
              <Switch checked={inline} onChange={event => setInline(event.currentTarget.checked)} />
            </Group>
          </ConfigItem>
        </Stack>
        <Stack spacing="xs">
          <Split>
            <MonacoInput value={oldText} setter={setOldText} label="Old text" />
            <MonacoInput value={newText} setter={setNewText} label="New text" />
          </Split>
          <MonacoDiffOutput
            original={oldText}
            modified={newText}
            label="Difference"
            renderSideBySide={!inline}
          />
        </Stack>
      </Stack>
    </Content>
  )
}