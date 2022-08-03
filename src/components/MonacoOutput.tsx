import {
  Button,
  CopyButton,
  Group,
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
}

export default function MonacoOutput({ value, label, language }: MonacoOutputProps) {
  const systemColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'system',
    getInitialValueInEffect: true,
  })

  const theme = (color: string) => color === 'dark' ? 'vs-dark' : 'light'

  return (
    <>
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
          readOnly: true,
          renderWhitespace: 'all',
          quickSuggestions: false,
          wordWrap: 'on'
        }}
      />
    </>
  )
}