import React, { useEffect, useMemo, useState } from "react";
import { Question } from "../types/types";
import GlossaryText from "./GlossaryText";

interface Props {
  question: Question;
  onSubmit: (selected: string[]) => void;
  showAnswerImmediately: boolean;
}

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
  onSubmit,
  showAnswerImmediately,
}) => {
  const [selection, setSelection] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

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

  const handleConfirm = () => {
    if (selection.length === 0) return;
    const correct =
      selection.length === question.answer.length &&
      selection.every((id) => question.answer.includes(id));
    setIsCorrect(correct);
    setSubmitted(true);
    if (!showAnswerImmediately) onSubmit(selection);
  };

  const handleNext = () => onSubmit(selection);

  const getOptionStyle = (id: string): React.CSSProperties => {
    if (!submitted) return {};
    const correct = question.answer.includes(id);
    const selected = selection.includes(id);
    if (correct) return { backgroundColor: "#e6ffe6" };
    if (selected && !correct) return { backgroundColor: "#ffe6e6" };
    return {};
  };

  return (
    <div
      className="bg-sky-50 rounded-md shadow-md border-double border-4 border-gray-200 p-4 mx-4 rounded-xl font-sans"
    >
      <div className="text-base leading-relaxed text-gray-800 whitespace-pre-wrap ml-8 py-4 ">
      <GlossaryText text={question.question} />
      </div>
      <form>
          {shuffledOptions.map((opt) => (
            <label
              key={opt.id}
              className={`flex items-start gap-2 p-3 border rounded-md transition py-4 my-4 bg-gray-50
        ${submitted ? "cursor-default" : "cursor-pointer"} 
        ${getOptionStyle(opt.id).backgroundColor || "bg-gray-50"}
      `}
              style={{
                ...getOptionStyle(opt.id),
              }}
            >
              <input
                type={question.type === "single" ? "radio" : "checkbox"}
                name="option"
                value={opt.id}
                checked={selection.includes(opt.id)}
                onChange={() => toggleSelect(opt.id)}
                disabled={submitted}
                className="mt-1"
              />
              <div className="flex-1 leading-relaxed text-gray-800 whitespace-pre-wrap">
                <GlossaryText text={opt.text} />
              </div>
            </label>
          ))}

      </form>
      <div style={{ textAlign: "right" }}>
        <button
          onClick={submitted ? handleNext : handleConfirm}
          disabled={selection.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 w-40"
        >
          {submitted ? "次へ" : "確認"}
        </button>
      </div>
      {submitted && question.explanation && (
        <div style={{ marginTop: "12px" }}>
          <p>{isCorrect ? "回答正解！" : "回答不正解。"}</p>
          <h4>📘 解説</h4>
          <div className="text-base leading-relaxed text-gray-800 whitespace-pre-wrap">
            <GlossaryText text={question.explanation} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
