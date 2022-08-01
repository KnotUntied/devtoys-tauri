import { useState, useEffect } from 'react'
import {
  Button,
  CopyButton,
  Group,
  Stack,
  Switch,
  Text,
  Textarea
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import {
  IconArrowsRightLeft,
  IconCopy
} from '@tabler/icons'
import ConfigItem from '../../components/ConfigItem'
import Content from '../../components/Content'
import TextareaInput from '../../components/TextareaInput'

export default function URLEncoderDecoder() {
  // encode is true, decode is false
  const [conversion, setConversion] = useInputState(true)
  const [input, setInput] = useInputState('')
  // Would've been a computed value if it didn't show a one-frame artifact
  const [output, setOutput] = useInputState('')

  useEffect(() => {
    const reversedOutput = conversion ? decodeURIComponent(input) : encodeURIComponent(input)
    setInput(reversedOutput)
  }, [conversion])

  useEffect(() => {
    setOutput(conversion ? encodeURIComponent(input) : decodeURIComponent(input))
  }, [input])

  return (
    <Content title="URL Encoder / Decoder">
      <Stack spacing="lg">
        <Stack spacing="xs">
          <Text>Configuration</Text>
          <ConfigItem
            icon={IconArrowsRightLeft}
            title="Conversion"
            description="Select which conversion mode you want to use"
          >
            <Group spacing="xs">
              <Text>{conversion ? 'Encode' : 'Decode'}</Text>
              <Switch checked={conversion} onChange={setConversion} />
            </Group>
          </ConfigItem>
        </Stack>
        <Stack spacing="xs">
          <TextareaInput value={input} setter={setInput} label="Input" />
        </Stack>
        <Stack spacing="xs">
          <Group position="apart" noWrap spacing="xl">
            <Text>Output</Text>
            <CopyButton value={output}>
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
            value={output}
            minRows={6}
            readOnly
            styles={{ input: { fontFamily: 'monospace' } }}
          />
        </Stack>
      </Stack>
    </Content>
  )
}