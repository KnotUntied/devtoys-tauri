import { Group, Stack, Switch, Text } from "@mantine/core";
import { useDidUpdate, useLocalStorage } from "@mantine/hooks";
import { IconArrowsRightLeft } from "@tabler/icons-react";
import he from "he";
import { useEffect, useState } from "react";
import { create } from "zustand";
import ConfigItem from "../../components/ConfigItem";
import Content from "../../components/Content";
import TextareaInput from "../../components/TextareaInput";
import TextareaOutput from "../../components/TextareaOutput";

interface State {
  input: string;
  setInput: (input: string) => void;
}

const useInputState = create<State>((set) => ({
  input: "",
  setInput: (input: string) => set((state: State) => ({ ...state, input })),
}));

export default function HTMLEncoderDecoder() {
  // encode is true, decode is false
  const [conversion, setConversion] = useLocalStorage<boolean>({
    key: "htmlEncoderDecoder-conversion",
    defaultValue: true,
  });
  const { input, setInput } = useInputState();
  // Would've been a computed value if it didn't show a one-frame artifact
  const [output, setOutput] = useState<string>("");

  useDidUpdate(() => {
    const reversedOutput = conversion
      ? he.decode(input)
      : he.encode(input, { useNamedReferences: false, decimal: true });
    setInput(reversedOutput);
  }, [conversion]);

  useEffect(() => {
    setOutput(
      conversion
        ? he.encode(input, { useNamedReferences: false, decimal: true })
        : he.decode(input),
    );
  }, [input]);

  return (
    <Content title="HTML Encoder / Decoder">
      <Stack gap="lg">
        <Stack gap="xs">
          <Text>Configuration</Text>
          <ConfigItem
            icon={IconArrowsRightLeft}
            title="Conversion"
            description="Select which conversion mode you want to use"
          >
            <Group gap="xs" wrap="nowrap">
              <Text>{conversion ? "Encode" : "Decode"}</Text>
              <Switch
                checked={conversion}
                onChange={(event) => setConversion(event.currentTarget.checked)}
              />
            </Group>
          </ConfigItem>
        </Stack>
        <TextareaInput value={input} setter={setInput} label="Input" />
        <TextareaOutput value={output} label="Output" />
      </Stack>
    </Content>
  );
}
