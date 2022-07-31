import { useState, useRef } from 'react'
import {
  ActionIcon,
  CopyButton,
  Group,
  MantineProvider,
  Select,
  Stack,
  Switch,
  Text,
  TextInput
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import {
  IconAdjustmentsHorizontal,
  IconCopy,
  IconLetterCaseToggle,
  IconMailOpened,
} from '@tabler/icons'
import ConfigItem from '../../components/ConfigItem'
import Content from '../../components/Content'
import TextareaInput from '../../components/TextareaInput'

import md5 from 'crypto-js/md5'
import sha1 from 'crypto-js/sha1'
import sha256 from 'crypto-js/sha256'
import sha512 from 'crypto-js/sha512'
import hmacMd5 from 'crypto-js/hmac-md5'
import hmacSha1 from 'crypto-js/hmac-sha1'
import hmacSha256 from 'crypto-js/hmac-sha256'
import hmacSha512 from 'crypto-js/hmac-sha512'
import base64 from 'crypto-js/enc-base64'

const OutputField = ({ value, label }) => (
  <Group noWrap spacing="xs" align='end'>
    <TextInput label={label} value={value} readOnly sx={{ flex: '1 !important' }} />
    <CopyButton value={value}>
      {({ copy }) => (
        <ActionIcon title="Copy" onClick={copy} variant="default" size={36}>
          <IconCopy size={24} />
        </ActionIcon>
      )}
    </CopyButton>
  </Group>
)

export default function HashGenerator() {
  const [uppercase, setUppercase] = useState(false)
  const [outputType, setOutputType] = useState('Hex')
  const [hmacMode, setHmacMode] = useState(false)
  const [input, setInput] = useInputState('')
  const [secretKey, setSecretKey] = useInputState('')

  const generateHash = (algorithm) => {
    if (!input) return ''
    let output = uppercase ? algorithm(input).toUpperCase : algorithm(input)
    if (outputType === 'Base64') {
      return base64.stringify(algorithm(input))
    } else {
      return uppercase ? algorithm(input).toUpperCase : algorithm(input)
    }
  }

  const generateHmacHash = (algorithm) => {
    if (!input || !secretKey) return ''
    let output = uppercase ? algorithm(input, secretKey).toUpperCase : algorithm(input, secretKey)
    if (outputType === 'Base64') {
      return base64.stringify(algorithm(input, secretKey))
    } else {
      return uppercase ? algorithm(input, secretKey).toUpperCase : algorithm(input, secretKey)
    }
  }

  const md5Output = hmacMode ? generateHmacHash(hmacMd5) : generateHash(md5)
  const sha1Output = hmacMode ? generateHmacHash(hmacSha1) : generateHash(sha1)
  const sha256Output = hmacMode ? generateHmacHash(hmacSha256) : generateHash(sha256)
  const sha512Output = hmacMode ? generateHmacHash(hmacSha512) : generateHash(sha512)

  return (
    <MantineProvider
      inherit
      theme={{
        components: {
          TextInput: {
            styles: (theme) => ({
              input: { fontFamily: 'monospace' },
            }),
          },
        },
      }}
    >
      <Content title='Hash Generator'>
        <Stack spacing="lg">
          <Stack spacing="xs">
            <Text>Configuration</Text>
            <ConfigItem icon={IconLetterCaseToggle} title="Uppercase">
              <Switch
                checked={uppercase}
                onChange={(event) => setUppercase(event.currentTarget.checked)}
                disabled={outputType === 'Base64'}
              />
            </ConfigItem>
            <ConfigItem icon={IconAdjustmentsHorizontal} title="Output Type">
              <Select data={['Hex', 'Base64']} value={outputType} onChange={setOutputType} />
            </ConfigItem>
            <ConfigItem icon={IconMailOpened} title="HMAC Mode">
              <Switch checked={hmacMode} onChange={(event) => setHmacMode(event.currentTarget.checked)} />
            </ConfigItem>
          </Stack>
          <Stack spacing="xs">
            <TextareaInput value={input} setter={setInput} label="Input" />
          </Stack>
          { hmacMode &&
            <Stack spacing="xs">
              <TextareaInput value={secretKey} setter={setSecretKey} label="Secret Key" />
            </Stack>
          }
          <Stack spacing="xs">
            <OutputField value={md5Output} label="MD5" />
            <OutputField value={sha1Output} label="SHA1" />
            <OutputField value={sha256Output} label="SHA256" />
            <OutputField value={sha512Output} label="SHA512" />
          </Stack>
        </Stack>
      </Content>
    </MantineProvider>
  )
}