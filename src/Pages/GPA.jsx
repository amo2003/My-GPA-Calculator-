import React, { useEffect, useState } from "react";
import "../Pages/GPA.css";
import { re } from "mathjs";

function GPA() {
  const [subjects, setSubjects] = useState([
    { grade: "", credit: "" },
  ]);

  const gradePoints = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D": 1.0,
    "F": 0.0,
  };

  const handleChange = (index, field, value) => {
    const copy = [...subjects];
    copy[index][field] = value;   
    setSubjects(copy);
  };

  const addSubject = () => {
    setSubjects([...subjects, { grade: "", credit: "" }]);
  };

  const calculation = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach((s) => {
      if (s.credit && s.grade) {
        totalPoints += gradePoints[s.grade] * Number(s.credit);
        totalCredits += Number(s.credit);
      }
    });

    return totalCredits === 0
      ? "0.00"
      : (totalPoints / totalCredits).toFixed(2);
  };

  useEffect(() => {
    alert("GPA")
  }, [])

  const removesubject = () => {
    setSubjects(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  }

  useEffect(() => {
    const handleKey = (e) => {
        if(e.key === "Backspace"){
            e.preventDefault();
            removesubject()
        }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  const Refresh = () => {
    setSubjects([{credit: "", grade: ""}])
  }




  return (
    <div className="gpa-container">
      <div className="gpa-card">
        <h1 className="gpa-title">GPA Calculator</h1>

        <div className="gpa-result">
          GPA <span>{calculation()}</span>
        </div>

        <div className="subjects-container">
          {subjects.map((s, index) => (
            <div className="subject-row" key={index}>
              <select
                className="grade-select"
                value={s.grade}
                onChange={(e) =>
                  handleChange(index, "grade", e.target.value)
                }
              >
                <option value="">Select Grade</option>
                {Object.keys(gradePoints).map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>

              <input
                type="number"
                className="credit-input"
                placeholder="Credits"
                value={s.credit}
                onChange={(e) =>
                  handleChange(index, "credit", e.target.value)
                }
              />

            
            </div>
          ))}
        </div>

        <button className="add-btn" onClick={addSubject}>
          + Add Subject
        </button>
        <button onClick={removesubject}>Remove Subjects</button>
        <button onClick={Refresh}>Refresh</button>
      </div>
    </div>
  );
}

export default GPA;
