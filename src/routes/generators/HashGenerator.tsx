import { useState } from 'react'
import {
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

export default function HashGenerator() {
  const [uppercase, setUppercase] = useState(false)
  const [outputType, setOutputType] = useState('Hex')

  const generate = () => {
  }

  return (
    <Content title='Hash Generator'>
      <Stack spacing="lg">
        <Stack spacing="xs">
          <Text>Configuration</Text>
          <ConfigItem icon={IconLetterCaseToggle} title="Uppercase">
            <Switch checked={uppercase} onChange={(event) => setUppercase(event.currentTarget.checked)} />
          </ConfigItem>
          <ConfigItem icon={IconAdjustmentsHorizontal} title="Output Type">
            <Select
              data={['Hex', 'Base64']}
              value={outputType}
              onChange={setOutputType}
            />
          </ConfigItem>
        </Stack>
      </Stack>
    </Content>
  )
}