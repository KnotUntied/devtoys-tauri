import { useState } from 'react'
import {
  Select,
  Stack,
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import {
  IconPaint,
} from '@tabler/icons'
import ConfigItem from '../components/ConfigItem'
import Content from '../components/Content'

export default function Settings() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'system',
    getInitialValueInEffect: true,
  })

  return (
    <Content title='Settings'>
      <Stack spacing="lg">
        <Stack spacing="xs">
          <ConfigItem
            icon={IconPaint}
            title="App theme"
            description="Select which app theme to display"
          >
            <Select
              data={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'Use system settings' }
              ]}
              value={colorScheme}
              onChange={setColorScheme}
            />
          </ConfigItem>
        </Stack>
      </Stack>
    </Content>
  )
}