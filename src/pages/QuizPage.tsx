import React, { useState } from "react";
import questionsData from "../data/questions.json";
import { AnswerRecord, Question } from "../types/types";
import QuestionCard from "../components/QuestionCard";

// 问题数量 -1 表示全部
// 答案记录
interface Props {
  questionCount: number; // -1 表示全部
  onFinish: (records: AnswerRecord[]) => void;
  showAnswerImmediately: boolean; // ✅ 新增
}

// 随机获取问题
function getRandomQuestions(all: Question[], count: number) {
  const uniqueMap = new Map<string, Question>();
  for (const q of all) {
    uniqueMap.set(q.id, q); // 用 id 去重
  }

  const unique = Array.from(uniqueMap.values());
  if (count === -1 || count >= unique.length) return [...unique];

  const shuffled = [...unique].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}


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
