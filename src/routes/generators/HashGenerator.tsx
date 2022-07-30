import { useState } from 'react'
import {
  ActionIcon,
  Button,
  CopyButton,
  CloseButton,
  FileButton,
  Group,
  MantineProvider,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  Tooltip
} from '@mantine/core'
import {
  IconAdjustmentsHorizontal,
  IconClipboardText,
  IconCopy,
  IconFile,
  IconLetterCaseToggle,
  IconMailOpened,
} from '@tabler/icons'
import ConfigItem from '../../components/ConfigItem'
import Content from '../../components/Content'

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
        <ActionIcon onClick={copy} variant="default" size={36}>
          <IconCopy size={16} />
        </ActionIcon>
      )}
    </CopyButton>
  </Group>
)

export default function HashGenerator() {
  const [uppercase, setUppercase] = useState(false)
  const [outputType, setOutputType] = useState('Hex')
  const [hmacMode, setHmacMode] = useState(false)
  const [input, setInput] = useState('')
  const [secretKey, setSecretKey] = useState('')

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
          Textarea: {
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
            <Group position="apart" noWrap spacing="xl">
              <Text>Input</Text>
              <Group noWrap spacing="xs">
                <CloseButton title="Clear" variant="default" size="lg" onClick={() => setInput('')} />
              </Group>
            </Group>
            <Textarea
              value={input}
              onChange={(event) => setInput(event.currentTarget.value)}
              minRows={6}
            />
          </Stack>
          { hmacMode &&
            <Stack spacing="xs">
              <Group position="apart" noWrap spacing="xl">
                <Text>Secret Key</Text>
                <Group noWrap spacing="xs">
                  <CloseButton title="Clear" variant="default" size="lg" onClick={() => setSecretKey('')} />
                </Group>
              </Group>
              <Textarea
                value={secretKey}
                onChange={(event) => setSecretKey(event.currentTarget.value)}
                minRows={6}
              />
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