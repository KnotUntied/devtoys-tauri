import {
  Button,
  CloseButton,
  CopyButton,
  Group,
  NumberInput,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  IconAdjustmentsHorizontal,
  IconCopy,
  IconLetterCaseToggle,
  IconSeparator,
} from "@tabler/icons-react";
import { v1 as uuid, v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import ConfigItem from "../../components/ConfigItem";
import Content from "../../components/Content";

interface State {
  output: string;
  setOutput: (output: string) => void;
}

const useState = create<State>((set) => ({
  output: "",
  setOutput: (output: string) => set((state: State) => ({ ...state, output })),
}));

const uuidData = [
  {
    value: "1",
    label: "1",
    func: uuid,
  },
  {
    value: "4",
    label: "4 (GUID)",
    func: uuidv4,
  },
];

const uuidSelectData = uuidData.map((item) => ({
  value: item.value,
  label: item.label,
}));

export default function UUIDGenerator() {
  const [hyphens, setHyphens] = useLocalStorage<boolean>({
    key: "uuidGenerator-hyphens",
    defaultValue: true,
  });
  const [uppercase, setUppercase] = useLocalStorage<boolean>({
    key: "uuidGenerator-uppercase",
    defaultValue: false,
  });
  const [uuidVersion, setUuidVersion] = useLocalStorage<string>({
    key: "uuidGenerator-uuidVersion",
    defaultValue: "4",
  });
  const [count, setCount] = useLocalStorage<number>({
    key: "uuidGenerator-count",
    defaultValue: 1,
  });
  const { output, setOutput } = useState();

  const generate = () => {
    const func = uuidData.find(
      (version) => version.value === uuidVersion,
    )?.func;
    if (!func) return;
    let generated = "";
    for (let i = 0; i < count; i++) {
      let newUuid = func();
      if (!hyphens) {
        newUuid = newUuid.replaceAll("-", "");
      }
      if (uppercase) {
        newUuid = newUuid.toUpperCase();
      }
      generated = `${generated + newUuid}\n`;
    }
    setOutput(output + generated);
  };

  return (
    <Content title="UUID Generator">
      <Stack gap="lg">
        <Stack gap="xs">
          <Text>Configuration</Text>
          <ConfigItem icon={IconSeparator} title="Hyphens">
            <Switch
              checked={hyphens}
              onChange={(event) => setHyphens(event.currentTarget.checked)}
            />
          </ConfigItem>
          <ConfigItem icon={IconLetterCaseToggle} title="Uppercase">
            <Switch
              checked={uppercase}
              onChange={(event) => setUppercase(event.currentTarget.checked)}
            />
          </ConfigItem>
          <ConfigItem
            icon={IconAdjustmentsHorizontal}
            title="UUID version"
            description="Choose the version of UUID to generate"
          >
            <Select
              data={uuidSelectData}
              value={uuidVersion}
              onChange={(value, _) => setUuidVersion(value as string)}
            />
          </ConfigItem>
        </Stack>
        <Stack gap="xs">
          <Text>Generate</Text>
          <Group gap="xs">
            <Button onClick={generate}>Generate UUID(s)</Button>
            <Text fw="bold">x</Text>
            <NumberInput
              value={count}
              onChange={(value) => setCount(Number(value))}
              min={1}
              stepHoldDelay={500}
              stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            />
          </Group>
        </Stack>
        <Stack gap="xs">
          <Group justify="space-between" wrap="nowrap" gap="xl">
            <Text>UUID(s)</Text>
            <Group wrap="nowrap" gap="xs">
              <CopyButton value={output}>
                {({ copy }) => (
                  <Button
                    onClick={copy}
                    variant="default"
                    leftSection={<IconCopy />}
                  >
                    Copy
                  </Button>
                )}
              </CopyButton>
              <CloseButton
                title="Clear UUIDs"
                variant="default"
                size={36}
                iconSize={24}
                onClick={() => setOutput("")}
              />
            </Group>
          </Group>
          <Textarea
            value={output}
            minRows={6}
            readOnly
            styles={{ input: { fontFamily: "monospace" } }}
          />
        </Stack>
      </Stack>
    </Content>
  );
}
