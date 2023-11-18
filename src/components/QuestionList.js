import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/react-hooks-fetch-crud-lab/Bank-of-flatiron/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleDelete = (deletedId) => {
    // Update the state by removing the deleted question
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== deletedId)
    );
  };

  function deleteQuestion(id) {
    fetch(`https://my-json-server.typicode.com/react-hooks-fetch-crud-lab/Bank-of-flatiron/questions/${id}`,{
      method: "DELETE",      
    })
    handleDelete(id)
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions !== null && questions.map((question) => (
          <QuestionItem 
            key={question.id} 
            question={question}
            onDelete={deleteQuestion} 
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
