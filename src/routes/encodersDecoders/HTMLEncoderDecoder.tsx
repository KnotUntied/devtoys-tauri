import { useState, useEffect } from 'react'
import {
  Group,
  Stack,
  Switch,
  Text,
  Textarea
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { IconArrowsRightLeft } from '@tabler/icons'
import ConfigItem from '../../components/ConfigItem'
import Content from '../../components/Content'
import TextareaInput from '../../components/TextareaInput'
import TextareaOutput from '../../components/TextareaOutput'

import he from 'he'

export default function URLEncoderDecoder() {
  // encode is true, decode is false
  const [conversion, setConversion] = useInputState(true)
  const [input, setInput] = useInputState('')
  // Would've been a computed value if it didn't show a one-frame artifact
  const [output, setOutput] = useInputState('')

  useEffect(() => {
    const reversedOutput = conversion
      ? he.decode(input, { 'useNamedReferences': false, 'decimal': true })
      : he.encode(input, { 'useNamedReferences': false, 'decimal': true })
    setInput(reversedOutput)
  }, [conversion])

  useEffect(() => {
    setOutput(conversion
      ? he.encode(input, { 'useNamedReferences': false, 'decimal': true })
      : he.decode(input, { 'useNamedReferences': false, 'decimal': true })
    )
  }, [input])

  return (
    <Content title="HTML Encoder / Decoder">
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
          <TextareaOutput value={output} label="Output" />
        </Stack>
      </Stack>
    </Content>
  )
}