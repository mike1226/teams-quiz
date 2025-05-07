import React, { useState } from "react";
import questionsData from "../data/questions.json";
import { AnswerRecord, Question } from "../types/types";
import QuestionCard from "../components/QuestionCard";
import { getRandomQuestions } from '../utils/questions';


// 问题数量 -1 表示全部
// 答案记录
interface Props {
  questionCount: number; // -1 表示全部
  onFinish: (records: AnswerRecord[]) => void;
  showAnswerImmediately: boolean; // ✅ 新增
}

// QuizPage 组件
const QuizPage: React.FC<Props> = ({
  questionCount,
  onFinish,
  showAnswerImmediately // 接收
}) => {
  // 这里的 questionsData 是一个 JSON 文件，包含了所有的问题数据
  const questions = getRandomQuestions(
    questionsData as Question[],
    questionCount
  );
  const [idx, setIdx] = useState(0);
  const [records, setRecords] = useState<AnswerRecord[]>([]);

  // 处理答案提交
  const handleAnswer = (selected: string[]) => {
    const q = questions[idx];
    const correct =
      selected.length === q.answer.length &&
      selected.every((s) => q.answer.includes(s));
    setRecords([...records, { questionId: q.id, selected, correct }]);

    if (idx + 1 === questions.length) {
      onFinish(records.concat({ questionId: q.id, selected, correct }));
    } else {
      setIdx(idx + 1);
    }
  };

  return (
    <div>
      <h4>
        第 {idx + 1} / {questions.length} 题
      </h4>
      <QuestionCard
        question={questions[idx]}
        onAnswer={handleAnswer}
        showAnswerImmediately={showAnswerImmediately} // ✅ 传递给组件
      />
    </div>
  );
};

export default QuizPage;
