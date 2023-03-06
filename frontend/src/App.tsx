import { useEffect, useState } from "react";
import "./App.css";
import { Student } from "models/student";

function App() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await fetch("http://localhost:5001/api/v1/academic", {
          method: "GET",
        });
        const students = await response.json();
        setStudents(students);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadStudents();
  }, []);
  return <div className="App">{JSON.stringify(students)}</div>;
}

export default App;
