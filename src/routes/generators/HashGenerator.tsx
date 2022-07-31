import { useState, useRef } from 'react'
import {
  ActionIcon,
  Button,
  CopyButton,
  CloseButton,
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
import { useInputState } from '@mantine/hooks'
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

const InputField = ({ value, setter, label }) => {
  const fileRef = useRef(null)
  const textareaRef = useRef(null)

  const paste = async () => {
    const selectionStart = textareaRef.current.selectionStart
    const selectionEnd = textareaRef.current.selectionEnd

    const beforeSelection = value.substring(0, selectionStart)
    const pastedText = await navigator.clipboard.readText()
    const afterSelection = value.substring(selectionEnd)
    setter(`${beforeSelection}${pastedText}${afterSelection}`)

    const newSelectionStart = selectionStart + startTag.length
    const newSelectionEnd = selectionEnd + startTag.length
    textArea.setSelectionRange(newSelectionStart, newSelectionEnd)
  }

  return (
    <>
      <Group position="apart" noWrap spacing="xl">
        <Text>{label}</Text>
        <Group noWrap spacing="xs">
          <Button variant="default" leftIcon={<IconClipboardText />} onClick={paste}>
            Paste
          </Button>
          <input
            type="file"
            ref={fileRef}
            style={{ display: 'none' }}
            onChange={async (e) => {
              if (e.target.files.length === 1) {
                setter(await e.target.files[0].text())
                fileRef.current.value = null
              }
            }}
          />
          <ActionIcon
            title="Load a file"
            variant="default"
            size={36}
            onClick={() => fileRef.current.click()}
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
      <Textarea ref={textareaRef} value={value} onChange={setter} minRows={6} />
    </>
  )
}

const OutputField = ({ value, label }) => (
  <Group noWrap spacing="xs" align='end'>
    <TextInput label={label} value={value} readOnly sx={{ flex: '1 !important' }} />
    <CopyButton value={value}>
      {({ copy }) => (
        <Tooltip
          label="Copy"
          position="top-end"
          transitionDuration={0}
          withArrow
        >
          <ActionIcon onClick={copy} variant="default" size={36}>
            <IconCopy size={24} />
          </ActionIcon>
        </Tooltip>
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
          Textarea: {
            styles: (theme) => ({
              input: { fontFamily: 'monospace' },
            }),
          },
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
            <InputField value={input} setter={setInput} label="Input" />
          </Stack>
          { hmacMode &&
            <Stack spacing="xs">
              <InputField value={secretKey} setter={setSecretKey} label="Secret Key" />
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