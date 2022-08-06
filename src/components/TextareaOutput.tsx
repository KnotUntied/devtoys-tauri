import {
  Button,
  CopyButton,
  Group,
  Stack,
  Text,
  Textarea
} from '@mantine/core'
import { IconCopy } from '@tabler/icons'

interface TextareaOutputProps {
  value: string
  label: string
}

export default function TextareaOutput({ value, label }: TextareaOutputProps) {
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
      <Textarea
        value={value}
        minRows={6}
        readOnly
        styles={{ input: { fontFamily: 'monospace' } }}
      />
    </Stack>
  )
}