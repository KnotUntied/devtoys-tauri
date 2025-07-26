import Content from "../components/Content";
import ToolGrid from "../components/ToolGrid";
import { toolGroups } from "../data";

interface CategoryProps {
  category: string;
}

export default function Category({ category }: CategoryProps) {
  const toolGroup = toolGroups.find((toolGroup) => toolGroup.slug === category);
  return (
    <Content title={toolGroup?.title ?? "Unknown category"}>
      <ToolGrid tools={toolGroup?.tools ?? []} />
    </Content>
  );
}
