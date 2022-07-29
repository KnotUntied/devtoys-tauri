import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Center,
  Group,
  Icon as TablerIcon,
  Text,
  Title
} from '@mantine/core';

interface ToolCardProps {
  title: string;
  slug: string;
  icon: TablerIcon;
  description: string;
}

export function ToolCard({ slug, icon: Icon, title, description }: ToolCardProps) {
  return (
    <Card
      component={Link}
      to={`/${slug}`}
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        width: 175,
        height: 318,
      })}
    >
      <Card.Section>
        <Center
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            width: 100,
            height: 100,
          })}
          mx='auto'
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
  title: string;
  tools: ToolCardProps; // toolcardprops array
}

export default function ToolGrid({ title, tools }: ToolGridProps) {
  return (
    <Group>
      {tools.map(tool => <ToolCard {...tool} key={tool.slug}/>)}
    </Group>
  );
}