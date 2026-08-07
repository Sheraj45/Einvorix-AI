import { useState } from "react";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const character = location.state?.character;

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello! I am ${character?.name}. How can I help you today?`,
    },
  ]);

  const handleSend = () => {
    if (message.trim() === "") return;

    const newMessage = {
      sender: "user",
      text: message,
    };

    setMessages([...messages, newMessage]);

    setMessage("");
  };

  return (
    <div
      style={{
        height: "400px",
        overflowY: "auto",
        border: "1px solid #ddd",
        padding: "20px",
        marginBottom: "20px",
        background: "#fff",
      }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            marginBottom: "15px",
          }}
        >
          <strong>{msg.sender === "ai" ? character?.name : "You"}</strong>

          <p>{msg.text}</p>
        </div>
      ))}
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "80%",
          padding: "12px",
        }}
      />

      <button
        onClick={handleSend}
        style={{
          padding: "12px",
          marginLeft: "10px",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
