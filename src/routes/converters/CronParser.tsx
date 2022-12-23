import {
  Group,
  Select,
  Stack,
  Switch,
  Text,
  TextInput as TextInputBase
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import {
  IconArrowsRightLeft,
  IconCalendarEvent,
  IconLetterCase
} from '@tabler/icons'
import ConfigItem from '../../components/ConfigItem'
import Content from '../../components/Content'
import TextInput from '../../components/TextInput'
import TextareaOutput from '../../components/TextareaOutput'

import { format } from 'date-fns'
import { parseCronExpression } from 'cron-schedule'
import cronValidate from 'cron-validate'

import create from 'zustand'

interface State {
  input: string,
  setInput: (input: string) => void
}

const useState = create<State>(set => ({
  input: '* * * * * *',
  setInput: (input: string) => set((state: State) => ({ ...state, input }))
}))

export default function CronParser() {
  // 6 segment is true, 5 segment is false
  const [cronMode, setCronMode] = useLocalStorage<boolean>({
    key: 'cronParser-cronMode',
    defaultValue: true,
  })
  // String to be parsed to number; Mantine limitation
  const [scheduledDates, setScheduledDates] = useLocalStorage<string>({
    key: 'cronParser-scheduledDates',
    defaultValue: '5',
  })
  const [outputFormat, setOutputFormat] = useLocalStorage<string>({
    key: 'cronParser-outputFormat',
    defaultValue: 'yyyy-MM-dd ddd HH:mm:ss',
  })
  const { input, setInput } = useState()

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
              <Switch checked={cronMode} onChange={event => setCronMode(event.currentTarget.checked)} />
            </Group>
          </ConfigItem>
          <ConfigItem
            icon={IconCalendarEvent}
            title="Next Scheduled Dates"
            description="How many scheduled dates needs to be generated"
          >
            <Select
              data={['5', '10', '25', '50', '100']}
              value={scheduledDates}
              onChange={(value: string) => setScheduledDates(value)}
            />
          </ConfigItem>
          <ConfigItem
            icon={IconLetterCase}
            title="Output Format"
            description="Date time format of upcoming dates"
          >
            <TextInputBase
              value={outputFormat}
              onChange={event => setOutputFormat(event.currentTarget.value)}
              error={outputFormatError}
            />
          </ConfigItem>
        </Stack>
        <Stack spacing="xs">
          <TextInput
            label="Cron expression to parse"
            value={input}
            setter={setInput}
            error={inputError}
          />
        </Stack>
        <TextareaOutput value={output} label="Next scheduled dates" />
      </Stack>
    </Content>
  )
}