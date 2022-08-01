import {
  Group,
  Paper,
  Text
} from '@mantine/core'

export default function ConfigItem({ icon: Icon, title, description, children }) {
  return (
    <Paper p="md">
      <Group position="apart" noWrap spacing="xl">
        <Group noWrap spacing="md">
          <Group align="center">
            <Icon size={24} />
          </Group>
          <div>
            <Text>{title}</Text>
            <Text size="xs" color="dimmed">{description}</Text>
          </div>
        </Group>
        {children}
      </Group>
    </Paper>
  )
}