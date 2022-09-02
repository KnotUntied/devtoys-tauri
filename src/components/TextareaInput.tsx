import { useRef } from 'react'
import {
  ActionIcon,
  Button,
  CloseButton,
  Group,
  Stack,
  Text,
  Textarea
} from '@mantine/core'
import { IconClipboardText, IconFile } from '@tabler/icons'

interface TextareaInputProps {
  value: string
  setter: (value: string | React.ChangeEvent<any> | null | undefined) => void
  label: string,
  error?: React.ReactNode
}

export default function TextareaInput({ value, setter, label, error }: TextareaInputProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const paste = async () => {
    textareaRef.current?.focus()
    document.execCommand('insertText', false, await navigator.clipboard.readText())
  }

  return (
    <Stack spacing="xs">
      <Group position="apart" noWrap spacing="xl">
        <Text>{label}</Text>
        <Group noWrap spacing="xs">
          <Button variant="default" leftIcon={<IconClipboardText />} onClick={paste}>
            Paste
          </Button>
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
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={setter}
        minRows={6}
        styles={{ input: { fontFamily: 'monospace' } }}
        error={error}
      />
    </Stack>
  )
}