import React, { useState } from "react";
import StartPage from "./pages/StartPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import RetryPage from "./pages/RetryPage";
import { AnswerRecord } from "./types/types";

// 应用状态阶段
type Stage = "start" | "quiz" | "result" | "retry";

const App: React.FC = () => {
  const [stage, setStage] = useState<Stage>("start");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [showAnswerImmediately, setShowAnswerImmediately] = useState(true); // ✅ 新增状态

  const startQuiz = (count: number, showAns: boolean) => {
    setQuestionCount(count);
    setShowAnswerImmediately(showAns); // ✅ 更新状态
    setStage("quiz");
  };

  const finishQuiz = (recs: AnswerRecord[]) => {
    setRecords(recs);
    setStage("result");
  };

  const retryWrong = () => setStage("retry");
  const restart = () => setStage("start");

  const wrongIds = records.filter((r) => !r.correct).map((r) => r.questionId);

  return (
    <div>
      {stage === "start" && <StartPage onStart={startQuiz} />}
      {stage === "quiz" && (
        <QuizPage
          questionCount={questionCount}
          onFinish={finishQuiz}
          showAnswerImmediately={showAnswerImmediately} // ✅ 传递到 QuizPage
        />
      )}
      {stage === "result" && (
        <ResultPage
          records={records}
          onRetryWrong={retryWrong}
          onRestart={restart}
        />
      )}
      {stage === "retry" && (
        <RetryPage
          wrongIds={wrongIds}
          onFinish={restart}
          showAnswerImmediately={showAnswerImmediately} // ✅ 传递到 RetryPage
        />
      )}
    </div>
  );
};

export default App;
