import {
  Container,
  Title
} from '@mantine/core'

interface ContentProps {
  title: string
  children: React.ReactNode
}

export default function Content({ title, children }: ContentProps) {
  return (
    <Container>
      <Title order={2} mb='xs'>{title}</Title>
      {children}
    </Container>
  )
}