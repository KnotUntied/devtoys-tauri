import { Stack, Text } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { Language } from 'prism-react-renderer';

interface CodeOutputProps {
  value: string
  label: string
  language: Language
}

export default function CodeOutput({ value, label, language }: CodeOutputProps) {
  return (
    <Stack spacing="xs">
      <Text>{label}</Text>
      <Prism
        withLineNumbers
        language={language}
        styles={(theme) => ({
          code: {
            height: 130
          }
        })}
      >
        {value}
      </Prism>
    </Stack>
  )
}