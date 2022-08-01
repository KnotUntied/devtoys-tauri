import { useRef } from 'react'
import {
  Button,
  CopyButton,
  Group,
  Text,
  Textarea
} from '@mantine/core'
import { IconCopy } from '@tabler/icons'

export default function TextareaOutput({ value, label }) {
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
      <Textarea
        value={value}
        minRows={6}
        readOnly
        styles={{ input: { fontFamily: 'monospace' } }}
      />
    </>
  )
}