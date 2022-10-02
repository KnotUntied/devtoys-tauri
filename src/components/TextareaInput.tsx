import { useRef, forwardRef, useImperativeHandle } from 'react'
import {
  ActionIcon,
  Button,
  CopyButton,
  CloseButton,
  Group,
  Stack,
  Text,
  Textarea
} from '@mantine/core'
import { useLocalStorage, useMergedRef } from '@mantine/hooks'
import {
  IconClipboardText,
  IconCopy,
  IconFile
} from '@tabler/icons'

interface TextareaInputProps {
  value: string
  setter(val: string | ((prevState: string) => string)): void
  label: string
  error?: React.ReactNode
  copy?: boolean
  height?: number
}

const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  ({ value, setter, label, error, copy, height }, forwardedRef) => {
  const [replaceWhenPasting, setReplaceWhenPasting] = useLocalStorage<boolean>({
    key: 'replacewhenpasting',
    defaultValue: true,
  })
  const fileRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const paste = async () => {
    replaceWhenPasting
      ? textareaRef.current?.select()
      : textareaRef.current?.focus()
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
          {copy &&
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
          }
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
        ref={useMergedRef(textareaRef, forwardedRef)}
        value={value}
        onChange={event => setter(event.currentTarget.value)}
        minRows={6}
        styles={{ input: { fontFamily: 'monospace', height: height ?? 'auto' } }}
        error={error}
      />
    </Stack>
  )
})

export default TextareaInput