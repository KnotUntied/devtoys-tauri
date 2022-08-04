import { Stack } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import Content from '../../components/Content'
import CodeOutput from '../../components/CodeOutput'
import TextareaInput from '../../components/TextareaInput'

import { decodeProtectedHeader, decodeJwt } from 'jose'

export default function JWTDecoder() {
  const [input, setInput] = useInputState('')

  let header, payload

  try {
    header = JSON.stringify(decodeProtectedHeader(input), null, '  ')
  } catch (e) {
    header = input ? e.message : ''
  }

  try {
    payload = JSON.stringify(decodeJwt(input), null, '  ')
  } catch (e) {
    payload = input ? e.message : ''
  }

  return (
    <Content title="JWT Decoder">
      <Stack spacing="lg">
        <Stack spacing="xs">
          <TextareaInput value={input} setter={setInput} label="JWT Token" />
        </Stack>
        <Stack spacing="xs">
          <CodeOutput value={header} label="Header" language="json" />
        </Stack>
        <Stack spacing="xs">
          <CodeOutput value={payload} label="Payload" language="json" />
        </Stack>
      </Stack>
    </Content>
  )
}