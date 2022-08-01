import {
  IconBinary,
  IconBrandHtml5,
  IconEngine,
  IconFingerprint,
  IconHome2,
  IconLetterU,
  IconLink,
  IconSettings
} from '@tabler/icons';

const toolGroups = [
  {
    title: 'Encoders / Decoders',
    slug: 'encoders-decoders',
    icon: IconBinary,
    tools: [
      {
        title: 'HTML Encoder / Decoder',
        titleShort: 'HTML',
        slug: 'HTMl-encoder-decoder',
        icon: IconBrandHtml5,
        description: 'Encode or decode all the applicable characters to their corresponding HTML entities'
      },
      {
        title: 'URL Encoder / Decoder',
        titleShort: 'URL',
        slug: 'url-encoder-decoder',
        icon: IconLink,
        description: 'Encode or decode all the applicable characters to their corresponding URL entities'
      }
    ]
  },
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