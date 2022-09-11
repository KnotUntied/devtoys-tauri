import { useState, useEffect } from 'react'
import {
  Group,
  Stack,
  Select,
  Switch,
  Text
} from '@mantine/core'
import { useLocalStorage, useSessionStorage } from '@mantine/hooks'
import { IconCode, IconIndentIncrease } from '@tabler/icons'
import ConfigItem from '../../components/ConfigItem'
import Content from '../../components/Content'
import MonacoInput from '../../components/MonacoInput'
import MonacoOutput from '../../components/MonacoOutput'
import Split from '../../components/Split'
import { format, SqlLanguage } from 'sql-formatter'

const indentationData = [
  {
    label: '2 spaces',
    tabWidth: 2,
    useTabs: false
  },
  {
    label: '4 spaces',
    tabWidth: 4,
    useTabs: false
  },
  {
    label: '1 tab',
    tabWidth: 1,
    useTabs: true
  }
]

export default function SQLFormatter() {
  const [language, setLanguage] = useLocalStorage<SqlLanguage>({
    key: 'sqlFormatter-language',
    defaultValue: 'sql',
  })
  const [indentation, setIndentation] = useLocalStorage<string>({
    key: 'sqlFormatter-indentation',
    defaultValue: '2 spaces',
  })
  const [input, setInput] = useSessionStorage<string>({
    key: 'sqlFormatter-input',
    defaultValue: '',
  })
  // Would've been a computed value if it didn't show a one-frame artifact
  const [output, setOutput] = useState<string>('')

  useEffect(() => {
    const { tabWidth, useTabs } = indentationData.find(i => i.label === indentation) ?? indentationData[0]
    setOutput(
      format(input, {
        language,
        tabWidth,
        useTabs,
        keywordCase: 'upper'
      })
    )
  }, [language, indentation, input])

  let monacoLanguage = 'sql'
  if (language === 'mysql') {
    monacoLanguage = 'mysql'
  } else if (language === 'postgresql') {
    monacoLanguage = 'pgsql'
  }

  return (
    <Content title="SQL Formatter">
      <Stack spacing="lg">
        <Stack spacing="xs">
          <Text>Configuration</Text>
          <ConfigItem icon={IconCode} title="Language">
            <Select
              data={[
                {
                  value: 'bigquery',
                  label: 'BigQuery'
                },
                {
                  value: 'db2',
                  label: 'DB2'
                },
                {
                  value: 'hive',
                  label: 'Hive'
                },
                {
                  value: 'mariadb',
                  label: 'MariaDB'
                },
                {
                  value: 'mysql',
                  label: 'MySQL'
                },
                {
                  value: 'n1ql',
                  label: 'N1QL'
                },
                {
                  value: 'plsql',
                  label: 'PL/SQL'
                },
                {
                  value: 'postgresql',
                  label: 'PostgreSQL'
                },
                {
                  value: 'redshift',
                  label: 'Amazon Redshift'
                },
                {
                  value: 'spark',
                  label: 'Spark SQL'
                },
                {
                  value: 'sql',
                  label: 'Standard SQL'
                },
                {
                  value: 'sqlite',
                  label: 'SQLite'
                },
                {
                  value: 'trino',
                  label: 'Trino / Presto'
                },
                {
                  value: 'tsql',
                  label: 'Transact-SQL'
                }
              ]}
              value={language}
              onChange={(value: SqlLanguage) => setLanguage(value)}
            />
          </ConfigItem>
          <ConfigItem icon={IconIndentIncrease} title="Indentation">
            <Select
              data={['2 spaces', '4 spaces', '1 tab']}
              value={indentation}
              onChange={(value: string) => setIndentation(value)}
            />
          </ConfigItem>
        </Stack>
        <Stack spacing="xs">
          <Split>
            <MonacoInput value={input} setter={setInput} label="Input" language={monacoLanguage} />
            <MonacoOutput value={output} label="Output" language={monacoLanguage} />
          </Split>
        </Stack>
      </Stack>
    </Content>
  )
}