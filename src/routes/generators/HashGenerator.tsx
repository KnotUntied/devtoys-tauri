import { useState } from 'react'
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

interface OutputFieldProps {
  value: string
  label: string
}

const OutputField = ({ value, label }: OutputFieldProps) => (
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

type HashAlgorithm = typeof md5 | typeof sha1 | typeof sha256 | typeof sha512
type HmacHashAlgorithm = typeof hmacMd5 | typeof hmacSha1 | typeof hmacSha256 | typeof hmacSha512

export default function HashGenerator() {
  const [uppercase, setUppercase] = useInputState(false)
  const [outputType, setOutputType] = useState('Hex')
  const [hmacMode, setHmacMode] = useInputState(false)
  const [input, setInput] = useInputState('')
  const [secretKey, setSecretKey] = useInputState('')

  const generateHash = (algorithm: HashAlgorithm) => {
    if (!input) return ''
    if (outputType === 'Base64') {
      return base64.stringify(algorithm(input))
    } else {
      return uppercase
        ? algorithm(input).toString().toUpperCase()
        : algorithm(input).toString()
    }
  }

  const generateHmacHash = (algorithm: HmacHashAlgorithm) => {
    if (!input || !secretKey) return ''
    if (outputType === 'Base64') {
      return base64.stringify(algorithm(input, secretKey))
    } else {
      return uppercase
        ? algorithm(input, secretKey).toString().toUpperCase()
        : algorithm(input, secretKey).toString()
    }
  }

  const selectOutputType = (value: string) => setOutputType(value)

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
      <Content title="Hash Generator">
        <Stack spacing="lg">
          <Stack spacing="xs">
            <Text>Configuration</Text>
            <ConfigItem icon={IconLetterCaseToggle} title="Uppercase">
              <Switch
                checked={uppercase}
                onChange={setUppercase}
                disabled={outputType === 'Base64'}
              />
            </ConfigItem>
            <ConfigItem icon={IconAdjustmentsHorizontal} title="Output Type">
              <Select data={['Hex', 'Base64']} value={outputType} onChange={selectOutputType} />
            </ConfigItem>
            <ConfigItem icon={IconMailOpened} title="HMAC Mode">
              <Switch checked={hmacMode} onChange={setHmacMode} />
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