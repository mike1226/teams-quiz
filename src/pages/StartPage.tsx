import React, { useState } from "react";

interface Props {
  onStart: (count: number, showAnswer: boolean) => void;
}

// 选择题数量和是否显示答案的页面
// 这里的 onStart 函数会在用户点击开始按钮时被调用
// count 是选择的题目数量，showAnswer 是是否显示答案
// 这个组件的主要作用是让用户选择题目数量和是否显示答案
const StartPage: React.FC<Props> = ({ onStart }) => {
  const counts = [10, 30, 50, -1];
  const [showAnswer, setShowAnswer] = useState(true); // ✅ 是否显示答案开关

  return (
    <div style={{ padding: "24px" }}>
      <h2>选择题目数量</h2>
      {counts.map((c) => (
        <button
          key={c}
          style={{ margin: "8px" }}
          onClick={() => onStart(c, showAnswer)}
        >
          {c === -1 ? "全部" : `${c} 题`}
        </button>
      ))}

      <div style={{ marginTop: "24px" }}>
        <label>
          <input
            type="checkbox"
            checked={showAnswer}
            onChange={(e) => setShowAnswer(e.target.checked)}
          />{" "}
          回答后立刻显示正误
        </label>
      </div>
    </div>
  );
};

export default StartPage;
