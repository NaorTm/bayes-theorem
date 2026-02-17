import { useMemo, useState } from "react";
import PropTypes from "prop-types";

export default function QuizBlock({ questions, title }) {
  const [answers, setAnswers] = useState({});

  const score = useMemo(() => {
    const answered = Object.keys(answers).length;
    if (answered === 0) {
      return null;
    }
    const correct = questions.reduce((acc, question) => {
      return acc + (answers[question.id] === question.correctIndex ? 1 : 0);
    }, 0);
    return {
      correct,
      total: questions.length
    };
  }, [answers, questions]);

  return (
    <section className="card quiz-block" aria-label={title}>
      <h3>{title}</h3>
      {questions.map((question) => {
        const selected = answers[question.id];
        const isAnswered = selected !== undefined;
        const isCorrect = selected === question.correctIndex;

        return (
          <fieldset key={question.id} className="quiz-question">
            <legend>{question.prompt}</legend>
            {question.options.map((option, index) => (
              <label key={option} className="quiz-option">
                <input
                  type="radio"
                  name={question.id}
                  checked={selected === index}
                  onChange={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question.id]: index
                    }))
                  }
                />
                <span>{option}</span>
              </label>
            ))}
            {isAnswered ? (
              <p className={`quiz-feedback ${isCorrect ? "correct" : "incorrect"}`}>
                {isCorrect ? question.feedbackCorrect : question.feedbackIncorrect}
              </p>
            ) : null}
          </fieldset>
        );
      })}
      {score ? (
        <p className="scoreline" aria-live="polite">
          Score: {score.correct}/{score.total}
        </p>
      ) : null}
    </section>
  );
}

QuizBlock.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prompt: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctIndex: PropTypes.number.isRequired,
      feedbackCorrect: PropTypes.string.isRequired,
      feedbackIncorrect: PropTypes.string.isRequired
    })
  ).isRequired,
  title: PropTypes.string
};

QuizBlock.defaultProps = {
  title: "Quick check"
};
