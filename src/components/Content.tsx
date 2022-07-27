import {
  Container,
  Title
} from '@mantine/core'

export default function Content({ title, children }) {
  return (
    <Container>
      <Title
        order={2}
        mb='xs'
      >
        {title}
      </Title>
      {children}
    </Container>
  )
}