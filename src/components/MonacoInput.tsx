import { useRef } from 'react'
import {
  ActionIcon,
  Button,
  CloseButton,
  Group,
  Stack,
  Text
} from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { IconClipboardText, IconFile } from '@tabler/icons'
import Editor from '@monaco-editor/react'
import { ColorScheme } from '../types'

interface MonacoInputProps {
  value: string
  setter: (value: string | React.ChangeEvent<any> | null | undefined) => void
  label: string
  language?: string
}

export default function MonacoInput({ value, setter, label, language }: MonacoInputProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
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
        <Group noWrap spacing="xs">
          <input
            type="file"
            ref={fileRef}
            style={{ display: 'none' }}
            onChange={async (e) => {
              if (e.target.files?.length === 1) {
                setter(await e.target.files[0].text())
                if (fileRef.current) {
                  fileRef.current.value = ''
                }
              }
            }}
          />
          <ActionIcon
            title="Load a file"
            variant="default"
            size={36}
            onClick={() => fileRef.current?.click()}
          >
            <IconFile size={24} />
          </ActionIcon>
          <CloseButton
            title="Clear"
            variant="default"
            size={36}
            iconSize={24}
            onClick={() => setter('')}
          />
        </Group>
      </Group>
      <Editor
        value={value}
        onChange={setter}
        height={130}
        defaultLanguage={language}
        theme={colorScheme === 'system' ? theme(systemColorScheme) : theme(colorScheme)}
        options={{
          codeLens: false,
          renderWhitespace: 'all',
          quickSuggestions: false,
          wordWrap: 'on'
        }}
      />
    </Stack>
  )
}