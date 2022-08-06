import { useState, useEffect } from 'react'
import {
  Group,
  Stack,
  Select,
  Switch,
  Text
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { IconIndentIncrease, IconSortAscendingLetters } from '@tabler/icons'
import { css } from '@emotion/react'
import ConfigItem from '../../components/ConfigItem'
import Content from '../../components/Content'
import MonacoInput from '../../components/MonacoInput'
import MonacoOutput from '../../components/MonacoOutput'
import Split from '../../components/Split'
import JSON5 from 'json5'
import sortKeys from 'sort-keys'

export default function JSONFormatter() {
  // encode is true, decode is false
  const [indentation, setIndentation] = useState('  ')
  const [sort, setSort] = useInputState(true)
  const [input, setInput] = useInputState('')
  // Would've been a computed value if it didn't show a one-frame artifact
  const [output, setOutput] = useState('')

  useEffect(() => {
    try {
      setOutput(
        JSON.stringify(
          sort ? sortKeys(JSON5.parse(input), { deep: true }) : JSON5.parse(input),
          undefined,
          indentation === 'null' ? undefined : indentation
        )
      )
    } catch (e: unknown) {
      if (e instanceof Error) {
        setOutput(e.message)
      }
    }
  }, [indentation, sort, input])

  const selectIndentation = (value: string) => setIndentation(value)

  return (
    <Content title="JSON Formatter">
      <Stack spacing="lg">
        <Stack spacing="xs">
          <Text>Configuration</Text>
          <ConfigItem icon={IconIndentIncrease} title="Indentation">
            <Group spacing="xs">
              <Select
                data={[
                  {
                    value: '  ',
                    label: '2 spaces'
                  },
                  {
                    value: '    ',
                    label: '4 spaces'
                  },
                  {
                    value: '\t',
                    label: '1 tab'
                  },
                  {
                    value: 'null',
                    label: 'Minified'
                  }
                ]}
                value={indentation}
                onChange={selectIndentation}
              />
            </Group>
          </ConfigItem>
          <ConfigItem icon={IconSortAscendingLetters} title="Sort JSON properties alphabetically">
            <Group spacing="xs">
              <Text>{sort ? 'On' : 'Off'}</Text>
              <Switch checked={sort} onChange={setSort} />
            </Group>
          </ConfigItem>
        </Stack>
        <Stack spacing="xs">
          <Split>
            <MonacoInput value={input} setter={setInput} label="Input" language="json" />
            <MonacoOutput value={output} label="Output" language="json" />
          </Split>
        </Stack>
      </Stack>
    </Content>
  )
}