import React, { useState } from "react";

function QuestionForm() {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;   //Destructure 'name' and 'value' properties from the 'event.target' object => event.target represents the form element that trigerred the event in this case the input field

    
    if (name.startsWith("answers")) {//This condition checks if 'name" starts with 'answers'  
      const index = parseInt(name.match(/\[(\d+)\]/)[1]);
      //".match" is a method that is used to match a REGEX against a given string
      // (\d+): Captures group that matches one or more digits (\d+).

      // If the property is nested, update it correctly
      setFormData((prevData) => ({
        ...prevData,
        answers: [
          ...prevData.answers.slice(0, index),
          value,
          ...prevData.answers.slice(index + 1),
        ],
      }));
    } else {
      // If not nested, update normally
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("FormData", formData);

    // Assuming you have a server endpoint to send the data
    fetch("http://localhost:3000/questions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answers[0]"
            value={formData.answers[0]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answers[1]"
            value={formData.answers[1]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answers[2]"
            value={formData.answers[2]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answers[3]"
            value={formData.answers[3]}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answers[0]}</option>
            <option value="1">{formData.answers[1]}</option>
            <option value="2">{formData.answers[2]}</option>
            <option value="3">{formData.answers[3]}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
