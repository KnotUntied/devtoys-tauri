import {
  Box,
  Button,
  Group,
  Paper,
  Space,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { camelCase, kebabCase, snakeCase, upperFirst } from "lodash-es";
import { useMemo } from "react";
import create from "zustand";
import Content from "../../components/Content";
import TextareaInput from "../../components/TextareaInput";

interface State {
  originalText: string;
  isOriginal: boolean;
  input: string;
  convertCase: (transformedText: string) => void;
  restoreInput: () => void;
  setInput: (input: string) => void;
}

const useState = create<State>((set) => ({
  originalText: "",
  isOriginal: true,
  input: "",
  convertCase: (transformedText: string) =>
    set((state: State) => ({
      ...state,
      input: transformedText,
      isOriginal: false,
    })),
  restoreInput: () =>
    set((state: State) => ({
      ...state,
      input: state.originalText,
      isOriginal: true,
    })),
  setInput: (input: string) =>
    set((state: State) => ({
      ...state,
      input,
      originalText: input,
      isOriginal: true,
    })),
}));

interface TableRowProps {
  value: number;
  label: string;
}

function TableRow({ value, label }: TableRowProps) {
  return (
    <tr>
      <td>
        <Text>{label}:</Text>
      </td>
      <td>
        <Text align="right">{value}</Text>
      </td>
    </tr>
  );
}

const encoder = new TextEncoder();
const wordsRegex = /[\w]+/g;
const paragraphsRegex =
  /[^\r\n]*[^ \r\n]+[^\r\n]*((\r|\n|\r\n)[^\r\n]*[^ \r\n]+[^\r\n]*)*/g;

export default function InspectorCaseConverter() {
  const {
    originalText,
    isOriginal,
    input,
    convertCase,
    restoreInput,
    setInput,
  } = useState();
  const lines = useMemo(() => input.split("\n").length, [input]);
  const words = useMemo(() => input.match(wordsRegex)?.length ?? 0, [input]);
  const paragraphs = useMemo(
    () => input.match(paragraphsRegex)?.length ?? 0,
    [input],
  );
  const bytes = useMemo(() => encoder.encode(input).length, [input]);

  return (
    <Content title="Text Case Converter and Inspector">
      <Stack spacing="lg">
        <Stack spacing="xs">
          <Text>Convert</Text>
          <Group spacing="xs">
            <Button
              variant="default"
              disabled={isOriginal}
              onClick={restoreInput}
            >
              Original text
            </Button>
            <Button variant="default" disabled>
              Sentence case
            </Button>
            <Button
              variant="default"
              onClick={() => convertCase(originalText.toLowerCase())}
            >
              lower case
            </Button>
            <Button
              variant="default"
              onClick={() => convertCase(originalText.toUpperCase())}
            >
              UPPER CASE
            </Button>
            <Button variant="default" disabled>
              Title Case
            </Button>
            <Button
              variant="default"
              onClick={() =>
                convertCase(originalText.split("\n").map(camelCase).join("\n"))
              }
            >
              camelCase
            </Button>
            <Button
              variant="default"
              onClick={() =>
                convertCase(
                  originalText
                    .split("\n")
                    .map((l) => upperFirst(camelCase(l)))
                    .join("\n"),
                )
              }
            >
              PascalCase
            </Button>
            <Button
              variant="default"
              onClick={() =>
                convertCase(originalText.split("\n").map(snakeCase).join("\n"))
              }
            >
              snake_case
            </Button>
            <Button
              variant="default"
              onClick={() =>
                convertCase(
                  originalText
                    .split("\n")
                    .map((l) => snakeCase(l).toUpperCase())
                    .join("\n"),
                )
              }
            >
              CONSTANT_CASE
            </Button>
            <Button
              variant="default"
              onClick={() =>
                convertCase(originalText.split("\n").map(kebabCase).join("\n"))
              }
            >
              kebab-case
            </Button>
            <Button
              variant="default"
              onClick={() =>
                convertCase(
                  originalText
                    .split("\n")
                    .map((l) => kebabCase(l).toUpperCase())
                    .join("\n"),
                )
              }
            >
              COBOL-CASE
            </Button>
            <Button variant="default" disabled>
              Train-Case
            </Button>
            <Button
              variant="default"
              onClick={() =>
                convertCase(
                  Array.prototype.map
                    .call(originalText, (c, i) =>
                      i % 2 ? c.toUpperCase() : c.toLowerCase(),
                    )
                    .join(""),
                )
              }
            >
              aLtErNaTiNg cAsE
            </Button>
            <Button
              variant="default"
              onClick={() =>
                convertCase(
                  Array.prototype.map
                    .call(originalText, (c, i) =>
                      i % 2 ? c.toLowerCase() : c.toUpperCase(),
                    )
                    .join(""),
                )
              }
            >
              InVeRsE CaSe
            </Button>
          </Group>
        </Stack>
        <Group align="stretch" noWrap spacing="xs">
          <Box sx={{ flex: 1 }}>
            <TextareaInput
              value={input}
              setter={(val) => setInput(val)}
              label="String"
              height={960}
              copy
            />
          </Box>
          <Stack spacing="xs">
            <Space h={36} />
            <Paper p="md" sx={{ width: 200 }}>
              <Stack spacing="xs">
                <Box>
                  <Text>Selection</Text>
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <TableRow label="Line" value={0}></TableRow>
                      <TableRow label="Column" value={0}></TableRow>
                      <TableRow label="Position" value={0}></TableRow>
                    </tbody>
                  </table>
                </Box>
                <Box>
                  <Text>Statistics</Text>
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <TableRow
                        label="Characters"
                        value={input.length}
                      ></TableRow>
                      <TableRow label="Words" value={words}></TableRow>
                      <TableRow label="Lines" value={lines}></TableRow>
                      <TableRow label="Sentences" value={0}></TableRow>
                      <TableRow
                        label="Paragraphs"
                        value={paragraphs}
                      ></TableRow>
                      <TableRow label="Bytes" value={bytes}></TableRow>
                    </tbody>
                  </table>
                </Box>
                <Textarea
                  label="Word distribution"
                  value={""}
                  autosize
                  minRows={1}
                  maxRows={10}
                  readOnly
                />
                <Textarea
                  label="Character distribution"
                  value={""}
                  autosize
                  minRows={1}
                  maxRows={10}
                  readOnly
                />
              </Stack>
            </Paper>
          </Stack>
        </Group>
      </Stack>
    </Content>
  );
}
