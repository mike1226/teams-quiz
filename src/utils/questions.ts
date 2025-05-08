import { Question } from "../types/types";

export function getRandomQuestions(all: Question[], count: number): Question[] {
  if (count === -1 || count >= all.length) {
    return shuffle([...all]);
  }
  return shuffle([...all]).slice(0, count);
}

function shuffle<T>(arr: T[]): T[] {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}