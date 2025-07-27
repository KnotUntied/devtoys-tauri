import { Card, Center, Group, Text } from "@mantine/core";
import type { TablerIcon } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import type { Tool } from "../data";
import classes from "./ToolGrid.module.css";

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
      w={175}
      h={318}
      className={classes.card}
    >
      <Card.Section>
        <Center w={100} h={100} className={classes.center} mx="auto" my={40}>
          <Icon size={64} />
        </Center>
      </Card.Section>
      <Text fw={500} size="sm" mt="md">
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
