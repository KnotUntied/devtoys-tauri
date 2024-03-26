import { useState, useEffect } from 'react'
import {
  Group,
  Stack,
  Switch,
  Text
} from '@mantine/core'
import { useDidUpdate, useLocalStorage } from '@mantine/hooks'
import { IconArrowsRightLeft } from '@tabler/icons'
import ConfigItem from '../../components/ConfigItem'
import Content from '../../components/Content'
import TextareaInput from '../../components/TextareaInput'
import TextareaOutput from '../../components/TextareaOutput'

// import { gzipSync, gunzipSync, strFromU8, strToU8 } from 'fflate'

const decoder = new TextDecoder('utf8')

export default function GZipCompressDecompress() {
  // compress is true, decompress is false
  const [conversion, setConversion] = useLocalStorage<boolean>({
    key: 'gzipCompressDecompress-conversion',
    defaultValue: true,
  })
  const [input, setInput] = useSessionStorage<string>({
    key: 'gzipCompressDecompress-input',
    defaultValue: '',
  })
  // Would've been a computed value if it didn't show a one-frame artifact
  const [output, setOutput] = useState<string>('')

  // useEffect(() => {
  //   const reversedOutput = conversion
  //     ? ungzip(input, { to: 'string' })
  //     : gzip(JSON.stringify(input))
  //   setInput(reversedOutput)
  // }, [conversion])

  // useEffect(() => {
  //   setOutput(conversion
  //     ? strFromU8(gzipSync(input))
  //     : gunzipSync(input, { to: 'string' })
  //   )
  // }, [input])

  // console.log(gzipSync(strToU8('awawa')))
  // console.log(strFromU8(gzipSync(strToU8('awawa'))))
  // console.log(gunzipSync(strToU8(input)))

  // console.log(strToU8('hello'))
  // console.log(gzipSync(strToU8('hello')))
  // console.log(strFromU8(gzipSync(strToU8('hello'))))
  // console.log(gunzipSync(gzipSync(strToU8('hello'))))
  // console.log(strFromU8(gunzipSync(gzipSync(strToU8('hello')))))

  return (
    <Content title="GZip Compress / Decompress">
      <Stack spacing="lg">
        <Stack spacing="xs">
          <Text>Configuration</Text>
          <ConfigItem
            icon={IconArrowsRightLeft}
            title="GZip Compress / Decompress"
            description="Select whether the input should be compressed or decompressed"
          >
            <Group spacing="xs">
              <Text>{conversion ? 'Compress' : 'Decompress'}</Text>
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