// ==============================
// File: src/utils/trie.ts
// ==============================
// 轻量 Trie 实现，用于 glossary 词条匹配
import { GlossaryEntry } from "../types/types";

interface TrieNode {
  isEnd?: boolean;
  term?: string;
  [char: string]: TrieNode | string | boolean | undefined; // undefined を許容
}

export function buildTrie(glossary: GlossaryEntry[]): TrieNode {
  const root: TrieNode = {};
  for (const { term } of glossary) {
    let node = root;
    for (const ch of term) {
      if (!node[ch]) node[ch] = {} as TrieNode;
      node = node[ch] as TrieNode;
    }
    node.isEnd = true;
    node.term = term;
  }
  return root;
}

export interface Match {
  term: string;
  start: number;
  end: number;
}

// 在文本中提取 glossary 命中片段
export function findMatches(text: string, trie: TrieNode): Match[] {
  const matches: Match[] = [];
  for (let i = 0; i < text.length; i++) {
    let node: TrieNode | undefined = trie;
    let j = i;
    while (j < text.length && (node = node[text[j]] as TrieNode)) {
      if (node.isEnd) {
        matches.push({ term: node.term as string, start: i, end: j + 1 });
      }
      j++;
    }
  }
  return matches;
}

// 将文本切割为普通片段与高亮片段
export function splitText(text: string, matches: Match[]) {
  if (!matches.length) return [{ text }];
  const segments: { text: string; term?: string }[] = [];
  let last = 0;
  for (const m of matches) {
    if (m.start > last) segments.push({ text: text.slice(last, m.start) });
    segments.push({ text: m.term, term: m.term });
    last = m.end;
  }
  if (last < text.length) segments.push({ text: text.slice(last) });
  return segments;
}
