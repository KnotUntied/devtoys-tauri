import { useState, useEffect } from 'react'
import {
  Group,
  Select,
  Stack,
  Switch,
  Text,
  TextInput
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import {
  IconArrowsRightLeft,
  IconCalendarEvent,
  IconLetterCase
} from '@tabler/icons'
import ConfigItem from '../../components/ConfigItem'
import Content from '../../components/Content'
import TextareaOutput from '../../components/TextareaOutput'

import { format } from 'date-fns'
import { parseCronExpression } from 'cron-schedule'
import cronValidate from 'cron-validate'

export default function CronParser() {
  // 6 segment is true, 5 segment is false
  const [cronMode, setCronMode] = useInputState<boolean>(true)
  // String to be parsed to number; Mantine quirk
  const [scheduledDates, setScheduledDates] = useState<string>('5')
  const [outputFormat, setOutputFormat] = useInputState<string>('yyyy-MM-dd ddd HH:mm:ss')
  const [input, setInput] = useInputState('* * * * * *')

  const selectScheduledDates = (value: string) => setScheduledDates(value)

  const now = new Date()
  let outputFormatError: React.ReactNode = false
  let output = ''

  const inputError: React.ReactNode = cronValidate(input, {
    preset: cronMode ? 'npm-node-cron' : 'default',
  }).isValid() ? false : 'Invalid cron expression'

  try {
    format(now, outputFormat)
  } catch (e: unknown) {
    if (e instanceof Error) {
      outputFormatError = 'Invalid output date time format'
    }
  }

  try {
    if (!inputError) {
      output = parseCronExpression(input)
                .getNextDates(parseInt(scheduledDates), now)
                .map(date => format(date, outputFormat))
                .join('\n')
    }
  } catch (e: unknown) {}

  return (
    <Content title="Cron Expression Parser">
      <Stack spacing="lg">
        <Stack spacing="xs">
          <Text>Configuration</Text>
          <ConfigItem
            icon={IconArrowsRightLeft}
            title="Cron Mode"
            description="Choose whether Cron expression should include seconds in its definition"
          >
            <Group spacing="xs">
              <Text>
                {
                  cronMode
                  ? 'Seconds included (6 - segment Cron)'
                  : 'Standard mode (5 - segment Cron)'
                }
              </Text>
              <Switch checked={cronMode} onChange={setCronMode} />
            </Group>
          </ConfigItem>
          <ConfigItem
            icon={IconCalendarEvent}
            title="Next Scheduled Dates"
            description="How many scheduled dates needs to be generated"
          >
            <Select data={['5', '10', '25', '50', '100']} value={scheduledDates} onChange={selectScheduledDates} />
          </ConfigItem>
          <ConfigItem
            icon={IconLetterCase}
            title="Output Format"
            description="Date time format of upcoming dates"
          >
            <TextInput
              value={outputFormat}
              onChange={setOutputFormat}
              error={outputFormatError}
            />
          </ConfigItem>
        </Stack>
        <Stack spacing="xs">
          <TextInput
            label="Cron expression to parse"
            value={input}
            onChange={setInput}
            error={inputError}
          />
        </Stack>
        <TextareaOutput value={output} label="Next scheduled dates" />
      </Stack>
    </Content>
  )
}