import { useState } from 'react'
import {
  Button,
  CopyButton,
  CloseButton,
  Group,
  MantineProvider,
  NumberInput,
  Select,
  Stack,
  Switch,
  Text,
  Textarea
} from '@mantine/core'
import {
  IconAdjustmentsHorizontal,
  IconCopy,
  IconLetterCaseToggle,
  IconSeparator,
} from '@tabler/icons'
import { v1 as uuid, v4 as uuidv4 } from 'uuid'
import ConfigItem from '../../components/ConfigItem'
import Content from '../../components/Content'

const uuidData = [
  {
    value: '1',
    label: '1',
    func: uuid
  },
  {
    value: '4',
    label: '4 (GUID)',
    func: uuidv4
  }
]

const uuidSelectData = uuidData.map(item => ({ value: item.value, label: item.label }))

export default function UUIDGenerator() {
  const [hyphens, setHyphens] = useState(true)
  const [uppercase, setUppercase] = useState(false)
  const [uuidVersion, setUuidVersion] = useState('4')
  const [count, setCount] = useState(1)
  const [output, setOutput] = useState('')

  const generate = () => {
    const func = uuidData.find(version => version.value === uuidVersion).func
    let generated = ''
    for (let i = 0; i < count; i++) {
      let newUuid = func()
      if (!hyphens) {
        newUuid = newUuid.replaceAll('-', '')
      }
      if (uppercase) {
        newUuid = newUuid.toUpperCase()
      }
      generated = generated + newUuid + '\n'
    }
    setOutput(output + generated)
  }

  return (
    <Content title='UUID Generator'>
      <Stack spacing="lg">
        <Stack spacing="xs">
          <Text>Configuration</Text>
          <ConfigItem icon={IconSeparator} title="Hyphens">
            <Switch checked={hyphens} onChange={(event) => setHyphens(event.currentTarget.checked)} />
          </ConfigItem>
          <ConfigItem icon={IconLetterCaseToggle} title="Uppercase">
            <Switch checked={uppercase} onChange={(event) => setUppercase(event.currentTarget.checked)} />
          </ConfigItem>
          <ConfigItem
            icon={IconAdjustmentsHorizontal}
            title="UUID version"
            description="Choose the version of UUID to generate"
          >
            <Select
              data={uuidSelectData}
              value={uuidVersion}
              onChange={setUuidVersion}
            />
          </ConfigItem>
        </Stack>
        <Stack spacing="xs">
          <Text>Generate</Text>
          <Group spacing="xs">
            <Button onClick={generate}>Generate UUID(s)</Button>
            <Text sx={{ fontWeight: 'bold' }}>x</Text>
            <NumberInput
              value={count}
              onChange={(val) => setCount(val)}
              min={1}
              stepHoldDelay={500}
              stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            />
          </Group>
        </Stack>
        <Stack spacing="xs">
          <Group position="apart" noWrap spacing="xl">
            <Text>UUID(s)</Text>
            <Group noWrap spacing="xs">
              <CopyButton value={''}>
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
              <CloseButton
                title="Clear UUIDs"
                variant="default"
                size={36}
                iconSize={24}
                onClick={() => setOutput('')}
              />
            </Group>
          </Group>
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
            <Textarea
              value={output}
              minRows={6}
              readOnly
            />
          </MantineProvider>
        </Stack>
      </Stack>
    </Content>
  )
}