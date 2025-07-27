import {
  Button,
  CopyButton,
  Group,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { IconCopy } from "@tabler/icons-react";

interface TextareaOutputProps {
  value: string;
  label: string;
}

export default function TextareaOutput({ value, label }: TextareaOutputProps) {
  return (
    <Stack gap="xs">
      <Group justify="space-between" wrap="nowrap" gap="xl">
        <Text>{label}</Text>
        <CopyButton value={value}>
          {({ copy }) => (
            <Button onClick={copy} variant="default" leftSection={<IconCopy />}>
              Copy
            </Button>
          )}
        </CopyButton>
      </Group>
      <Textarea
        value={value}
        minRows={6}
        readOnly
        styles={{ input: { fontFamily: "monospace" } }}
      />
    </Stack>
  );
}
