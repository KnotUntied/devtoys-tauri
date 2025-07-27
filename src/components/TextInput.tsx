import {
  ActionIcon,
  Button,
  CloseButton,
  Group,
  Stack,
  Text,
  TextInput as TextInputBase,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconClipboardText, IconFile } from "@tabler/icons-react";
import { useRef } from "react";

interface TextInputProps {
  value: string;
  setter(val: string): void;
  label: string;
  error?: React.ReactNode;
  file?: boolean;
  clear?: boolean;
}

export default function TextInput({
  value,
  setter,
  label,
  error,
  file,
  clear,
}: TextInputProps) {
  const [replaceWhenPasting, setReplaceWhenPasting] = useLocalStorage<boolean>({
    key: "replacewhenpasting",
    defaultValue: true,
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const paste = async () => {
    replaceWhenPasting ? inputRef.current?.select() : inputRef.current?.focus();
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
          {file && (
            <ActionIcon
              title="Load a file"
              variant="default"
              size={36}
              onClick={() => fileRef.current?.click()}
            >
              <IconFile size={24} />
            </ActionIcon>
          )}
          {clear && (
            <CloseButton
              title="Clear"
              variant="default"
              size={36}
              iconSize={24}
              onClick={() => setter("")}
            />
          )}
        </Group>
      </Group>
      <TextInputBase
        ref={inputRef}
        value={value}
        onChange={(event) => setter(event.currentTarget.value)}
        styles={{ input: { fontFamily: "monospace" } }}
        error={error}
      />
    </Stack>
  );
}
