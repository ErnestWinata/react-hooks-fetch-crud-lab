import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  
    useEffect(() => {
      fetch("http:localhost:4000/questions")
      .then((res) => res.json())
      .then(setQuestions);
    }, []);

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={setQuestions} /> : <QuestionList questions={questions} onDeleteQuestion={setQuestions} onUpdateQuestion={setQuestions} />}
    </main>
  );
}

export default App;
