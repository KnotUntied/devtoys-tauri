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
import { useDidUpdate, useLocalStorage } from "@mantine/hooks";
import {
  IconCopy,
  IconEngine,
  IconHash,
  IconRefresh,
  IconSettings,
} from "@tabler/icons";
import { upperFirst } from "lodash-es";
import { LoremIpsum } from "lorem-ipsum";
import { useEffect } from "react";
import create from "zustand";
import ConfigItem from "../../components/ConfigItem";
import Content from "../../components/Content";

interface State {
  output: string;
  setOutput: (output: string) => void;
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

const useState = create<State>((set) => ({
  output: "",
  setOutput: (output: string) => set((state: State) => ({ ...state, output })),
  loaded: false,
  setLoaded: (loaded: boolean) => set((state: State) => ({ ...state, loaded })),
}));

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 20,
    min: 3,
  },
  wordsPerSentence: {
    max: 20,
    min: 3,
  },
});

const loremTypeData = [
  {
    value: "words",
    label: "Words",
  },
  {
    value: "sentences",
    label: "Sentences",
  },
  {
    value: "paragraphs",
    label: "Paragraphs",
  },
];

const loremConstant = ["Lorem", "ipsum", "dolor", "sit", "amet"];

export default function LoremIpsumGenerator() {
  const [loremType, setLoremType] = useLocalStorage<string>({
    key: "loremIpsumGenerator-loremType",
    defaultValue: "paragraphs",
  });
  const [length, setLength] = useLocalStorage<number>({
    key: "loremIpsumGenerator-length",
    defaultValue: 3,
  });
  const [startLorem, setStartLorem] = useLocalStorage<boolean>({
    key: "loremIpsumGenerator-startLorem",
    defaultValue: false,
  });
  const { output, setOutput, loaded, setLoaded } = useState();

  const generate = () => {
    let _output = "";
    if (loremType === "words") {
      _output = upperFirst(lorem.generateWords(length));
    } else if (loremType === "sentences") {
      _output = lorem.generateSentences(length);
    } else if (loremType === "paragraphs") {
      _output = lorem.generateParagraphs(length).replace("\n", "\n\n");
    }
    if (startLorem) {
      const first5 = _output.split(" ", 5);
      const newLorem: string[] = [];
      first5.forEach((_word, i) => newLorem.push(loremConstant[i]));
      const first5Joined = first5.join(" ");
      const newLoremJoined = newLorem.join(" ");
      _output = _output.replace(first5Joined, newLoremJoined);
    }
    setOutput(_output);
  };

  useEffect(() => {
    if (!loaded) {
      generate();
      setLoaded(true);
    }
  }, []);
  useDidUpdate(() => generate(), [loremType, length, startLorem]);

  return (
    <Content title="Lorem Ipsum Generator">
      <Stack spacing="lg">
        <Stack spacing="xs">
          <Text>Configuration</Text>
          <ConfigItem
            icon={IconEngine}
            title="UUID version"
            description="Choose the version of UUID to generate"
          >
            <Select
              data={loremTypeData}
              value={loremType}
              onChange={(value: string) => setLoremType(value)}
            />
          </ConfigItem>
          <ConfigItem
            icon={IconHash}
            title="Length"
            description="Number of words, sentences, or paragraphs to generate"
          >
            <NumberInput
              value={length}
              onChange={(value: number) => setLength(value)}
              min={1}
              stepHoldDelay={500}
              stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            />
          </ConfigItem>
          <ConfigItem
            icon={IconSettings}
            title="Start with 'Lorem ipsum dolor sit amet...'"
          >
            <Switch
              checked={startLorem}
              onChange={(event) => setStartLorem(event.currentTarget.checked)}
            />
          </ConfigItem>
        </Stack>
        <Stack spacing="xs">
          <Group position="apart" noWrap spacing="xl">
            <Text>Output</Text>
            <Group noWrap spacing="xs">
              <Button
                onClick={generate}
                variant="default"
                leftIcon={<IconRefresh />}
              >
                Refresh
              </Button>
              <CopyButton value={output}>
                {({ copy }) => (
                  <Button
                    onClick={copy}
                    variant="default"
                    leftIcon={<IconCopy />}
                  >
                    Copy
                  </Button>
                )}
              </CopyButton>
              <CloseButton
                title="Clear"
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
