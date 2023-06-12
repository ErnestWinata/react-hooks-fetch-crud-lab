import React, { useState } from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers } = question;
  const [correctIdx, setCorrectIdx] = useState(question.correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

    function handleDelete() {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          onDeleteQuestion((questions) => questions.filter((q) => q.id !== question.id));
        });
    }

    function handleChangeCorrectIndex(event) {
      const newCorrectIndex = parseInt(event.target.value);
      setCorrectIdx(newCorrectIndex);

      fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correctIndex: newCorrectIndex
        }),
      })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        onUpdateQuestion((questions) =>
        questions.map((q) => (q.id === id ? updatedQuestion : q))
        );
      });
    }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIdx} onChange={handleChangeCorrectIndex}>
          {options}
          </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
