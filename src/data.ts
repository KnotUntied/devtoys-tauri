import {
  Fingerprint,
  Settings
} from 'tabler-icons-react';

const toolGroups = [
  {
    title: 'Generators',
    slug: 'generators',
    tools: [
      {
        title: 'Hash Generator',
        slug: 'hash-generator',
        icon: Fingerprint,
        description: 'Calculate MD5, SHA1, SHA256, and SHA512 hash from text data'
      }
    ]
  }
]

const settingsData = {
  title: 'Settings',
  slug: 'settings',
  icon: Settings,
  description: 'Customize DevToys Tauri'
}

export {
  toolGroups,
  settingsData
}