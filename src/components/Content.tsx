import { Container, Title } from "@mantine/core";
import { motion } from "framer-motion";

interface ContentProps {
  title: string;
  children: React.ReactNode;
}

export default function Content({ title, children }: ContentProps) {
  return (
    <Container>
      <Title order={2} mb="xs">
        {title}
      </Title>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeIn", duration: 0.2 }}
      >
        {children}
      </motion.div>
    </Container>
  );
}
