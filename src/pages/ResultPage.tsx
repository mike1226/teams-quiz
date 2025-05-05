// ==============================
// File: src/pages/ResultPage.tsx
// ==============================
import React from "react";
import { AnswerRecord } from "../types/types";
import ResultPie from "../components/PieChart";

interface Props {
  records: AnswerRecord[];
  onRetryWrong: () => void;
  onRestart: () => void;
}

const ResultPage: React.FC<Props> = ({ records, onRetryWrong, onRestart }) => {
  const correct = records.filter((r) => r.correct).length;
  const wrong = records.length - correct;
  return (
    <div style={{ padding: "24px" }}>
      <h2>结果</h2>
      <ResultPie correct={correct} wrong={wrong} />
      <div style={{ marginTop: "16px" }}>
        正确: {correct} / {records.length}
      </div>
      <button style={{ margin: "8px" }} onClick={onRetryWrong} disabled={wrong === 0}>
        错题再练
      </button>
      <button style={{ margin: "8px" }} onClick={onRestart}>
        重新开始
      </button>
    </div>
  );
};

export default ResultPage;
