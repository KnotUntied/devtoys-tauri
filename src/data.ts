import {
  IconEngine,
  IconFingerprint,
  IconHome2,
  IconLetterU,
  IconSettings
} from '@tabler/icons';

const toolGroups = [
  {
    title: 'Generators',
    slug: 'generators',
    icon: IconEngine,
    tools: [
      {
        title: 'Hash Generator',
        titleShort: 'Hash',
        slug: 'hash-generator',
        icon: IconFingerprint,
        description: 'Calculate MD5, SHA1, SHA256, and SHA512 hash from text data'
      },
      {
        title: 'UUID Generator',
        titleShort: 'UUID',
        slug: 'uuid-generator',
        icon: IconLetterU,
        description: 'Generate UUIDs version 1 and 4'
      }
    ]
  }
]

const homeData = {
  title: 'All tools',
  slug: '',
  icon: IconHome2
}

const settingsData = {
  title: 'Settings',
  slug: 'settings',
  icon: IconSettings,
  description: 'Customize DevToys Tauri'
}

const toolGroupsData = toolGroups
    .reduce((arr, toolGroup) => arr.concat(toolGroup.tools), [])
    .sort((a, b) => (a.title > b.title) ? 1 : -1)

const tools = [...toolGroupsData, settingsData]

export {
  toolGroups,
  tools,
  homeData,
  settingsData
}