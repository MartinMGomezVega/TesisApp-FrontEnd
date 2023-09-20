import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import BasicLayout from '../../layout/BasicLayout/BasicLayout';
import { Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { interactionChatGPT } from '../../API/apiOpenAI';
import { getUserAPI } from '../../API/user';
// import ChatInput from './ChatInput';
import SendIcon from '../../assets/png/send_icon.png'; // Importa el icono SVG del botón de enviar
import LogoHead from "../../assets/png/logo-head.png";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from '../../utils/constant';

import "./TalarIA.scss";

export default function TalarIA(props) {
  const { setRefreshCheckLogin } = props;

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [avatarURL, setAvatarURL] = useState(null); //Guardar la url de la imagen

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
      // console.log("Respuesta:", botMessage)

      const botResponse = {
        content: botMessage,
        sender: 'bot',
      };

      // Usar la función de actualización del estado basado en el estado anterior (prevState)
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  // Obtener el avatar del usuario
  useEffect(() => {
    getUserAPI("63e0754ee3bdaff40adae7ea").then((response) => {
      setAvatarURL(
        response?.avatar
          ? `${API_HOST}/getAvatar?id=${response.id}`
          : AvatarNotFound
      );
    });
  }, []);


  const renderMessages = () => {
    return messages.map((message, index) => {
      if (message.sender === 'user') {
        return (
          <div key={index} className="chatbot-Info-user">
            <div className="user">
              <img src={avatarURL} alt="User-Avatar" />
            </div>
            <div className="chatbot-content">
              <p>{message.content}</p>
            </div>
          </div>
        );
      } else {
        return (
          <div key={index} className="chatbot-Info-bot">
            <div className="avatar">
            <img src={LogoHead} alt="Bot-Avatar" />
            </div>
            <div className="chatbot-content">
              {renderMessageContent(message.content)}
              {/* <p>{message.content}</p> */}
            </div>
          </div>
        );
      }
    });
  };

  const sendTooltip = <Tooltip id="send-tooltip">Enviar</Tooltip>;

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // Código 13 corresponde a la tecla "Enter"
      e.preventDefault(); // Evita que se realice un salto de línea en el input
      sendMessage();
    }
  };

  return (
    <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="chatbot-header">
        <h2>TalarIA</h2>
      </div>
      <div className="chatbot-messages">{renderMessages()}</div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage} disabled={loading}>
          <OverlayTrigger placement="bottom" overlay={sendTooltip}>
            <img src={SendIcon} alt="Enviar" />
          </OverlayTrigger>
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

// Función para renderizar el contenido del mensaje, buscando y enlazando URLs
const renderMessageContent = (content) => {
  const urlRegex = /(https?:\/\/[^\s)]+)/g; // Expresión regular para buscar URLs sin paréntesis
  const parts = content.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      // Si es una URL, crear un enlace
      const url = part;
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {url}
        </a>
      );
    } else {
      // Si no es una URL, mostrar el texto normal
      return <span key={index}>{part}</span>;
    }
  });
};





