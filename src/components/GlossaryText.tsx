import React, { useMemo } from "react";
import { Tooltip } from "@fluentui/react-tooltip";
import glossaryData from "../data/glossary.json";
import { GlossaryEntry } from "../types/types";
import { buildTrie, findMatches, splitText } from "../utils/trie";
import ReactMarkdown from "react-markdown";

interface Props {
  text: string;
}

const GlossaryText: React.FC<Props> = ({ text }) => {
  const glossary = glossaryData.map((entry) => ({
    ...entry,
    ja: entry.jp,
  })) as GlossaryEntry[];

  const trie = useMemo(() => buildTrie(glossary), [glossary]);

  // 根据段落级别逐段分词（Markdown 渲染器会逐段送入）
  const renderWithGlossary = (raw: string) => {
    const matches = findMatches(raw, trie);
    const segments = splitText(raw, matches);

    const getEntry = (term: string) => glossary.find((g) => g.term === term);

    return segments.map((seg, i) =>
      seg.term ? (
        <Tooltip
          key={i}
          relationship="label"
          content={(() => {
            const e = getEntry(seg.term!);
            return (
              <div style={{
                padding: '8px',
                backgroundColor: '#ccccff',
                borderColor: '#6666ff',
                fontSize: '12px',
                borderRadius: '6px',
                lineHeight: 1.4
              }}>
                {e ? (
                  <>
                    <div>中文: {e.zh}</div>
                    <div>日文: {e.ja}</div>
                    <div>English: {e.en}</div>
                  </>
                ) : (
                  <div>No glossary entry found.</div>
                )}
              </div>
            );
          })()}
        >
          <span style={{ textDecoration: "underline", cursor: "help" }}>
            {seg.term}
          </span>
        </Tooltip>
      ) : (
        <span key={i}>{seg.text}</span>
      )
    );
  };

  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p>{renderWithGlossary(children?.toString() || '')}</p>,
        li: ({ children }) => <li>{renderWithGlossary(children?.toString() || '')}</li>,
        h1: ({ children }) => <h1>{renderWithGlossary(children?.toString() || '')}</h1>,
        h2: ({ children }) => <h2>{renderWithGlossary(children?.toString() || '')}</h2>,
        h3: ({ children }) => <h3>{renderWithGlossary(children?.toString() || '')}</h3>,
        strong: ({ children }) => <strong>{renderWithGlossary(children?.toString() || '')}</strong>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
};

export default GlossaryText;
