import { Button } from '@mantine/core'
import { IconCopy } from '@tabler/icons'
// import { writeText } from '../polyfills'

interface CopyButtonProps {
  value: string,
  label?: string
}

export default function CopyButton({ value, label }: CopyButtonProps) {
  return (
    <Button
      onClick={async () => await navigator.clipboard.writeText(value)}
      variant="default"
      leftIcon={<IconCopy />}
    >
      {label}
    </Button>
  )
}