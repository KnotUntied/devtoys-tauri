import { ActionIcon, CopyButton, Group, TextInput } from "@mantine/core";
import { IconCopy } from "@tabler/icons";

interface TextOutputProps {
  value: string;
  label: string;
}

export default function TextOutput({ value, label }: TextOutputProps) {
  return (
    <Group noWrap spacing="xs" align="end">
      <TextInput
        label={label}
        value={value}
        readOnly
        sx={{ flex: "1 !important" }}
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
