import {
  ActionIcon,
  Button,
  CloseButton,
  Group,
  type MantineColorScheme,
  Stack,
  Text,
} from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import Editor from "@monaco-editor/react";
import { IconClipboardText, IconFile } from "@tabler/icons-react";
import type * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useRef } from "react";

interface MonacoInputProps {
  value: string;
  setter(val: string): void;
  height?: number;
  label: string;
  language?: string;
}

type Monaco = typeof monaco;

export default function MonacoInput({
  value,
  setter,
  height,
  label,
  language,
}: MonacoInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
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
  const [replaceWhenPasting, setReplaceWhenPasting] = useLocalStorage<boolean>({
    key: "replacewhenpasting",
    defaultValue: true,
  });

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) {
    editorRef.current = editor;
  }

  const theme = (color: string) => (color === "dark" ? "vs-dark" : "light");

  const paste = async () => {
    editorRef.current?.focus();
    replaceWhenPasting && document.execCommand("selectAll", false);
    document.execCommand(
      "insertText",
      false,
      await navigator.clipboard.readText(),
    );
  };

  return (
    <Stack gap="xs">
      <Group justify="space-between" wrap="nowrap" gap="xl">
        <Text>{label}</Text>
        <Group wrap="nowrap" gap="xs">
          <Button
            variant="default"
            leftSection={<IconClipboardText />}
            onClick={paste}
          >
            Paste
          </Button>
          <input
            type="file"
            ref={fileRef}
            style={{ display: "none" }}
            onChange={async (e) => {
              if (e.target.files?.length === 1) {
                setter(await e.target.files[0].text());
                if (fileRef.current) {
                  fileRef.current.value = "";
                }
              }
            }}
          />
          <ActionIcon
            title="Load a file"
            variant="default"
            size={36}
            onClick={() => fileRef.current?.click()}
          >
            <IconFile size={24} />
          </ActionIcon>
          <CloseButton
            title="Clear"
            variant="default"
            size={36}
            iconSize={24}
            onClick={() => setter("")}
          />
        </Group>
      </Group>
      <Editor
        value={value}
        onChange={(value) => setter(value ?? "")}
        height={height ?? 130}
        defaultLanguage={language}
        theme={
          colorScheme === "system"
            ? theme(systemColorScheme)
            : theme(colorScheme)
        }
        onMount={handleEditorDidMount}
        options={{
          codeLens: false,
          lineNumbers: lineNumbers ? "on" : "off",
          renderLineHighlight: highlightCurrentLine ? "all" : "none",
          renderWhitespace: renderWhitespace ? "all" : "none",
          quickSuggestions: false,
          wordWrap: wordWrap ? "on" : "off",
        }}
      />
    </Stack>
  );
}
