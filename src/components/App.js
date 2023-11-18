import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  //  console.log("Page:", page)
  // //Fetched data from the server using "GET" requset
  // //
  // useEffect(() => {
  //   fetch(" http://localhost:3000/questions")
  //   .then(res => res.json())
  //   .then(data => setPage(data))    
  // }, [])
  


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ?  <QuestionForm data={page}/> : <QuestionList />}
    </main>
  );
}

export default App;
