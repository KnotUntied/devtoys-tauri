import { useState, useEffect } from 'react'
import _ from 'lodash'
import {
  Button,
  CopyButton,
  CloseButton,
  Group,
  NumberInput,
  Select,
  Stack,
  Switch,
  Text,
  Textarea
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import {
  IconCopy,
  IconEngine,
  IconHash,
  IconRefresh,
  IconSettings,
} from '@tabler/icons'
import ConfigItem from '../../components/ConfigItem'
import Content from '../../components/Content'
import { LoremIpsum } from "lorem-ipsum"

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 20,
    min: 3
  },
  wordsPerSentence: {
    max: 20,
    min: 3
  }
})

const loremTypeData = [
  {
    value: 'words',
    label: 'Words'
  },
  {
    value: 'sentences',
    label: 'Sentences'
  },
  {
    value: 'paragraphs',
    label: 'Paragraphs'
  }
]

const loremConstant = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet']

export default function LoremIpsumGenerator() {
  const [loremType, setLoremType] = useState('paragraphs')
  const [length, setLength] = useInputState(3)
  const [startLorem, setStartLorem] = useInputState(false)
  const [output, setOutput] = useState('')

  const generate = () => {
    let _output = ''
    if (loremType === 'words') {
      _output = _.upperFirst(lorem.generateWords(length))
    } else if (loremType === 'sentences') {
      _output = lorem.generateSentences(length)
    } else if (loremType === 'paragraphs') {
      _output = lorem.generateParagraphs(length).replace('\n', '\n\n')
    }
    if (startLorem) {
      let first5 = _output.split(' ', 5)
      let newLorem = []
      first5.forEach((word, i) => newLorem.push(loremConstant[i]))
      first5 = first5.join(' ')
      newLorem = newLorem.join(' ')
      _output = _output.replace(first5, newLorem)
    }
    setOutput(_output)
  }

  useEffect(() => generate(length), [loremType, length, startLorem])

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
              onChange={setLoremType}
            />
          </ConfigItem>
          <ConfigItem
            icon={IconHash}
            title="Length"
            description="Number of words, sentences, or paragraphs to generate"
          >
            <NumberInput
              value={length}
              onChange={setLength}
              min={1}
              stepHoldDelay={500}
              stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            />
          </ConfigItem>
          <ConfigItem icon={IconSettings} title="Start with 'Lorem ipsum dolor sit amet...'">
            <Switch checked={startLorem} onChange={setStartLorem} />
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
                onClick={() => setOutput('')}
              />
            </Group>
          </Group>
          <Textarea
            value={output}
            minRows={6}
            readOnly
            styles={{ input: { fontFamily: 'monospace' } }}
          />
        </Stack>
      </Stack>
    </Content>
  )
}