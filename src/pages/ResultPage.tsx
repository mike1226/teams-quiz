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
      <button className="bg-red text-black-600 border border-red-600 m-2 px-4 py-2 rounded hover:bg-red-50" onClick={onRetryWrong} disabled={wrong === 0}>
        错题再练
      </button>
      <button className="bg-white text-blue-600 border border-blue-600 m-2 px-4 py-2 rounded hover:bg-blue-50" onClick={onRestart}>
        重新开始
      </button>
    </div>
  );
};

export default ResultPage;
