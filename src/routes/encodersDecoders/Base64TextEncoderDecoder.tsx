import { useState, useEffect } from 'react'
import {
  Group,
  Select,
  Stack,
  Switch,
  Text,
  Textarea
} from '@mantine/core'
import { useDidUpdate, useLocalStorage } from '@mantine/hooks'
import { IconArrowsRightLeft } from '@tabler/icons'
import ConfigItem from '../../components/ConfigItem'
import Content from '../../components/Content'
import TextareaInput from '../../components/TextareaInput'
import TextareaOutput from '../../components/TextareaOutput'

// import { gzipSync, gunzipSync, strFromU8, strToU8 } from 'fflate'

const decoder = new TextDecoder('utf8')

export default function Base64TextEncoderDecoder() {
  // encode is true, decode is false
  const [conversion, setConversion] = useLocalStorage<boolean>({
    key: 'base64TextEncoderDecoder-conversion',
    defaultValue: true,
  })
  const [input, setInput] = useSessionStorage<string>({
    key: 'base64TextEncoderDecoder-input',
    defaultValue: '',
  })
  // Would've been a computed value if it didn't show a one-frame artifact
  const [output, setOutput] = useState<string>('')

  return (
    <Content title="Base64 Text Encoder / Decoder">
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
              <Switch checked={conversion} onChange={event => setConversion(event.currentTarget.checked)} />
            </Group>
          </ConfigItem>
        </Stack>
        <TextareaInput value={input} setter={setInput} label="Input" />
        <TextareaOutput value={output} label="Output" />
      </Stack>
    </Content>
  )
}