import { Stack, Text } from "@mantine/core";
import Content from "../../components/Content";

export default function UnixTimestampConverter() {
  const [timezone, setTimezone] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [date, setDate] = useState(new Date());

  return (
    <Content title="Unix Timestamp Converter">
      <Stack spacing="lg">
        <Stack spacing="xs">
          <Text>Time zone</Text>
        </Stack>
        <Stack spacing="xs"></Stack>
        <Stack spacing="xs"></Stack>
      </Stack>
    </Content>
  );
}
