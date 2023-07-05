import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasicLayout from '../../layout/BasicLayout/BasicLayout';
import { Button, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { interactionChatGPT } from '../../API/apiOpenAI';
import  SendIcon from '../../assets/png/send_icon.png'; // Importa el icono SVG del botón de enviar

// import Error404VALKIRIA from "../../assets/png/Error404/404.png";

import "./TalarIA.scss";

export default function TalarIA(props) {
  const { setRefreshCheckLogin } = props;

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const botMessage = await interactionChatGPT(inputValue); // Utilizamos la función interactionChatGPT

      const botResponse = {
        content: botMessage,
        sender: 'bot',
      };

      setMessages([...messages, botResponse]);
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  const send = (
    <Tooltip id="info-tooltip">
    Enviar
    </Tooltip>
);

  return (
    <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="chatbot-header">
        <h2>TalarIA</h2>
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
          <button onClick={sendMessage} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 
              <OverlayTrigger placement="bottom" overlay={send}>
                <img src={SendIcon} alt ='app' />
              </OverlayTrigger>
            }
          </button>
        </div>
      {loading && (
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="sr-only">Cargando...</span>
          </Spinner>
        </div>
      )}
    </BasicLayout>
    
  );
}
