import React, { useMemo } from "react";
import { Tooltip } from "@fluentui/react-tooltip";
import glossaryData from "../data/glossary.json";
import { GlossaryEntry } from "../types/types";
import { buildTrie, findMatches, splitText } from "../utils/trie";

interface Props {
  text: string;
}

// 这个组件用于显示带有术语的文本，并在鼠标悬停时显示术语的详细信息
// 术语数据来自于 glossary.json 文件
// 使用 Trie 数据结构来高效查找术语
// 使用 useMemo 来优化性能，避免不必要的计算
// 通过 Tooltip 组件来实现悬停提示
// 术语的详细信息包括中文、日文和英文翻译
const GlossaryText: React.FC<Props> = ({ text }) => {
  const glossary = glossaryData.map((entry) => ({
    ...entry,
    ja: entry.jp, // Map 'jp' to 'ja'
  })) as GlossaryEntry[];
  const trie = useMemo(() => buildTrie(glossary), [glossary]);
  const matches = useMemo(() => findMatches(text, trie), [text, trie]);
  const segments = useMemo(() => splitText(text, matches), [text, matches]);

  const getEntry = (term: string) => glossary.find((g) => g.term === term);

  return (
    <>
      {segments.map((seg, i) =>
        seg.term ? (
          <Tooltip
            key={i}
            relationship="label"
            content={(() => {
              const e = getEntry(seg.term!);
              return (
                <div style={{ padding: '8px',
                  backgroundColor: '#ccccff',
                  borderColor: '#6666ff',
                  fontSize: '12px',
                  borderRadius: '6px',
                  lineHeight: 1.4 }}>
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
      )}
    </>
  );
};

export default GlossaryText;