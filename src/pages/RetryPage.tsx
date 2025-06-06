import React, { useState } from "react";
import questionsData from "../data/questions.json";
import { Question } from "../types/types";
import QuestionCard from "../components/QuestionCard";

interface Props {
  wrongIds: string[];
  onFinish: () => void;
  showAnswerImmediately: boolean; // ✅ 新增
}

const RetryPage: React.FC<Props> = ({
  wrongIds,
  onFinish,
  showAnswerImmediately,
}) => {
  const questions: Question[] = (questionsData as Question[]).filter((q) =>
    wrongIds.includes(q.id)
  );
  const [idx, setIdx] = useState(0);

  const handleAnswer = () => {
    if (idx + 1 === questions.length) {
      onFinish();
    } else {
      setIdx(idx + 1);
    }
  };

  return (
    <div>
      <h4>
        错题 {idx + 1} / {questions.length}
      </h4>
      <QuestionCard
        question={questions[idx]}
        onSubmit={handleAnswer}
        showAnswerImmediately={showAnswerImmediately} // RetryPage 里直接显示答案
      />
    </div>
  );
};

export default RetryPage;
