import { describe, it, expect } from 'vitest';
import { getRandomQuestions } from '../questions';
import type { Question } from '../../types/types';

const questions: Question[] = [
  { id: '1', type: 'single', question: 'q1', options: [], answer: [], explanation: '' },
  { id: '2', type: 'single', question: 'q2', options: [], answer: [], explanation: '' },
  { id: '3', type: 'single', question: 'q3', options: [], answer: [], explanation: '' },
];

describe('getRandomQuestions', () => {
  it('returns the requested number of questions', () => {
    const res = getRandomQuestions(questions, 2);
    expect(res).toHaveLength(2);
    // ensure all items come from source
    for (const q of res) {
      expect(questions.map(x => x.id)).toContain(q.id);
    }
  });

  it('returns all questions when count is -1', () => {
    const res = getRandomQuestions(questions, -1);
    expect(res).toHaveLength(3);
  });

  it('does not modify the original array', () => {
    const copy = [...questions];
    getRandomQuestions(questions, 2);
    expect(questions).toEqual(copy);
  });
});
