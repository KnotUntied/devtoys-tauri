import {
  Button,
  CopyButton,
  Group,
  Stack,
  Text
} from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { IconCopy } from '@tabler/icons'
import Editor from '@monaco-editor/react'
import { ColorScheme } from '../types'

interface MonacoOutputProps {
  value: string
  label: string
  language: string
  tabSize?: number
}

export default function MonacoOutput({ value, label, language, tabSize=4 }: MonacoOutputProps) {
  const systemColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'system',
  })
  const [wordWrap, setWordWrap] = useLocalStorage<boolean>({
    key: 'monaco-wordwrap',
    defaultValue: true,
  })
  const [lineNumbers, setLineNumbers] = useLocalStorage<boolean>({
    key: 'monaco-linenumbers',
    defaultValue: true,
  })
  const [highlightCurrentLine, setHighlightCurrentLine] = useLocalStorage<boolean>({
    key: 'monaco-highlightcurrentline',
    defaultValue: true,
  })
  const [renderWhitespace, setRenderWhitespace] = useLocalStorage<boolean>({
    key: 'monaco-renderwhitespace',
    defaultValue: true,
  })

  const theme = (color: string) => color === 'dark' ? 'vs-dark' : 'light'

  return (
    <Stack spacing="xs">
      <Group position="apart" noWrap spacing="xl">
        <Text>{label}</Text>
        <CopyButton value={value}>
          {({ copy }) => (
            <Button
              onClick={copy}
              variant="default"
              leftIcon={<IconCopy />}
            >
              Copy
            </Button>
          )}
        </CopyButton>
      </Group>
      <Editor
        value={value}
        height={130}
        defaultLanguage={language}
        theme={colorScheme === 'system' ? theme(systemColorScheme) : theme(colorScheme)}
        options={{
          codeLens: false,
          detectIndentation: false,
          lineNumbers: lineNumbers ? 'on' : 'off',
          readOnly: true,
          renderLineHighlight: highlightCurrentLine ? 'all' : 'none',
          renderWhitespace: renderWhitespace ? 'all' : 'none',
          tabSize,
          quickSuggestions: false,
          wordWrap: wordWrap ? 'on' : 'off'
        }}
      />
    </Stack>
  )
}