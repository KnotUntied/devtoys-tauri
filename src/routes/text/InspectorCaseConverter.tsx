import { useEffect, useMemo } from 'react'
import {
  Box,
  Button,
  Group,
  Paper,
  Space,
  Stack,
  Table,
  Text,
  Textarea
} from '@mantine/core'
import { useSessionStorage } from '@mantine/hooks'
import Content from '../../components/Content'
import TextareaInput from '../../components/TextareaInput'
import {
  camelCase,
  kebabCase,
  snakeCase,
  upperFirst,
  words as countWords
} from 'lodash-es'

interface TableRowProps {
  value: number
  label: string
}

function TableRow({ value, label }: TableRowProps) {
  return (
    <tr>
      <td><Text>{label}:</Text></td>
      <td><Text align="right">{value}</Text></td>
    </tr>
  )
}

const encoder = new TextEncoder()
const wordsRegex = /[\w]+/g
const paragraphsRegex = /[^\r\n]*[^ \r\n]+[^\r\n]*((\r|\n|\r\n)[^\r\n]*[^ \r\n]+[^\r\n]*)*/g

export default function InspectorCaseConverter() {
  const [originalText, setOriginalText] = useSessionStorage<string>({
    key: 'inspectorCaseConverter-originalText',
    defaultValue: '',
  })
  const [isOriginal, setIsOriginal] = useSessionStorage<boolean>({
    key: 'inspectorCaseConverter-isOriginal',
    defaultValue: true,
  })
  const [input, setInput] = useSessionStorage<string>({
    key: 'inspectorCaseConverter-input',
    defaultValue: '',
  })
  const lines = useMemo(() => input.split('\n').length, [input])
  const words = useMemo(() => input.match(wordsRegex)?.length ?? 0, [input])
  const paragraphs = useMemo(() => input.match(paragraphsRegex)?.length ?? 0, [input])
  const bytes = useMemo(() => encoder.encode(input).length, [input])

  useEffect(() => {
    if (isOriginal) {
      setOriginalText(input)
    }
  }, [input])

  return (
    <Content title="Text Case Converter and Inspector">
      <Stack spacing="lg">
        <Stack spacing="xs">
          <Text>Convert</Text>
          <Group spacing="xs">
            <Button
              variant="default"
              children="Original text"
              disabled={isOriginal}
              onClick={() => {
                setIsOriginal(true)
                setInput(originalText)
              }}
            />
            <Button variant="default" disabled>Sentence case</Button>
            <Button
              variant="default"
              children="lower case"
              onClick={() => {
                setIsOriginal(false)
                setInput(originalText.toLowerCase())
              }}
            />
            <Button
              variant="default"
              children="UPPER CASE"
              onClick={() => {
                setIsOriginal(false)
                setInput(originalText.toUpperCase())
              }}
            />
            <Button variant="default" disabled>Title Case</Button>
            <Button
              variant="default"
              children="camelCase"
              onClick={() => {
                setIsOriginal(false)
                setInput(originalText.split('\n').map(camelCase).join('\n'))
              }}
            />
            <Button
              variant="default"
              children="PascalCase"
              onClick={() => {
                setIsOriginal(false)
                setInput(originalText.split('\n').map(l => upperFirst(camelCase(l))).join('\n'))
              }}
            />
            <Button
              variant="default"
              children="snake_case"
              onClick={() => {
                setIsOriginal(false)
                setInput(originalText.split('\n').map(snakeCase).join('\n'))
              }}
            />
            <Button
              variant="default"
              children="CONSTANT_CASE"
              onClick={() => {
                setIsOriginal(false)
                setInput(originalText.split('\n').map(l => snakeCase(l).toUpperCase()).join('\n'))
              }}
            />
            <Button
              variant="default"
              children="kebab-case"
              onClick={() => {
                setIsOriginal(false)
                setInput(originalText.split('\n').map(kebabCase).join('\n'))
              }}
            />
            <Button
              variant="default"
              children="COBOL-CASE"
              onClick={() => {
                setIsOriginal(false)
                setInput(originalText.split('\n').map(l => kebabCase(l).toUpperCase()).join('\n'))
              }}
            />
            <Button variant="default" disabled>Train-Case</Button>
            <Button
              variant="default"
              children="aLtErNaTiNg cAsE"
              onClick={() => {
                setIsOriginal(false)
                setInput(Array.prototype.map.call(originalText, (c, i) => i % 2 ? c : c.toUpperCase()).join(''))
              }}
            />
            <Button
              variant="default"
              children="InVeRsE CaSe"
              onClick={() => {
                setIsOriginal(false)
                setInput(Array.prototype.map.call(originalText, (c, i) => i % 2 ? c.toUpperCase() : c).join(''))
              }}
            />
          </Group>
        </Stack>
        <Group align='stretch' noWrap spacing="xs">
          <Box sx={{ flex: 1 }}>
            <TextareaInput
              value={input}
              setter={val => {
                setInput(val)
                setIsOriginal(true)
              }}
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
                  <table style={{ width: '100%' }}>
                    <tbody>
                      <TableRow label="Line" value={0}></TableRow>
                      <TableRow label="Column" value={0}></TableRow>
                      <TableRow label="Position" value={0}></TableRow>
                    </tbody>
                  </table>
                </Box>
                <Box>
                  <Text>Statistics</Text>
                  <table style={{ width: '100%' }}>
                    <tbody>
                      <TableRow label="Characters" value={input.length}></TableRow>
                      <TableRow label="Words" value={words}></TableRow>
                      <TableRow label="Lines" value={lines}></TableRow>
                      <TableRow label="Sentences" value={0}></TableRow>
                      <TableRow label="Paragraphs" value={paragraphs}></TableRow>
                      <TableRow label="Bytes" value={bytes}></TableRow>
                    </tbody>
                  </table>
                </Box>
                <Textarea
                  label="Word distribution"
                  value={''}
                  autosize
                  minRows={1}
                  maxRows={10}
                  readOnly
                />
                <Textarea
                  label="Character distribution"
                  value={''}
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
  )
}