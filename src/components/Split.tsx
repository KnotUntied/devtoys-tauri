import { Divider } from '@mantine/core'
import { IconDirectionHorizontal } from '@tabler/icons'
import { RenderSplitterProps, Split } from '@geoffcox/react-splitter'

interface SplitComponentProps {
  children: React.ReactNode
}

export default function SplitComponent({ children }: SplitComponentProps) {
  return (
    <Split
      splitterSize={'21px'}
      renderSplitter={
        (props: RenderSplitterProps) => (
          <Divider
            mx="xs"
            px="xs"
            variant="dashed"
            orientation="vertical"
            sx={{ height: '100%' }}
          />
        )
      }
    >
      {children}
    </Split>
  )
}