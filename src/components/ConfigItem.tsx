import { Group, Paper, Text } from "@mantine/core";
import type { TablerIcon } from "@tabler/icons";

interface ConfigItemProps {
  icon: TablerIcon;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function ConfigItem({
  icon: Icon,
  title,
  description,
  children,
}: ConfigItemProps) {
  return (
    <Paper p="md">
      <Group position="apart" noWrap spacing="xl">
        <Group noWrap spacing="md">
          <Group align="center">
            <Icon size={24} />
          </Group>
          <div>
            <Text>{title}</Text>
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          </div>
        </Group>
        {children}
      </Group>
    </Paper>
  );
}
