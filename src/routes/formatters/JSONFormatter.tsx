import { Group, Select, Stack, Switch, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  IconIndentIncrease,
  IconSortAscendingLetters,
} from "@tabler/icons-react";
import JSON5 from "json5";
import { useEffect, useState } from "react";
import sortKeys from "sort-keys";
import { create } from "zustand";
import ConfigItem from "../../components/ConfigItem";
import Content from "../../components/Content";
import MonacoInput from "../../components/MonacoInput";
import MonacoOutput from "../../components/MonacoOutput";
import Split from "../../components/Split";

interface State {
  input: string;
  setInput: (input: string) => void;
}

const useInputState = create<State>((set) => ({
  input: "",
  setInput: (input: string) => set((state: State) => ({ ...state, input })),
}));

export default function JSONFormatter() {
  const [indentation, setIndentation] = useLocalStorage<string>({
    key: "jsonFormatter-indentation",
    defaultValue: "  ",
  });
  const [sort, setSort] = useLocalStorage<boolean>({
    key: "jsonFormatter-sort",
    defaultValue: true,
  });
  const { input, setInput } = useInputState();
  // Would've been a computed value if it didn't show a one-frame artifact
  const [output, setOutput] = useState<string>("");

  // unsorted has difference with OG DevToys :/
  useEffect(() => {
    try {
      setOutput(
        JSON.stringify(
          sort
            ? sortKeys(JSON5.parse(input), { deep: true })
            : JSON5.parse(input),
          undefined,
          indentation === "null" ? undefined : indentation,
        ),
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        setOutput(e.message);
      }
    }
  }, [indentation, sort, input]);

  return (
    <Content title="JSON Formatter">
      <Stack gap="lg">
        <Stack gap="xs">
          <Text>Configuration</Text>
          <ConfigItem icon={IconIndentIncrease} title="Indentation">
            <Select
              data={[
                {
                  value: "  ",
                  label: "2 spaces",
                },
                {
                  value: "    ",
                  label: "4 spaces",
                },
                {
                  value: "\t",
                  label: "1 tab",
                },
                {
                  value: "null",
                  label: "Minified",
                },
              ]}
              value={indentation}
              onChange={(value, _) => setIndentation(value ?? "  ")}
            />
          </ConfigItem>
          <ConfigItem
            icon={IconSortAscendingLetters}
            title="Sort JSON properties alphabetically"
          >
            <Group gap="xs">
              <Text>{sort ? "On" : "Off"}</Text>
              <Switch
                checked={sort}
                onChange={(event) => setSort(event.currentTarget.checked)}
              />
            </Group>
          </ConfigItem>
        </Stack>
        <Stack gap="xs">
          <Split>
            <MonacoInput
              value={input}
              setter={setInput}
              label="Input"
              language="json"
            />
            <MonacoOutput
              value={output}
              label="Output"
              language="json"
              tabSize={indentation === "  " ? 2 : 4}
            />
          </Split>
        </Stack>
      </Stack>
    </Content>
  );
}
