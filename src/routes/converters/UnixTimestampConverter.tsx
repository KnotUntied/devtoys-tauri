import { Stack, Text } from "@mantine/core";
// import { useState } from "react";
import Content from "../../components/Content";

export default function UnixTimestampConverter() {
  // const [timezone, setTimezone] = useState("");
  // const [timestamp, setTimestamp] = useState("");
  // const [date, setDate] = useState(new Date());

  return (
    <Content title="Unix Timestamp Converter">
      <Stack gap="lg">
        <Stack gap="xs">
          <Text>Time zone</Text>
        </Stack>
        <Stack gap="xs"></Stack>
        <Stack gap="xs"></Stack>
      </Stack>
    </Content>
  );
}
