import { type RenderSplitterProps, Split } from "@geoffcox/react-splitter";
import { Divider } from "@mantine/core";

interface SplitComponentProps {
  children: React.ReactNode;
}

export default function SplitComponent({ children }: SplitComponentProps) {
  return (
    <Split
      splitterSize={"21px"}
      renderSplitter={(_props: RenderSplitterProps) => (
        <Divider
          mx="xs"
          px="xs"
          variant="dashed"
          orientation="vertical"
          h="100%"
        />
      )}
    >
      {children}
    </Split>
  );
}
