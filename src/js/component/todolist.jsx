import React, { useEffect, useState } from "react";

const Todolist = () => {
  
  const [userInput, setUserInput ] = useState('');
  const [tasks, setTasks] = useState([])
  
  const [listImport, setListImport] = useState([''])

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
     
    function putUpdate() {   
         fetch ('https://playground.4geeks.com//apis/fake/todos/user/emdihoy', {          
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(listImport),
        });
    }
    function fetchApiData() {
      fetch('https://playground.4geeks.com/apis/fake/todos/user/emdihoy')      
        .then((response)=> response.json())
        .then((data)=> setListImport(data))    
    }    
    function validateInput () {
      if(userInput === "") alert("The input cannot be empty");  
    }
    useEffect(
    ()=> {
        putUpdate();
        userGenerator();
        fetchApiData();
      },[]
    )
  
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
                setUserInput('')
                validateInput('')   
                putUpdate('')
                console.log("esto es listimport: " + listImport)
                console.log("esto es tasks: " + tasks)
              }
            }}/>                 
          </li>
          {/* listImport es la lista de elementos en la API  */}
            {listImport.map((item)=>
              <li key={Math.random()}>{item.label}
                <i className="float-end p-1 fas fa-trash-alt"
                onClick={()=> setListImport(listImport.filter((t,currentIndex) => t != currentIndex)) } />
              </li>
            )}
          
            {tasks.map((t, index) => (                  
              <li key={(Math.random())}>
              {t}
              <i className="float-end p-1 fas fa-trash-alt"
                onClick={()=> setTasks(tasks.filter((t,currentIndex) => index != currentIndex)) } />
            </li>))}    
    
          {/* footerss */}
          <footer className="footer1">
            <p>Total tasks: ({tasks.length + listImport.length})</p>                              
          </footer>                                                                         
            <footer className="footer2">
          </footer>                                                                         
            <footer className="footer3">
          </footer>                                                                         
        </ul>
      </div>
    </div>
  );
};
export default Todolist;