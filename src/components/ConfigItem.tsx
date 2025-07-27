import { Group, Paper, Text } from "@mantine/core";
import type { TablerIcon } from "@tabler/icons-react";

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
      <Group justify="space-between" wrap="nowrap" gap="xl">
        <Group wrap="nowrap" gap="md">
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
