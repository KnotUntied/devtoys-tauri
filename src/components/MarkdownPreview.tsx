import { ScrollArea } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "../styles/github-markdown.css";
import "../styles/markdown-preview.css";
import "katex/dist/katex.min.css";

interface MarkdownPreviewProps {
  children: string;
  dark: boolean;
}

export default function MarkdownPreview({
  children,
  dark,
}: MarkdownPreviewProps) {
  return (
    <ScrollArea
      style={{ backgroundColor: dark ? "#0d1117" : "#ffffff", height: 600 }}
    >
      <div className="markdown-body" data-theme={dark ? "dark" : "light"}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {children}
        </ReactMarkdown>
      </div>
    </ScrollArea>
  );
}
