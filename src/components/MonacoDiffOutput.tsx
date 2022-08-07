import {
  Group,
  Stack,
  Text
} from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { IconCopy } from '@tabler/icons'
import { DiffEditor } from '@monaco-editor/react'
import { ColorScheme } from '../types'

interface MonacoDiffOutputProps {
  original: string
  modified: string
  label: string
  renderSideBySide: boolean
}

export default function MonacoDiffOutput({ original, modified, label, renderSideBySide }: MonacoDiffOutputProps) {
  const systemColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'system',
    getInitialValueInEffect: true,
  })

  const theme = (color: string) => color === 'dark' ? 'vs-dark' : 'light'

  return (
    <Stack spacing="xs">
      <Group position="apart" noWrap spacing="xl">
        <Text>{label}</Text>
      </Group>
      <DiffEditor
        original={original}
        modified={modified}
        height={130}
        theme={colorScheme === 'system' ? theme(systemColorScheme) : theme(colorScheme)}
        options={{
          codeLens: false,
          readOnly: true,
          renderSideBySide,
          renderWhitespace: 'all',
          quickSuggestions: false,
          wordWrap: 'on'
        }}
      />
    </Stack>
  )
}