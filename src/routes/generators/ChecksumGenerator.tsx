import { Group, Select, Stack, Switch, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useInputState } from "@mantine/hooks";
import {
  IconAdjustmentsHorizontal,
  IconLetterCaseToggle,
} from "@tabler/icons-react";
import type md5 from "crypto-js/md5";
import type sha1 from "crypto-js/sha1";
import type sha256 from "crypto-js/sha256";
import type sha384 from "crypto-js/sha384";
import type sha512 from "crypto-js/sha512";
import { useState } from "react";
import ConfigItem from "../../components/ConfigItem";
import Content from "../../components/Content";
import TextInput from "../../components/TextInput";
import TextOutput from "../../components/TextOutput";

type HashAlgorithm =
  | typeof md5
  | typeof sha1
  | typeof sha256
  | typeof sha384
  | typeof sha512;

export default function ChecksumGenerator() {
  const [uppercase, setUppercase] = useInputState(false);
  const [algorithm, setAlgorithm] = useState("MD5");
  const [output, setOutput] = useState({
    MD5: "",
    SHA1: "",
    SHA256: "",
    SHA384: "",
    SHA512: "",
  });
  const [comparer, setComparer] = useInputState("");

  let error = false;

  return (
    <Content title="Hash Generator">
      <Stack gap="lg">
        <Stack gap="xs">
          <Text>Configuration</Text>
          <ConfigItem icon={IconLetterCaseToggle} title="Uppercase">
            <Switch checked={uppercase} onChange={setUppercase} />
          </ConfigItem>
          <ConfigItem icon={IconAdjustmentsHorizontal} title="Output Type">
            <Select
              data={["MD5", "SHA1", "SHA256", "SHA384", "SHA512"]}
              value={algorithm}
              onChange={(value, _) => setAlgorithm(value as string)}
            />
          </ConfigItem>
        </Stack>
        <Stack gap="xs">
          <Dropzone
            multiple={false}
            onDrop={(files) => console.log("accepted files", files)}
          >
            <Group
              justify="space-between"
              gap="xl"
              style={{ minHeight: 220, pointerEvents: "none" }}
            >
              <div>
                <Text size="xl" inline>
                  Drag & drop any file here or click here to browse files
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Stack>
        <TextOutput value={""} label="Output" />
        <TextInput
          value={comparer}
          setter={setComparer}
          label="Input"
          error={error}
        />
      </Stack>
    </Content>
  );
}
