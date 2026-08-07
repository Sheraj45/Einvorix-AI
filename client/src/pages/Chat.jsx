import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

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

  const handleSend = async () => {
    if (message.trim() === "") return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    // Show user message immediately
    setMessages((prev) => [...prev, userMessage]);

    const prompt = message;

    // Clear input
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/chat",
        {
          prompt,
          character: character.name,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      const aiMessage = {
        sender: "ai",
        text: response.data.response,
      };

      // Add AI response
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>
        {character?.emoji} {character?.name}
      </h2>

      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          background: "#fff",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <strong>{msg.sender === "ai" ? character?.name : "You"}</strong>

            <p style={{ marginTop: "5px" }}>{msg.text}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleSend}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
