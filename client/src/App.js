import React, { useState, useEffect } from 'react';

import SubmissionForm from "./components/form.js"
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
      <SubmissionForm className="SubmissionForm"></SubmissionForm>
      </header>
    </div>
  );
}

export default App;
