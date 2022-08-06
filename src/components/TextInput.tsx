import { useRef } from 'react'
import {
  ActionIcon,
  CloseButton,
  Group,
  Stack,
  Text,
  TextInput as TextInputBase
} from '@mantine/core'
import { IconClipboardText, IconFile } from '@tabler/icons'

interface TextInputProps {
  value: string
  setter: (value: string | React.ChangeEvent<any> | null | undefined) => void
  label: string,
  error?: React.ReactNode
}

export default function TextInput({ value, setter, label, error }: TextInputProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
      <TextInputBase
        ref={inputRef}
        value={value}
        onChange={setter}
        // sx={{ width: '100%' }}
        styles={{ input: { fontFamily: 'monospace' } }}
        error={error}
      />
    </Stack>
  )
}