import { Group, type MantineColorScheme, Stack, Text } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { DiffEditor } from "@monaco-editor/react";

interface MonacoDiffOutputProps {
  original: string;
  modified: string;
  label: string;
  renderSideBySide: boolean;
}

export default function MonacoDiffOutput({
  original,
  modified,
  label,
  renderSideBySide,
}: MonacoDiffOutputProps) {
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
      </Group>
      <DiffEditor
        original={original}
        modified={modified}
        height={130}
        theme={
          colorScheme === "auto"
            ? theme(systemColorScheme)
            : theme(colorScheme)
        }
        options={{
          codeLens: false,
          lineNumbers: lineNumbers ? "on" : "off",
          readOnly: true,
          renderLineHighlight: highlightCurrentLine ? "all" : "none",
          renderSideBySide,
          renderWhitespace: renderWhitespace ? "all" : "none",
          quickSuggestions: false,
          wordWrap: wordWrap ? "on" : "off",
        }}
      />
    </Stack>
  );
}
