import { Card, Center, Group, Text } from "@mantine/core";
import type { TablerIcon } from "@tabler/icons";
import { Link } from "react-router-dom";
import type { Tool } from "../data";

interface ToolCardProps {
  title: string;
  slug: string;
  icon: TablerIcon;
  description?: string;
}

export function ToolCard({
  slug,
  icon: Icon,
  title,
  description,
}: ToolCardProps) {
  return (
    <Card
      component={Link}
      to={`/${slug}`}
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        width: 175,
        height: 318,
      })}
    >
      <Card.Section>
        <Center
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            width: 100,
            height: 100,
          })}
          mx="auto"
          my={40}
        >
          <Icon size={64} />
        </Center>
      </Card.Section>
      <Text weight={500} size="sm" mt="md">
        {title}
      </Text>
      <Text color="dimmed" size="xs">
        {description}
      </Text>
    </Card>
  );
}

interface ToolGridProps {
  tools: Tool[];
}

export default function ToolGrid({ tools }: ToolGridProps) {
  return (
    <Group>
      {tools.map((tool) => (
        <ToolCard {...tool} key={tool.slug} />
      ))}
    </Group>
  );
}
