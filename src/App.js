import React, { useState } from 'react';
import './App.css';
import { withServiceWorkerUpdater } from '@3m1/service-worker-updater';
import axios from 'axios';

const App = (props) => {
  const { newServiceWorkerDetected, onLoadNewServiceWorkerAccept } = props;
  //                True or False || Método que permite actualizar

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleChangeTitle(e) {
    const value = e.target.value;
    setTitle(value);
  }

  function handleChangeContent(e) {
    const value = e.target.value;
    setContent(value);
  }

  function handleSubmit() {
    return axios
      .post('http://localhost:8000/custom-notification', {
        title,
        content,
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));

    // setContent('');
    // setTitle('');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2> Project PWA. This is an application that contains a form that generates a message to send a push notification.</h2>
        {newServiceWorkerDetected && (
          <div className="options">
            <h3> New Update! </h3>
            <button onClick={onLoadNewServiceWorkerAccept}> Update! </button>
          </div>
        )}
        <input
          type="text"
          onChange={handleChangeTitle}
          placeholder="title"
          value={title}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />

        <input
          type="text"
          onChange={handleChangeContent}
          placeholder="content"
          value={content}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />

        <button onClick={handleSubmit}> Send </button>
      </header>
    </div>
  );
};

export default withServiceWorkerUpdater(App);
