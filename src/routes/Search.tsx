import { useSearchParams } from 'react-router-dom'
import { tools } from '../data'
import Content from '../components/Content'
import ToolGrid from '../components/ToolGrid'

export default function Search() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('q') || ''
  const result = tools.filter(tool => tool.title.includes(query))

  return (
    <Content title={result.length ? `Search results for "${query}"` : 'No results found'}>
      <ToolGrid tools={result} />
    </Content>
  )
}