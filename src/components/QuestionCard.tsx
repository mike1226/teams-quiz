import React, { useMemo, useState, useEffect } from "react";
import { Question } from "../types/types";
import GlossaryText from "./GlossaryText";
import ReactMarkdown from "react-markdown";

interface Props {
  question: Question;
  onAnswer: (selected: string[]) => void;
  showAnswerImmediately: boolean;
}

// ✅ Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

const QuestionCard: React.FC<Props> = ({
  question,
  onAnswer,
  showAnswerImmediately,
}) => {
  const [selection, setSelection] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // ✅ 每道题切换时重置状态
  useEffect(() => {
    setSelection([]);
    setSubmitted(false);
    setIsCorrect(false);
  }, [question.id]);

  const shuffledOptions = useMemo(() => shuffle(question.options), [question]);

  const toggleSelect = (id: string) => {
    if (submitted) return;
    if (question.type === "single") {
      setSelection([id]);
    } else {
      setSelection((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    }
  };

  const handleSubmit = () => {
    if (selection.length === 0) return;

    const correct =
      selection.length === question.answer.length &&
      selection.every((s) => question.answer.includes(s));

    if (showAnswerImmediately) {
      setIsCorrect(correct);
      setSubmitted(true);
    } else {
      onAnswer(selection);
    }
  };

  const handleNext = () => {
    onAnswer(selection);
  };

  // ✅ 背景高亮函数
  const getOptionStyle = (id: string): React.CSSProperties => {
    if (!submitted) return {};
    const isCorrect = question.answer.includes(id);
    const isSelected = selection.includes(id);

    if (isCorrect) {
      return {
        backgroundColor: "#e6ffe6",
        padding: "6px",
        borderRadius: "6px",
      };
    }

    if (isSelected && !isCorrect) {
      return {
        backgroundColor: "#ffe6e6",
        padding: "6px",
        borderRadius: "6px",
      };
    }

    return {};
  };

  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <div>
        <GlossaryText text={question.question}/>
      </div>

      <form>
        {shuffledOptions.map((opt) => (
          <label
            key={opt.id}
            style={{
              display: "flex",
              alignItems: "center",  
              gap: "8px",
              margin: "8px 0",
              marginBottom: "12px",
              padding: "5px",
              border: "1px solid #ccc",
              backgroundColor: submitted
                ? getOptionStyle(opt.id).backgroundColor || "#f7f7f7"
                : "#f7f7f7",
              borderRadius: "6px",
              cursor: submitted ? "default" : "pointer",
              transition: "background-color 0.3s ease",
              ...getOptionStyle(opt.id),
            }}
          >
            <input
              type={question.type === "single" ? "radio" : "checkbox"}
              name="option"
              value={opt.id}
              disabled={submitted}
              checked={selection.includes(opt.id)}
              onChange={() => toggleSelect(opt.id)}
              style={{ marginTop: "4px" }}
            />{" "}
            <GlossaryText text={opt.text} />
          </label>
        ))}
      </form>

      <div style={{ textAlign: "right", marginRight: "5px" }}>
        <button
          style={{ marginTop: "12px", width: "100px", padding: "2px" }}
          disabled={selection.length === 0}
          onClick={submitted ? handleNext : handleSubmit}
        >
          {submitted ? "下一题" : "提交"}
        </button>
      </div>

      {submitted && question.explanation && (
        <div style={{ marginTop: "16px" }}>
          <p style={{ fontSize: "14px", marginBottom: "8px" }}>
            {isCorrect ? "回答正确！" : "回答错误！"}
          </p>
          <h4>📘 解析</h4>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              borderRadius: "6px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <ReactMarkdown>{question.explanation}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
