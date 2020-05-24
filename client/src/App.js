import React, { useState, useEffect } from 'react';

import Form from "./components/form.js"
import socket from "./util/socketConfig.js"

import './App.css';

function App() {

  const [messageData, setMessageData] = useState({});

  useEffect(() => {

    socket.on('current-message',data=>{
      console.log(data)
      setMessageData(data)
    })

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div id="header"><span>{messageData.name}</span> says</div>
        <p
           id="message">{messageData.message}
        </p>
      <Form></Form>
      </header>
    </div>
  );
}

export default App;
