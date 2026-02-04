import React, { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';
import "../Pages/Calculator.css"

function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleClick = (value) => setInput(prev => prev + value);

  const calculate = () => {
    try{
      setResult(evaluate(input));
      setInput("");
      alert("Calculatiob success")
    }catch{
      alert("Invalid input");
    }
  }

  const back = () => {
    setInput(prev => prev.slice(0, -1))
  }

  
  useEffect(() => {
    const handleKey = (e) => {
      
      if(!isNaN(e.key)){
        setInput(prev => prev + e.key)
      }

      if(['+','-','*','/'].includes(e.key)){
        setInput(prev => prev + e.key)
      }

      if(e.key === "Backspace"){
        setInput(prev => prev.slice(0, -1))
      }

      if(e.key === "Enter"){
        calculate();
      }
    };
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  const Refresh = () => {
    setInput("");
    setResult(null);
  }

useEffect(() => {
  if (!localStorage.getItem("visited")) {
    alert("Welcome to my calculator!");
    localStorage.setItem("visited", "true");
  }
}, []);




  const showAlert = (value) => {
    alert(value);
  }


  return (
    <div>
      <h1 className='calculator-container'>{input ? `${input}` : "Calculator"}</h1>
      <div className='display'>
        <p>Input: {input || "0"}</p>
        <p>Result: {result !== null ? result : "0"}</p>
      </div>
      <div className='button-grid'>
        {/*number pad */}
        {[1,2,3,4,5,6,7,8,9,0].map(num => (
          <button key={num} className='number' onClick={() => handleClick(num.toString())}>{num}</button>
        ))}

        {/*operaters*/}
        {['+','-','*','/'].map(op => (
          <button key={op} className='operator' onClick={() => handleClick(op)}>{op}</button>
        ))}

        {/*buttons */}
        <button onClick={calculate} className='action'>Calculate =</button>
        <button onClick={Refresh} className='action-c'>Refresh</button>
        <button onClick={back}>Back</button>

        <br/>
        {['A','B','C','D'].map(news => (
          <button key={news} onClick={() => showAlert(`${news}`)}>{news}</button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
