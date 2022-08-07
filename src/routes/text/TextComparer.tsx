import { useState } from 'react'
import { Group, Stack, Switch, Text } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { IconSquareToggleHorizontal } from '@tabler/icons'
import ConfigItem from '../../components/ConfigItem'
import Content from '../../components/Content'
import MonacoInput from '../../components/MonacoInput'
import MonacoDiffOutput from '../../components/MonacoDiffOutput'
import Split from '../../components/Split'

export default function TextComparer() {
  const [inline, setInline] = useInputState(true)
  const [oldText, setOldText] = useInputState('')
  const [newText, setNewText] = useInputState('')

  return (
    <Content title="Text Comparer">
      <Stack spacing="lg">
        <Stack spacing="xs">
          <Text>Configuration</Text>
          <ConfigItem icon={IconSquareToggleHorizontal} title="Inline mode">
            <Group spacing="xs">
              <Text>{inline ? 'On' : 'Off'}</Text>
              <Switch checked={inline} onChange={setInline} />
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