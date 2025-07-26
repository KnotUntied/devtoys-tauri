import Content from "../components/Content";
import ToolGrid from "../components/ToolGrid";
import { tools } from "../data";

export default function Home() {
  return (
    <Content title="All tools">
      <ToolGrid tools={tools} />
    </Content>
  );
}
