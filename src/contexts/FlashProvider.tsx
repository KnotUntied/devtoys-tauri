import { showNotification } from "@mantine/notifications";
import { IconCheck, IconInfoCircle, IconX } from "@tabler/icons";
import { createContext, useContext } from "react";

interface IFlash {
  message: React.ReactNode;
  type: string;
  title?: string;
}

interface FlashContextType {
  flash(arg0: IFlash): void;
}

interface FlashProviderProps {
  children: React.ReactNode;
}

export const FlashContext = createContext<FlashContextType | undefined>(
  undefined,
);

export default function FlashProvider({ children }: FlashProviderProps) {
  const flash = ({ message, type, title }: IFlash) => {
    switch (type) {
      case "success":
        showNotification({
          title,
          message,
          color: "teal",
          icon: <IconCheck size={16} />,
        });
        break;
      case "info":
        showNotification({
          title,
          message,
          color: "blue",
          icon: <IconInfoCircle size={16} />,
        });
        break;
      case "danger":
        showNotification({
          title,
          message,
          color: "red",
          icon: <IconX size={16} />,
        });
        break;
      default:
        showNotification({ title, message });
    }
  };

  return (
    <FlashContext.Provider value={{ flash }}>{children}</FlashContext.Provider>
  );
}

export function useFlash() {
  const context = useContext(FlashContext);
  if (context === undefined) {
    throw new Error("useFlash must be used within a FlashProvider");
  }
  return context?.flash;
}
