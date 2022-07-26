import { toolGroups, settingsData } from '../data'
import ToolGrid from '../components/ToolGrid'

export default function Home() {
  // const toolGroupsData = toolGroups.reduce()
  const tools = [settingsData]
  return (
    <ToolGrid
      title="All tools"
      tools={tools}
    />
  );
}