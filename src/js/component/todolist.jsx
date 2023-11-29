import React, { useEffect, useState } from "react";

const Todolist = () => {
  
  const [userInput, setUserInput ] = useState('');
  const [tasks, setTasks] = useState([])
  
    async function userGenerator() {
      try {
        let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/emdihoy', {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify([]),
          });
          let data = await response.json();
          console.log(data);
      } catch (error) {
          console.log(error);
        }
      }         
     
     function putUpdate (tasksList) { 

      let tareas = tasksList.map((item)=>{return{"label": String(item), "done":true}})
      console.log("esto es tasks: " + tasks)  
         fetch ('https://playground.4geeks.com//apis/fake/todos/user/emdihoy', {          
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tareas),
          redirect: 'follow'
        });
    }
    function fetchApiData() {
      fetch('https://playground.4geeks.com/apis/fake/todos/user/emdihoy')      
        .then((response)=> response.json())
        .then((data)=> setTasks(data))    
    }    
    function validateInput () {
      if(userInput === "") alert("The input cannot be empty");  
    }
    useEffect(
    ()=> {
        userGenerator();
        fetchApiData();
      },[]
    )
    function deleteAllTasks() {
      fetch('https://playground.4geeks.com/apis/fake/todos/user/emdihoy', {
          method: 'DELETE',
          headers: {
              "Content-Type": "application/json"
          },
      })
          .then(response => response.json())
          .then(data => {
              console.log(data);
              setTasks([]);
          })
    }
   

  
  return (            
      <div className="padre text-center">
      <h1>todos</h1>    
        <div className="main-container">              
        <ul>
          <li>
            <input type="text" className="main-input" 
            placeholder="  Enter your next task here" 
            onChange={(e) =>setUserInput(e.target.value)}
            value={userInput}
            onKeyDown={(e)=> { 
              if (e.key === "Enter"){
                setTasks(tasks.concat(userInput))
                putUpdate(tasks.concat(userInput))
                setUserInput('')
                validateInput('')   
              }
            }}/>                 
          </li>
          
          {tasks.map((item, index) => (                  
            <li key={(Math.random())}>
             {item.label}
              <i className="float-end p-1 fas fa-trash-alt"
                onClick={()=> setTasks(tasks.filter((item,currentIndex) => index != currentIndex)) } />
            </li>))}    
    
          {/* footerss */}
          <footer className="footer1">
            <p>Total tasks: ({tasks.length})</p>                              
          </footer>                                                                         
            <footer className="footer2">
          </footer>                                                                         
            <footer className="footer3">
          </footer>                                                                         
        </ul>
        <button onClick={()=>deleteAllTasks()} type="button" className="btn btn-danger">Clear list</button>
      </div>
    </div>
  );
};
export default Todolist;