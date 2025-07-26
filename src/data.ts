import {
  IconArrowsRightLeft,
  IconAsterisk,
  IconBinary,
  IconBrandHtml5,
  IconClock,
  IconDatabase,
  IconEngine,
  IconFingerprint,
  IconHome2,
  IconIndentIncrease,
  IconLetterCase,
  IconLetterJ,
  IconLetterL,
  IconLetterU,
  IconLink,
  IconMarkdown,
  IconSeparatorVertical,
  IconSettings,
  IconTypography,
  type TablerIcon,
} from "@tabler/icons";

export interface Tool {
  title: string;
  titleShort?: string;
  slug: string;
  icon: TablerIcon;
  description?: string;
}

interface ToolGroup {
  title: string;
  slug: string;
  icon: TablerIcon;
  tools: Tool[];
}

const toolGroups: ToolGroup[] = [
  {
    title: "Converters",
    slug: "converters",
    icon: IconArrowsRightLeft,
    tools: [
      {
        title: "Cron Expression Parser",
        titleShort: "Cron Parser",
        slug: "cron-parser",
        icon: IconClock,
        description: "Parse Cron expression to get scheduled dates",
      },
    ],
  },
  {
    title: "Encoders / Decoders",
    slug: "encoders-decoders",
    icon: IconBinary,
    tools: [
      {
        title: "HTML Encoder / Decoder",
        titleShort: "HTML",
        slug: "html-encoder-decoder",
        icon: IconBrandHtml5,
        description:
          "Encode or decode all the applicable characters to their corresponding HTML entities",
      },
      {
        title: "URL Encoder / Decoder",
        titleShort: "URL",
        slug: "url-encoder-decoder",
        icon: IconLink,
        description:
          "Encode or decode all the applicable characters to their corresponding URL entities",
      },
      // {
      //   title: 'GZip Compress / Decompress',
      //   titleShort: 'GZip',
      //   slug: 'gzip-compress-decompress',
      //   icon: IconFileZip,
      //   description: 'Compress or decompress strings'
      // },
      {
        title: "JWT Decoder",
        titleShort: "JWT Decoder",
        slug: "jwt-decoder",
        icon: IconAsterisk,
        description: "Decode a JWT header, payload and signature",
      },
    ],
  },
  {
    title: "Formatters",
    slug: "formatters",
    icon: IconIndentIncrease,
    tools: [
      {
        title: "JSON Formatter",
        titleShort: "JSON",
        slug: "json-formatter",
        icon: IconLetterJ,
        description: "Indent or minify JSON data",
      },
      {
        title: "SQL Formatter",
        titleShort: "SQL",
        slug: "sql-formatter",
        icon: IconDatabase,
        description: "Indent SQL queries",
      },
    ],
  },
  {
    title: "Generators",
    slug: "generators",
    icon: IconEngine,
    tools: [
      {
        title: "Hash Generator",
        titleShort: "Hash",
        slug: "hash-generator",
        icon: IconFingerprint,
        description:
          "Calculate MD5, SHA1, SHA256, and SHA512 hash from text data",
      },
      {
        title: "UUID Generator",
        titleShort: "UUID",
        slug: "uuid-generator",
        icon: IconLetterU,
        description: "Generate UUIDs version 1 and 4",
      },
      {
        title: "Lorem Ipsum Generator",
        titleShort: "Lorem Ipsum",
        slug: "lorem-ipsum-generator",
        icon: IconLetterL,
        description: "Generate Lorem Ipsum placeholder text",
      },
      // {
      //   title: 'Checksum Generator',
      //   titleShort: 'Checksum',
      //   slug: 'checksum-generator-generator',
      //   icon: IconFileCheck,
      //   description: 'Generate a hash with Checksum based on a file'
      // }
    ],
  },
  {
    title: "Text",
    slug: "text",
    icon: IconLetterCase,
    tools: [
      {
        title: "Text Case Converter and Inspector",
        titleShort: "Inspector & Case Converter",
        slug: "inspector-case-converter",
        icon: IconTypography,
        description: "Analyze text and convert it to a different case",
      },
      {
        title: "Text Comparer",
        titleShort: "Text Diff",
        slug: "text-comparer",
        icon: IconSeparatorVertical,
        description: "Compare two texts",
      },
      {
        title: "Markdown Preview",
        titleShort: "Markdown Preview",
        slug: "markdown-preview",
        icon: IconMarkdown,
        description: "Preview a Markdown document with a GitHub-like render",
      },
    ],
  },
];

const homeData: Tool = {
  title: "All tools",
  slug: "",
  icon: IconHome2,
};

const settingsData: Tool = {
  title: "Settings",
  slug: "settings",
  icon: IconSettings,
  description: "Customize DevToys Tauri",
};

const toolGroupsData: Tool[] = toolGroups
  .reduce((arr: Tool[], toolGroup) => arr.concat(toolGroup.tools), [])
  .sort((a, b) => (a.title > b.title ? 1 : -1));

const tools = [...toolGroupsData, settingsData];

export { toolGroups, tools, homeData, settingsData };
