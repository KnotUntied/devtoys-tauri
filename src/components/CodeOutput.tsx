import { Text } from '@mantine/core'
import { Prism } from '@mantine/prism'

interface CodeOutputProps {
  value: string
  label: string
  language: string
}

export default function CodeOutput({ value, label, language }: CodeOutputProps) {
  return (
    <>
      <Text>{label}</Text>
      <Prism
        height={130}
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
    </>
  )
}