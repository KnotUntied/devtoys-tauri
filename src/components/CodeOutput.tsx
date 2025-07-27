import { CodeHighlight } from "@mantine/code-highlight";
import { Stack, Text } from "@mantine/core";

interface CodeOutputProps {
  value: string;
  label: string;
  language: string;
}

export default function CodeOutput({
  value,
  label,
  language,
}: CodeOutputProps) {
  return (
    <Stack gap="xs">
      <Text>{label}</Text>
      <CodeHighlight
        code={value}
        // withLineNumbers
        language={language}
        styles={{
          code: {
            height: 130,
          },
        }}
      />
    </Stack>
  );
}
