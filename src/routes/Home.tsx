import { tools } from '../data'
import Content from '../components/Content'
import ToolGrid from '../components/ToolGrid'

export default function Home() {
  return (
    <Content title='All tools'>
      <ToolGrid tools={tools} />
    </Content>
  )
}