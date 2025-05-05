// ==============================
// File: src/types/types.ts
// ==============================
export interface QuestionOption {
  id: string; // 稳定的选项编号，例如 "A"
  text: string; // 显示文本
}

export interface Question {
  id: string;
  type: "single" | "multi";
  question: string;
  options: QuestionOption[];
  answer: string[]; // 正确选项 id 数组
  explanation: string; // 解释文本
}

export interface GlossaryEntry {
  term: string;
  zh: string;
  ja: string;
  en: string;
  desc:string;
}

export interface AnswerRecord {
  questionId: string;
  selected: string[];
  correct: boolean;
}
