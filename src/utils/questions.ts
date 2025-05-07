// utils/questions.ts
import { Question } from "../types/types";

let cachedRandomSet: Question[] | null = null;

export function getRandomQuestions(all: Question[], count: number) {
  if (cachedRandomSet) return cachedRandomSet;

  if (count === -1 || count >= all.length) {
    cachedRandomSet = [...all];
  } else {
    const used = new Set<number>();
    const result: Question[] = [];
    while (result.length < count) {
      const idx = Math.floor(Math.random() * all.length);
      if (!used.has(idx)) {
        used.add(idx);
        result.push(all[idx]);
      }
    }
    cachedRandomSet = result;
  }
  return cachedRandomSet;
}
