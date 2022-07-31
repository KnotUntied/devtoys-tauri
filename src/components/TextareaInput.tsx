import { useRef } from 'react'
import {
  ActionIcon,
  Button,
  CloseButton,
  Group,
  Text,
  Textarea
} from '@mantine/core'
import {
  IconClipboardText,
  IconFile,
} from '@tabler/icons'

export default function TextareaInput({ value, setter, label }) {
  const fileRef = useRef(null)
  const textareaRef = useRef(null)

  const paste = async () => {
    const selectionStart = textareaRef.current.selectionStart
    const selectionEnd = textareaRef.current.selectionEnd

    const beforeSelection = value.substring(0, selectionStart)
    const pastedText = await navigator.clipboard.readText()
    const afterSelection = value.substring(selectionEnd)
    setter(`${beforeSelection}${pastedText}${afterSelection}`)

    const newSelectionStart = selectionStart + startTag.length
    const newSelectionEnd = selectionEnd + startTag.length
    textArea.setSelectionRange(newSelectionStart, newSelectionEnd)
  }

  return (
    <>
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
              if (e.target.files.length === 1) {
                setter(await e.target.files[0].text())
                fileRef.current.value = null
              }
            }}
          />
          <ActionIcon
            title="Load a file"
            variant="default"
            size={36}
            onClick={() => fileRef.current.click()}
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
      />
    </>
  )
}