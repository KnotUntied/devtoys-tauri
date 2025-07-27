import { ActionIcon, CopyButton, Group, TextInput } from "@mantine/core";
import { IconCopy } from "@tabler/icons-react";

interface TextOutputProps {
  value: string;
  label: string;
}

export default function TextOutput({ value, label }: TextOutputProps) {
  return (
    <Group wrap="nowrap" gap="xs" align="end">
      <TextInput
        label={label}
        value={value}
        readOnly
        flex="1 !important"
        styles={{ input: { fontFamily: "monospace" } }}
      />
      <CopyButton value={value}>
        {({ copy }) => (
          <ActionIcon title="Copy" onClick={copy} variant="default" size={36}>
            <IconCopy size={24} />
          </ActionIcon>
        )}
      </CopyButton>
    </Group>
  );
}
