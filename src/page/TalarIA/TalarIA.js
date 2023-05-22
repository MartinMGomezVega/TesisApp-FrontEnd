import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasicLayout from '../../layout/BasicLayout/BasicLayout';
import { Button, Spinner } from 'react-bootstrap';
// import Error404VALKIRIA from "../../assets/png/Error404/404.png";

import "./TalarIA.scss";

export default function TalarIA(props) {
  const { setRefreshCheckLogin } = props;

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const welcomeMessage = {
      content: 'Hola, ¿en qué puedo ayudarte?',
      sender: 'bot',
    };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      content: inputValue,
      sender: 'user',
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    try {
      const response = await axios.post('/api/chatbot', { message: inputValue });
      const botMessage = {
        content: response.data.message,
        sender: 'bot',
      };
      setMessages([...messages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h3>Chat GPT</h3>
        </div>
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chatbot-message ${message.sender === 'bot' ? 'bot' : 'user'}`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={sendMessage}>Enviar</button>
        </div>
      </div>
    </BasicLayout>
    
  );
}
