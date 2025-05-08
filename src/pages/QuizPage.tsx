import React, { useEffect, useState } from "react";
import questionsData from "../data/questions.json";
import { Question, AnswerRecord } from "../types/types";
import QuestionCard from "../components/QuestionCard";
import { getRandomQuestions } from "../utils/questions";

interface Props {
  questionCount: number; // -1 表示全部
  onFinish: (records: AnswerRecord[]) => void;
  showAnswerImmediately: boolean;
}

const QuizPage: React.FC<Props> = ({ questionCount, onFinish, showAnswerImmediately }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [records, setRecords] = useState<AnswerRecord[]>([]);

  useEffect(() => {
    const q = getRandomQuestions(questionsData as Question[], questionCount);
    setQuestions(q);
  }, [questionCount]);

  const handleSubmit = (selected: string[]) => {
    const current = questions[idx];
    const correct = selected.length === current.answer.length && selected.every(id => current.answer.includes(id));
    const newRecord = { questionId: current.id, selected, correct };
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);

    if (idx + 1 >= questions.length) {
      onFinish(updatedRecords);
    } else {
      setIdx(idx + 1);
    }
  };

  if (questions.length === 0) return <p>読み込み中...</p>;

  return (
    <div>
      <h4>第 {idx + 1} / {questions.length} 問</h4>
      <QuestionCard
        key={questions[idx].id}
        question={questions[idx]}
        onSubmit={handleSubmit}
        showAnswerImmediately={showAnswerImmediately}
      />
    </div>
  );
};

export default QuizPage;