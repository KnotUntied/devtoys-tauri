import { Stack } from "@mantine/core";
import { decodeJwt, decodeProtectedHeader } from "jose";
import { create } from "zustand";
import Content from "../../components/Content";
import MonacoOutput from "../../components/MonacoOutput";
import TextareaInput from "../../components/TextareaInput";

interface State {
  input: string;
  setInput: (input: string) => void;
}

const useState = create<State>((set) => ({
  input: "",
  setInput: (input: string) => set((state: State) => ({ ...state, input })),
}));

export default function JWTDecoder() {
  const { input, setInput } = useState();

  let header = "";
  let payload = "";
  let error = false;

  if (input) {
    try {
      header = JSON.stringify(decodeProtectedHeader(input), null, "  ");
    } catch (e: unknown) {
      if (e instanceof Error) {
        header = e.message;
        error = true;
      }
    }

    try {
      payload = JSON.stringify(decodeJwt(input), null, "  ");
    } catch (e: unknown) {
      if (e instanceof Error) {
        payload = e.message;
        error = true;
      }
    }
  }

  return (
    <Content title="JWT Decoder">
      <Stack gap="lg">
        <TextareaInput
          value={input}
          setter={setInput}
          label="JWT Token"
          error={error}
        />
        <MonacoOutput value={header} label="Header" language="json" />
        <MonacoOutput value={payload} label="Payload" language="json" />
      </Stack>
    </Content>
  );
}
