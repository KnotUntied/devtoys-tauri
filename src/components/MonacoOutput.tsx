import {
  Button,
  CopyButton,
  Group,
  type MantineColorScheme,
  Stack,
  Text,
} from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import Editor from "@monaco-editor/react";
import { IconCopy } from "@tabler/icons-react";

interface MonacoOutputProps {
  value: string;
  label: string;
  language: string;
  tabSize?: number;
}

export default function MonacoOutput({
  value,
  label,
  language,
  tabSize = 4,
}: MonacoOutputProps) {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<MantineColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "auto",
  });
  const [wordWrap, setWordWrap] = useLocalStorage<boolean>({
    key: "monaco-wordwrap",
    defaultValue: true,
  });
  const [lineNumbers, setLineNumbers] = useLocalStorage<boolean>({
    key: "monaco-linenumbers",
    defaultValue: true,
  });
  const [highlightCurrentLine, setHighlightCurrentLine] =
    useLocalStorage<boolean>({
      key: "monaco-highlightcurrentline",
      defaultValue: true,
    });
  const [renderWhitespace, setRenderWhitespace] = useLocalStorage<boolean>({
    key: "monaco-renderwhitespace",
    defaultValue: true,
  });

  const theme = (color: string) => (color === "dark" ? "vs-dark" : "light");

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
      <Editor
        value={value}
        height={130}
        defaultLanguage={language}
        theme={
          colorScheme === "auto"
            ? theme(systemColorScheme)
            : theme(colorScheme)
        }
        options={{
          codeLens: false,
          detectIndentation: false,
          lineNumbers: lineNumbers ? "on" : "off",
          readOnly: true,
          renderLineHighlight: highlightCurrentLine ? "all" : "none",
          renderWhitespace: renderWhitespace ? "all" : "none",
          tabSize,
          quickSuggestions: false,
          wordWrap: wordWrap ? "on" : "off",
        }}
      />
    </Stack>
  );
}
