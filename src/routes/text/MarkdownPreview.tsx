import {
  Button,
  type ColorScheme,
  Group,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useDebouncedValue, useLocalStorage } from "@mantine/hooks";
import { IconCopy, IconPaint } from "@tabler/icons";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import create from "zustand";
import ConfigItem from "../../components/ConfigItem";
import Content from "../../components/Content";
import MarkdownPreviewComponent from "../../components/MarkdownPreview";
import MonacoInput from "../../components/MonacoInput";
import Split from "../../components/Split";
import { useFlash } from "../../contexts/FlashProvider";

interface State {
  input: string;
  setInput: (input: string) => void;
}

const useState = create<State>((set) => ({
  input: "",
  setInput: (input: string) => set((state: State) => ({ ...state, input })),
}));

export default function MarkdownPreview() {
  const [theme, setTheme] = useLocalStorage<ColorScheme>({
    key: "markdownPreview-theme",
    defaultValue: "light",
  });
  const { input, setInput } = useState();
  const [debounced] = useDebouncedValue(input, 200);
  const flash = useFlash();

  async function copy() {
    try {
      const output = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeKatex)
        .use(rehypeStringify)
        .process(debounced);
      await navigator.clipboard.writeText(String(output));
      flash({
        message: "Copied to clipboard.",
        type: "success",
      });
    } catch {
      flash({
        message: "Failed to copy to clipboard.",
        type: "danger",
      });
    }
  }

  return (
    <Content title="Markdown Preview">
      <Stack spacing="lg">
        <Stack spacing="xs">
          <Text>Configuration</Text>
          <ConfigItem
            icon={IconPaint}
            title="Theme"
            description="Select which theme to use to preview the Markdown"
          >
            <Select
              data={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              value={theme}
              onChange={(value: ColorScheme) => setTheme(value)}
            />
          </ConfigItem>
        </Stack>
        <Stack spacing="xs">
          <Split>
            <MonacoInput
              value={input}
              setter={setInput}
              label="Markdown"
              language="markdown"
              height={600}
            />
            <Stack spacing="xs" sx={() => ({ height: "100%" })}>
              <Group position="apart" noWrap spacing="xl">
                <Text>Preview</Text>
                <Button
                  onClick={copy}
                  variant="default"
                  leftIcon={<IconCopy />}
                >
                  Copy
                </Button>
              </Group>
              <MarkdownPreviewComponent dark={theme === "dark"}>
                {debounced}
              </MarkdownPreviewComponent>
            </Stack>
          </Split>
        </Stack>
      </Stack>
    </Content>
  );
}
