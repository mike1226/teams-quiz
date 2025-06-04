import { describe, it, expect } from 'vitest';
import { buildTrie, findMatches, splitText } from '../trie';
import type { GlossaryEntry } from '../../types/types';

describe('trie utilities', () => {
  const glossary: GlossaryEntry[] = [
    { term: 'foo', zh: '', ja: '', en: '', desc: '' },
    { term: 'bar', zh: '', ja: '', en: '', desc: '' },
  ];
  const trie = buildTrie(glossary);

  it('finds matches in text', () => {
    const matches = findMatches('foo bar baz', trie);
    expect(matches.map(m => m.term)).toEqual(['foo', 'bar']);
  });

  it('splits text with matches', () => {
    const matches = findMatches('foo bar', trie);
    const segments = splitText('foo bar', matches);
    expect(segments).toEqual([
      { text: 'foo', term: 'foo' },
      { text: ' ', },
      { text: 'bar', term: 'bar' },
    ]);
  });
});
