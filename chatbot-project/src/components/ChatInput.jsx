import { useState } from "react";
import { Chatbot } from "supersimpledev";
import './ChatInput.css'

function ChatInput({chatMessages, setChatMessages}) {

  const [userMessage, setUserMessage] = useState('');

  function saveInputText(event) {
    setUserMessage(event.target.value);
  }

  function sendMessage() {

    const newChatMessaages = [
      ...chatMessages,
      {
        message: userMessage,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(newChatMessaages);

    const response = Chatbot.getResponse(userMessage);
    setChatMessages([
      ...newChatMessaages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setUserMessage('');
  }

  return (
    <div className="chat-input-container">
      <input placeholder="Send a message to Chatbot" 
        size="30"
        onChange={saveInputText}
        value={userMessage}
        className="chat-input"
      />
      <button 
        onClick={sendMessage}
        className="send-button"
      >Send</button>
    </div>
  );
}

export default ChatInput;