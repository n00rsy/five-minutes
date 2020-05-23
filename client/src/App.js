import React, { useState, useEffect } from 'react';

import Form from "./components/form.js"
import socket from "./components/socketConfig.js"

import './App.css';

function App() {
  console.log("this is app");
  const [response, setResponse] = useState("");

  useEffect(() => {
    socket.on("FromAPI", data => {
      setResponse(data);
    });

    socket.on('current-fame',data=>{
      console.log(data)
    })

  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div id="header"><span>noorsy</span> says</div>
        <p
           id="message">This is my message
        </p>
      <Form></Form>
      </header>
    </div>
  );
}

export default App;
