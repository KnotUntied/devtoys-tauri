import { toolGroups } from '../data'
import Content from '../components/Content'
import ToolGrid from '../components/ToolGrid'

export default function Search({ query }) {
  const toolGroup = toolGroups.filter(toolGroup => toolGroup.title.contains(query))
  return (
    <Content title={toolGroup.title}>
      <ToolGrid tools={toolGroup.tools} />
    </Content>
  )
}