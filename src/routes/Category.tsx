import { toolGroups } from '../data'
import Content from '../components/Content'
import ToolGrid from '../components/ToolGrid'

export default function Category({ category }) {
  const toolGroup = toolGroups.find(toolGroup => toolGroup.slug === category)
  return (
    <Content title={toolGroup.title}>
      <ToolGrid tools={toolGroup.tools} />
    </Content>
  )
}