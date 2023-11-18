import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/Morgan-Ngetich/react-hooks-fetch-crud-lab/questions")
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
    fetch(`https://my-json-server.typicode.com/Morgan-Ngetich/react-hooks-fetch-crud-lab/questions/${id}`,{
      method: "DELETE",      
    })
    handleDelete(id)
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* questions !== null: This part checks if the questions variable is not null. 
        In React, during the initial render, state variables might be null or have some default value until they are updated with actual data.
        This check ensures that the map function is not called on null, which would result in an error. */}
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
